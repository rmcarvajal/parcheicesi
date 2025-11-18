import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import feedData from '../Feed-components/FeedData.json';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

// ===============================================================
//  TIPOS
// ===============================================================

export interface Comment {
  id: string;
  user: string;
  userEmail: string;
  text: string;
  time: number;
}

export interface Post {
  id: string;
  user: string;
  userEmail: string;
  profilePic?: string;
  time: number;
  text: string;
  image: string;
  likes: number;
  likedBy: string[];
  commentsList: Comment[];
  category: string;
  liked: boolean;
}



// ===============================================================
//  CONSTANTES
// ===============================================================

const DEFAULT_PROFILE_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png";

// ===============================================================
//  NORMALIZAR POSTS
// ===============================================================

const normalizePosts = (posts: any[]): Post[] =>
  posts.map((p: any) => ({
    id: String(p.id),
    user: p.user ?? "Unknown",
    userEmail: p.userEmail || "unknown@example.com",
    profilePic: p.profilePic ?? DEFAULT_PROFILE_IMAGE,
    time: typeof p.time === "number" ? p.time : Date.now(),
    text: p.text ?? "",
    image: p.image ?? "",
    likes: p.likes ?? 0,
    likedBy: Array.isArray(p.likedBy) ? p.likedBy : [],
    commentsList: Array.isArray(p.commentsList)
      ? p.commentsList.map((c: any) => ({
          id: c.id ?? uuidv4(),
          user: c.user ?? "Anon",
          userEmail: c.userEmail || c.user || "unknown@example.com",
          text: c.text ?? "",
          time: c.time ?? Date.now(),
        }))
      : [],
    category: p.category ?? "",
    liked: false,
  }));

// ===============================================================
//  TRY TO LOAD FROM LOCALSTORAGE
// ===============================================================

const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

const initialSeed = savedPosts.length
  ? normalizePosts(savedPosts)
  : normalizePosts(feedData);

// ===============================================================
//  ASYNC THUNK: FETCH POSTS FROM API
// ===============================================================


export const fetchPostsPage = createAsyncThunk(
  "posts/fetchPostsPage",
  async (page: number) => {
    const postsPerPage = 20; // 🔹 número de posts por carga

    // Cargar todas las APIs
    const [postsRes, usersRes, commentsRes] = await Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/posts"),
      axios.get("https://jsonplaceholder.typicode.com/users"),
      axios.get("https://jsonplaceholder.typicode.com/comments")
    ]);

    const posts = postsRes.data;
    const users = usersRes.data;
    const comments = commentsRes.data;

    // CALCULAR EL RANGO
    const start = page * postsPerPage;
    const end = start + postsPerPage;

    const pagePosts = posts.slice(start, end);

    // NORMALIZAR POSTS
    const fullPosts: Post[] = pagePosts.map((p: any) => {
      const user = users.find((u: any) => u.id === p.userId);

      const postComments = comments
        .filter((c: any) => c.postId === p.id)
        .map((c: any) => ({
          id: String(c.id),
          user: c.email.split("@")[0],
          userEmail: c.email,
          text: c.body,
          time: Date.now(),
        }));

      return {
        id: String(p.id),
        user: user?.username ?? "Unknown",
        userEmail: user?.email ?? "unknown@example.com",
        profilePic: `https://i.pravatar.cc/150?u=${user?.email}`,
        time: Date.now() - Math.floor(Math.random() * 4000000),
        text: p.body,
        image: "",
        likes: Math.floor(Math.random() * 30),
        likedBy: [],
        commentsList: postComments,
        category: "General",
        liked: false,
      };
    });
    return fullPosts;
  }
);




// ===============================================================
//  SLICE
// ===============================================================

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: initialSeed,
    loading: false,
    page: 0,
    hasMore: true,

    error: null as string | null,
  },
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },

    toggleLike: (state, action) => {
      const { postId, userEmail } = action.payload;
      const post = state.posts.find((p) => p.id === postId);

      if (!post) return;

      if (!post.likedBy) post.likedBy = [];

      const alreadyLiked = post.likedBy.includes(userEmail);

      if (alreadyLiked) {
        post.likedBy = post.likedBy.filter((u) => u !== userEmail);
        post.likes = Math.max(post.likes - 1, 0);
      } else {
        post.likedBy.push(userEmail);
        post.likes++;
      }

      localStorage.setItem("posts", JSON.stringify(state.posts));
    },

    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.commentsList.push(comment);
        localStorage.setItem("posts", JSON.stringify(state.posts));
      }
    },

    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },

    clearPosts: (state) => {
      state.posts = [];
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },

    updateUserPosts: (state, action) => {
      const { userEmail, newUsername, newProfilePic } = action.payload;

      state.posts = state.posts.map((post) => {
        if (post.userEmail !== userEmail) {
          return post;
        }

        return {
          ...post,
          user: newUsername,
          profilePic: newProfilePic || post.profilePic,
          commentsList: post.commentsList.map((c) =>
            c.userEmail === userEmail ? { ...c, user: newUsername } : c
          ),
        };
      });

      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
  },

  // ===============================================================
  //   HANDLE API FETCH
  // ===============================================================
  extraReducers: (builder) => {
  builder
    .addCase(fetchPostsPage.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchPostsPage.fulfilled, (state, action) => {
      state.loading = false;

      // SI VIENE VACÍO → NO HAY MÁS POSTS
      if (action.payload.length === 0) {
        state.hasMore = false;
        return;
      }

      // 1. agregar posts nuevos
      state.posts = [...state.posts, ...action.payload];

      // 2. ORDENAR TODOS LOS POSTS POR FECHA
      state.posts.sort((a, b) => b.time - a.time);

      // 3. avanzar de página
      state.page += 1;
    })
    .addCase(fetchPostsPage.rejected, (state) => {
      state.loading = false;
      state.error = "Error al cargar posts";
    });
    
},
});

export const { addPost, toggleLike, addComment, clearPosts, deletePost, updateUserPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
