import { useState, type KeyboardEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { deletePost } from "../features/postSlice";
import PostInteractions from "./Post-Interaction";
import { Comment as CommentType } from "../features/postSlice";
import { timeAgo } from "../../utils/time";

interface PostCompProps {
  id: string;
  user: string;
  pic: string;
  time: string;
  text: string;
  img?: string;
  category?: string;
  likes: number;
  commentsList: CommentType[];
  user_id: string;
}

function PostComponent({
  id,
  user,
  pic,
  time,
  text,
  img,
  likes = 0,
  commentsList = [],
  user_id,
}: PostCompProps) {
  const [expanded, setExpanded] = useState(false);
  const [expandedImage, setExpandedImage] = useState(false);

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = () => setExpanded((prev) => !prev);
  const handleImageToggle = () => setExpandedImage((prev) => !prev);

  const handleKey = (e: KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setExpanded((prev) => !prev);
    }
  };

  const handleDelete = async () => {
  if (window.confirm("¿Estás seguro de que quieres eliminar este post?")) {
    await dispatch(deletePost(id));
    window.location.reload(); // ← Recarga la página después de borrar
  }
};

  // ✔ Comparar por user_id en lugar de email
  const isOwner = currentUser && currentUser.id === user_id;

  return (
     <div id="post-component" className="flex flex-col w-full h-hug bg-white gap-3.5 p-2.5 border-black border-2 rounded-2xl">
      <div className="flex flex-row gap-2.5 justify-between items-start">
        <div className="flex flex-row gap-2.5">
          <img src={pic} className="w-13 h-13 rounded-full object-cover" alt={`${user} perfil`} />
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-2xl text-brand">{user}</h3>
            <p className="font-light text-sm"> {time ? timeAgo(time) : ''} </p>
          </div>
        </div>
        {isOwner && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 font-semibold text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
            aria-label="Eliminar post"
            title="Eliminar post"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button>
        )}
      </div>

      <p
        className={`font-light ${!img ? 'text-base md:text-xl' : 'text-sm'} ${expanded ? "" : "line-clamp-2"} cursor-pointer`}
        onClick={handleToggle}
        onKeyDown={handleKey}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
      >
        {text}
      </p>

      {img && (
        <div className={`flex align-middle rounded-2xl transition-all duration-300 ${expandedImage ? '' : 'h-74 overflow-hidden'}`}>
          <img 
            className="w-full object-cover cursor-pointer rounded-2xl" 
            src={img} 
            alt="Post image" 
            onClick={handleImageToggle}
          />
        </div>
      )}

      <PostInteractions 
        postId={id}
        initialLikes={likes}
        initialComments={commentsList}
      />
    </div>
  );
}

export default PostComponent;
