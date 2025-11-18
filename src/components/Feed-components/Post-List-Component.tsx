import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { addPost, Post} from '../features/postSlice';
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

  // 🔹 Obtenemos el usuario autenticado desde Redux
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const handleNewPost = (postData: { text: string; image: File | null }) => {
    if (!postData.text && !postData.image) return;

    // 🔹 Si no hay usuario autenticado, evitamos crear el post
    if (!currentUser) {
      alert("Debes iniciar sesión para crear una publicación.");
      return;
    }

    // 🔹 Si el usuario no tiene imagen (por alguna razón), se usa la imagen por defecto
    const defaultProfileImage =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png";

    const newPost: Post = {
      id: uuidv4(),
      user: currentUser.username,
      userEmail: currentUser.email, 
      profilePic: currentUser.profilePic || defaultProfileImage,
      time: Date.now(),
      text: postData.text || "",
      image: postData.image ? URL.createObjectURL(postData.image) : "",
      likes: 0,
      commentsList: [],
      category: "",
      liked: false,
      likedBy: [], // 👈 agregado
    };

    dispatch(addPost(newPost));
    setShowForm(false);
  };

  

  return (
    <div id="post-list-container" className="flex flex-col items-center gap-2.5 px-4 py-40 md:py-8 min-h-screen w-full bg-gradient-to-b from-brand-light to-white">
      <div id="post-list-header" className="flex flex-row justify-between max-w-100 w-full px-2">
        <h1 className="font-bold text-2xl">Últimas publicaciones</h1>
        <button
          id="añadir-btn"
          className="text-brand font-bold bg-white rounded-2xl p-2 px-6 border   hover:bg-brand hover:text-white cursor-pointer"
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
