// src/features/postSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";
import { v4 as uuidv4 } from "uuid";

/* ---------- TIPOS ---------- */
export interface Comment {
  id: string;
  user_id: string;
  user_name?: string;
  text: string;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  user?: string;
  profilePic?: string;
  created_at: string;
  text: string;
  image?: string; // public URL
  likes_count: number;
  commentsList: Comment[];
  category?: string;
}

/* ---------- ESTADO INICIAL ---------- */
const initialState = {
  posts: [] as Post[],
  page: 0,
  hasMore: true,
  loading: false,
  error: null as string | null,
};

/* ---------- THUNKS ---------- */

/**
 * fetchPostsPage
 * - trae posts paginados desde la tabla `posts`
 * - hace join con users (usando la relación posts_user_id_fkey)
 * - trae comentarios asociados (limitado a los posts cargados)
 * - ordena por created_at DESC
 */
export const fetchPostsPage = createAsyncThunk(
  "posts/fetchPostsPage",
  async (page: number, thunkAPI) => {
    try {
      const postsPerPage = 20;
      const start = page * postsPerPage;
      const end = start + postsPerPage - 1;

      // Traer posts + usuario (usa la relación explícita posts_user_id_fkey)
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select(`
          id,
          post_id,
          user_id,
          text,
          created_at,
          users:users!comments_user_id_fkey (
            username
          )
        `)
        .order("created_at", { ascending: false })
        .range(start, end);

      if (postsError) throw postsError;

      const postIds = (postsData || []).map((p: any) => p.id);
      let comments: any[] = [];
      if (postIds.length) {
        const { data: cData, error: cError } = await supabase
          .from("comments")
          .select(`id, post_id, user_id, text, created_at, users ( username )`)
          .in("post_id", postIds)
          .order("created_at", { ascending: true });
        if (cError) throw cError;
        comments = cData || [];
      }

      const fullPosts: Post[] = (postsData || []).map((p: any) => {
        const postComments = comments
          .filter((c) => c.post_id === p.id)
          .map((c: any) => ({
            id: c.id,
            user_id: c.user_id,
            user_name: c.users?.[0]?.username ?? "Usuario",
            text: c.text,
            created_at: c.created_at,
          }));
            
        return {
          id: p.id,
          user_id: p.user_id,
          user: p.users?.username ?? "Unknown",
          profilePic: p.users?.profile_pic ?? undefined,
          created_at: p.created_at,
          text: p.text,
          image: p.image,
          likes_count: p.likes_count ?? 0,
          commentsList: postComments,
          category: p.category,
        } as Post;
      });

      return fullPosts;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || String(err));
    }
  }
);

