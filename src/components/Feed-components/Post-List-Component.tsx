import { useState, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { RootState} from '../app/store';
import { useAppDispatch } from "../app/hooks";
import { addPost, Post, fetchPostsPage } from '../features/postSlice';
import { v4 as uuidv4 } from 'uuid';
import PostComponent from './Post-Component';
import PostForm from './PostForm';




interface PostListProps {
  userFilter?: string;
}

function PostList({ userFilter }: PostListProps) {
  const postsAll = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const hasMore = useSelector((state: RootState) => state.posts.hasMore);
  const page = useSelector((state: RootState) => state.posts.page);
  const posts = userFilter ? postsAll.filter(p => p.user === userFilter) : postsAll;
  console.log('Posts all from Redux:', posts);
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);


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

useEffect(() => {
  const saved = localStorage.getItem("posts");

  // If there are no saved posts in localStorage and store is empty, fetch the first page
  if ((!saved || JSON.parse(saved).length === 0) && postsAll.length === 0) {
    dispatch(fetchPostsPage(0));
  }
}, [dispatch, postsAll.length]);

const handleLoadMore = () => {
  if (!loading && hasMore) {
    dispatch(fetchPostsPage(page));
  }
};

const sentinelRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  const sentinel = sentinelRef.current;
  if (!sentinel) return;

  // si ya no hay más o está cargando, no hacemos nada
  if (loading || !hasMore) return;

  // Callback del observer
  const onIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !loading && hasMore) {
        // dispatch de la siguiente página
        dispatch(fetchPostsPage(page));
      }
    });
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: '200px',
      threshold: 0.1,
    });
    io.observe(sentinel);

    return () => {
      io.disconnect();
    };
  } else {
    // Fallback: scroll listener (por si es un navegador antiguo)
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
        if (bottom && !loading && hasMore) {
          dispatch(fetchPostsPage(page));
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }
}, [dispatch, page, loading, hasMore]);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 600) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
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

        {/* Loading skeletons when fetching first page */}
        {loading && posts.length === 0 && (
          <div className="w-full space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse p-4 bg-white rounded-lg border">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* sentinel para infinite scroll */}
      <div ref={sentinelRef} className="w-full h-6" />
        {showScrollTop && (
  <button
    onClick={scrollToTop}
    className="fixed md:bottom-6 md:right-6 md:top-auto top-30 px-6 py-2 md:p-4 h-fit rounded-full cursor-pointer shadow-xl bg-brand text-white transition-all"
    aria-label="Volver arriba"
      >
        ↑
      </button>
    )}
      <div className="w-full max-w-lg flex justify-center my-6">
        {hasMore ? (
          <button
            className="px-6 py-2 bg-brand text-white rounded-lg disabled:opacity-50"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Cargar más'}
          </button>
        ) : (
          <p className="text-sm text-gray-500">No hay más publicaciones</p>
        )}
      </div>
        
    </div>
  );
}

export default PostList;

