import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
  id: string;
  user: string;
  text: string;
}

export interface Post {
  id: string;
  user: string;
  content: string;
  likes: number;
  comments: Comment[];
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
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
      if (post) post.likes += 1;
    },
    addComment: (
      state,
      action: PayloadAction<{ postId: string; comment: Comment }>
    ) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) post.comments.push(action.payload.comment);
    },
  },
});

export const { addPost, toggleLike, addComment } = postsSlice.actions;
export default postsSlice.reducer;