/**
 * createPost
 * - sube la imagen al bucket `posts` (si existe)
 * - guarda post en tabla `posts`
 * - retorna el post normalizado (incluye username + profile_pic)
 */
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (
    {
      userId,
      text,
      category,
      imageFile,
    }: {
      userId: string;
      text: string;
      category?: string;
      imageFile?: File | null;
    },
    thunkAPI
  ) => {
    try {
      let imageUrl: string | null = null;

      // Subir imagen si existe
      if (imageFile) {
        // filePath dentro del bucket posts: usuario/ts-nombre
        const filePath = `${userId}/${Date.now()}-${imageFile.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("posts")
          .upload(filePath, imageFile, { upsert: false });

        if (uploadError) throw uploadError;

        // Obtener URL pública
        const { data: urlData } = supabase.storage.from("posts").getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      // Insertar post
      const { data: inserted, error: insertError } = await supabase
        .from("posts")
        .insert({
          id: uuidv4(),
          user_id: userId,
          text,
          image: imageUrl,
          category: category ?? "General",
          likes_count: 0,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      if (!inserted) throw new Error("No se pudo insertar el post.");

      // Traer info del usuario para completar el objeto
      const { data: userData, error: userErr } = await supabase
        .from("users")
        .select("username, profile_pic")
        .eq("id", userId)
        .single();

      if (userErr) {
        // no crítico: devolvemos sin username/profilePic si falla
        return {
          id: inserted.id,
          user_id: inserted.user_id,
          user: undefined,
          profilePic: undefined,
          created_at: inserted.created_at,
          text: inserted.text,
          image: inserted.image,
          likes_count: inserted.likes_count ?? 0,
          commentsList: [],
          category: inserted.category,
        } as Post;
      }

      const newPost: Post = {
        id: inserted.id,
        user_id: inserted.user_id,
        user: userData.username ?? "Unknown",
        profilePic: userData.profile_pic ?? undefined,
        created_at: inserted.created_at,
        text: inserted.text,
        image: inserted.image,
        likes_count: inserted.likes_count ?? 0,
        commentsList: [],
        category: inserted.category,
      };

      return newPost;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || String(err));
    }
  }
);

/**
 * toggleLike
 * - inserta o borra en post_likes
 * - recalcula likes_count consultando post_likes (más seguro sin RPC)
 */
export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async ({ postId, userId }: { postId: string; userId: string }, thunkAPI) => {
    try {
      const { data: existing, error: existingErr } = await supabase
        .from("post_likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", userId)
        .limit(1);

      if (existingErr) throw existingErr;

      if (existing && existing.length > 0) {
        // ya existe -> borrar
        const { error: delErr } = await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", userId);
        if (delErr) throw delErr;
      } else {
        // insertar like
        const { error: insErr } = await supabase.from("post_likes").insert({
          post_id: postId,
          user_id: userId,
        });
        if (insErr) throw insErr;
      }

      // recalcular contador de likes con count exacto
      const { data: likesData, error: likesErr, count } = await supabase
        .from("post_likes")
        .select("id", { count: "exact" })
        .eq("post_id", postId);

      if (likesErr) throw likesErr;

      const likes_count = typeof count === "number" ? count : (likesData ? likesData.length : 0);

      // actualizar tabla posts para mantener el contador consistente
      const { error: updErr } = await supabase
        .from("posts")
        .update({ likes_count })
        .eq("id", postId);

      if (updErr) console.warn("No se pudo actualizar likes_count en posts:", updErr);

      return { postId, likes_count, added: !!(existing && existing.length === 0) };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || String(err));
    }
    

  }
);

/**
 * addComment
 * - inserta comentario y devuelve el comentario normalizado con username
 */
export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, userId, text }: { postId: string; userId: string; text: string }, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({  post_id: postId, user_id: userId, text })
        .select(`
          id,
          post_id,
          user_id,
          text,
          created_at,
          users ( username )
        `)

        .single();

      if (error) throw error;

      const comment: Comment = {
        id: data.id,
        user_id: data.user_id,
        user_name: data.users?.username ?? "Usuario",
        text: data.text,
        created_at: data.created_at,
      };


      return { postId, comment };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || String(err));
    }
  }
);
// para refrescar comentarios de un post específico
export const refreshComments = createAsyncThunk(
  "posts/refreshComments",
  async (postId: string, thunkAPI) => {
    const { data, error } = await supabase
      .from("comments")
      .select(`
        id,
        post_id,
        user_id,
        text,
        created_at,
        users ( username )
      `)
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return { postId, comments: data };
  }
);


/**
 * deletePost
 * - obtiene el post
 * - elimina la imagen del bucket (si existe)
 * - borra likes, comentarios y el post
 */
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string, { rejectWithValue }) => {
    try {
      // obtener post
      const { data: post, error: fetchError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (fetchError) throw fetchError;
      if (!post) throw new Error("Post no encontrado");

      // eliminar archivo del bucket si existe
      if (post.image) {
        try {
          // post.image es la URL pública → extraer filePath relativo al bucket
          // url ejemplo: https://<url>/storage/v1/object/public/posts/<filePath>
          const parts = post.image.split(`/posts/`);
          const filePath = parts.length > 1 ? parts[1] : null;
          if (filePath) {
            const { error: storageError } = await supabase.storage
              .from("posts")
              .remove([filePath]);
            if (storageError) console.warn("No se pudo borrar imagen del storage:", storageError);
          }
        } catch (e) {
          console.warn("Error al intentar borrar imagen:", e);
        }
      }

      // borrar likes asociados
      const { error: likesError } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId);
      if (likesError) console.warn("No se pudieron borrar likes:", likesError);

      // borrar comentarios asociados
      const { error: commentsError } = await supabase
        .from("comments")
        .delete()
        .eq("post_id", postId);
      if (commentsError) console.warn("No se pudieron borrar comentarios:", commentsError);

      // borrar post
      const { error: postError } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);
      if (postError) throw postError;

      return postId;
    } catch (err: any) {
      console.error("Error deletePost:", err);
      return rejectWithValue(err.message || String(err));
    }
  }
);

/* ---------- SLICE ---------- */
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.page = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsPage.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        if (!action.payload || action.payload.length === 0) {
          state.hasMore = false;
          return;
        }
        state.posts = [...state.posts, ...action.payload];
        state.posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        state.page += 1;
      })
      .addCase(fetchPostsPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.posts = [action.payload, ...state.posts];
        
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(toggleLike.fulfilled, (state, action: PayloadAction<any>) => {
        const { postId, likes_count } = action.payload;
        const post = state.posts.find((p) => p.id === postId);
        if (!post) return;
        post.likes_count = likes_count ?? post.likes_count;
      })

      .addCase(addComment.fulfilled, (state, action: PayloadAction<any>) => {
        const { postId, comment } = action.payload;
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.commentsList = post.commentsList.concat(comment);
        }
      })
      .addCase(refreshComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.commentsList = comments.map((c: any) => ({
            id: c.id,
            user_id: c.user_id,
            user_name: c.users?.username,
            text: c.text,
            created_at: c.created_at
          }));
        }
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p.id !== action.payload);
      });

  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
