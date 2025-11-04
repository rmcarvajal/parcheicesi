import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { addPost, Post } from '../features/postSlice';
import { v4 as uuidv4 } from 'uuid';
import PostComponent from './Post-Component';
import PostForm from './PostForm';

interface PostListProps {
  userFilter?: string;
}

function PostList({ userFilter }: PostListProps) {
  const postsAll = useSelector((state: RootState) => state.posts.posts);
  const posts = userFilter ? postsAll.filter(p => p.user === userFilter) : postsAll;
  const dispatch = useDispatch<AppDispatch>();
  const [showForm, setShowForm] = useState(false);

  const handleNewPost = (postData: { text: string; image: File | null }) => {
    if (!postData.text && !postData.image) return;

    const newPost: Post = {
      id: uuidv4(),
      user: userFilter || "Usuario Actual",
      profilePic: "src/Assets/default-profile.jpg",
      time: 0,
      text: postData.text || "",
      image: postData.image ? URL.createObjectURL(postData.image) : "",
      likes: 0,
      commentsList: [],
      category: "",
      liked: false,
    };

    dispatch(addPost(newPost));
    setShowForm(false);
  };

  // initial posts are seeded in the Redux slice at store initialization

  return (
    <div id="post-list-container" className="flex flex-col items-center gap-2.5 px-4 py-8 min-h-screen w-full bg-gradient-to-b from-brand-light to-white">
      <div id="post-list-header" className="flex flex-row justify-between max-w-100 w-full px-2">
        <h1 className="font-bold text-2xl">Ultimas publicaciones</h1>
        <button
          id="añadir-btn"
          className="text-brand font-bold bg-white rounded-2xl p-2 px-6 border hover:bg-brand hover:text-white cursor-pointer"
          onClick={() => setShowForm(!showForm)}
        >
          + Añadir
        </button>
      </div>

      {showForm && <PostForm onSubmit={handleNewPost} />}

      <div id="post-list" className="flex flex-col items-center h-fit w-full max-w-lg gap-6 mt-4">
        {posts.map((p) => (
          <PostComponent
            key={p.id}
            id={p.id}
            user={p.user}
            pic={p.profilePic || ''}
            time={p.time || 0}
            text={p.text || ''}
            img={p.image || ''}
            cat={p.category}
            likes={p.likes}
            commentsList={p.commentsList}
          />
        ))}
      </div>

      {posts.length === 0 && <h3 className="my-10 text-gray-500">No hay posts...</h3>}
    </div>
  );
}

export default PostList;