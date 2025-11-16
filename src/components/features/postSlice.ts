import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import feedData from '../Feed-components/FeedData.json'
import { v4 as uuidv4 } from 'uuid';

export interface Comment {
  id: string;
  user: string; 
  userEmail: string; // email como identificador único
  text: string;
}

export interface Post {
  id: string;
  user: string; 
  userEmail: string; // email como identificador único
  profilePic?: string;
  time: number;
  text: string;
  image: string;
  likes: number;
  commentsList: Comment[];
  category: string;
  liked: boolean;
  likedBy: string[]; // almacena emails de quiénes dieron like
}

interface PostsState {
  posts: Post[];
}

const DEFAULT_PROFILE_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png";

// Seed initial posts from FeedData.json so seeding happens once at store init
const seededPosts: Post[] = Array.isArray(feedData)
  ? feedData.map((d: any) => {
      // Normalizar time:
      // - Si d.time ya es un timestamp (>= 1e12 aprox), lo usamos tal cual.
      // - Si d.time es un número pequeño (p. ej. 1, 5, 24) lo interpretamos como horas atrás.
      let timeMs: number;
      const maybe = Number(d.time) || 0;

      if (maybe >= 1e12) {
        // ya es ms timestamp
        timeMs = maybe;
      } else if (maybe > 0 && maybe < 1e12) {
        // lo interpretamos como horas atrás
        timeMs = Date.now() - maybe * 60 * 60 * 1000;
      } else {
        // fallback: ahora
        timeMs = Date.now();
      }

      return {
        id: String(d.id ?? uuidv4()),
        user: d.user ?? 'Unknown',
        userEmail: d.userEmail ?? d.user ?? 'unknown@example.com', // retrocompatibilidad
        profilePic: d.profilePic ?? DEFAULT_PROFILE_IMAGE,
        time: timeMs,
        text: d.text ?? '',
        image: d.image ?? '',
        likes: d.likes ?? 0,
        commentsList: Array.isArray(d.commentsList)
          ? d.commentsList.map((c: any) => ({ 
              id: uuidv4(), 
              user: c.user ?? 'Anon', 
              userEmail: c.userEmail ?? c.user ?? 'unknown@example.com', // retrocompatibilidad
              text: c.text ?? '' 
            }))
          : [],
        category: d.category ?? '',
        liked: false,
      } as Post;
    })
  : [];

const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

const normalizePosts = (posts: any[]) =>
  posts.map((p) => ({
    ...p,
    userEmail: p.userEmail || p.user || 'unknown@example.com', // retrocompatibilidad: usa email o username como fallback
    likedBy: p.likedBy || [], // 🔹 si no existe, la crea vacía
    liked: false,
    commentsList: Array.isArray(p.commentsList)
      ? p.commentsList.map((c: any) => ({
          ...c,
          userEmail: c.userEmail || c.user || 'unknown@example.com', // retrocompatibilidad
        }))
      : [],
  }));

const initialState = {
  posts: savedPosts.length > 0 ? normalizePosts(savedPosts) : normalizePosts(feedData),
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      
      state.posts.unshift(action.payload);

    },
    
    toggleLike: (state, action) => {
    const { postId, userEmail } = action.payload;
    const post = state.posts.find(p => p.id === postId);
    if (post) {
      // Aseguramos que el post tenga su lista de likes
      if (!Array.isArray(post.likedBy)) post.likedBy = [];

      const alreadyLiked = post.likedBy.includes(userEmail);

      if (alreadyLiked) {
        post.likedBy = post.likedBy.filter((u: string) => u !== userEmail);

        post.likes = Math.max(0, post.likes - 1);
      } else {
        post.likedBy.push(userEmail);
        post.likes += 1;
      }
    }

    localStorage.setItem("posts", JSON.stringify(state.posts));
  },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.commentsList.push(comment);
      }
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },

    clearPosts: (state) => {
    state.posts = [];
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      state.posts = state.posts.filter(post => post.id !== postId);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    updateUserPosts: (state, action) => {
  const { userEmail, newUsername, newProfilePic } = action.payload;
  state.posts = state.posts.map(post => 
    post.userEmail === userEmail
      ? { 
          ...post, 
          user: newUsername, 
          profilePic: newProfilePic || post.profilePic,
          // Actualizar también el username en los comentarios del usuario
          commentsList: post.commentsList.map(comment =>
            comment.userEmail === userEmail
              ? { ...comment, user: newUsername }
              : comment
          )
        }
      : post
  );
  localStorage.setItem("posts", JSON.stringify(state.posts)); // 🔹 guardar en posts directamente
},

  },
});

export const { addPost, toggleLike, addComment, clearPosts, deletePost, updateUserPosts } = postsSlice.actions;
export default postsSlice.reducer;