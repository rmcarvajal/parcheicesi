import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import feedData from '../Feed-components/FeedData.json';
import { v4 as uuidv4 } from 'uuid';

export interface Comment {
  id: string;
  user: string;
  text: string;
}

export interface Post {
  id: string;
  user: string;
  profilePic?: string;
  time?: number;
  text?: string;
  image?: string;
  likes: number;
  commentsList: Comment[];
  category?: string;
  liked?: boolean;
}

interface PostsState {
  posts: Post[];
}

// Seed initial posts from FeedData.json so seeding happens once at store init
const seededPosts: Post[] = Array.isArray(feedData)
  ? feedData.map((d: any) => ({
      id: String(d.id ?? uuidv4()),
      user: d.user ?? 'Unknown',
      profilePic: d.profilePic ?? '',
      time: d.time ?? 0,
      text: d.text ?? '',
      image: d.image ?? '',
      likes: d.likes ?? 0,
      commentsList: Array.isArray(d.commentsList)
        ? d.commentsList.map((c: any) => ({ id: uuidv4(), user: c.user ?? 'Anon', text: c.text ?? '' }))
        : [],
      category: d.category ?? '',
      liked: false,
    }))
  : [];

const initialState: PostsState = {
  posts: seededPosts,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        if (post.liked) {
          post.likes = Math.max(0, post.likes - 1);
          post.liked = false;
        } else {
          post.likes = (post.likes || 0) + 1;
          post.liked = true;
        }
      }
    },
    addComment: (
      state,
      action: PayloadAction<{ postId: string; comment: Comment }>
    ) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) post.commentsList.push(action.payload.comment);
    },
  },
});

export const { addPost, toggleLike, addComment } = postsSlice.actions;
export default postsSlice.reducer;