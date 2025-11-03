import { useState } from "react";
import PostInteractions from "./Post-Interaction";
import CommentList from "./CommentList";


interface Comment {
  user: string;
  text: string;
}

interface PostCompProps{
  user: string;
  pic: string;
  time: number;
  text: string;
  img: string;
  cat?: string;
  likes?: number;
  commentsList?: Comment[];
}

function PostComponent({user, pic, time, text, img, cat, likes = 0, commentsList = []}:PostCompProps){
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(prev => !prev);
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setExpanded(prev => !prev);
    }
  };

  return(
    <div id="post-component" className="flex flex-col w-full min-h-100 bg-white gap-3.5 p-2.5 border-black border-2 rounded-2xl">
      <div className="flex flex-row gap-2.5">
        <img src={pic} className="w-13 h-13 rounded-full object-cover" alt={`${user} perfil`} />
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-2xl text-brand">{user}</h3>
          <p className="font-light text-sm">Hace {time} horas</p>
        </div>
      </div>

      <p
        className={`font-light text-sm ${expanded ? "" : "line-clamp-2"} cursor-pointer`}
        onClick={handleToggle}
        onKeyDown={handleKey}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
      >
        {text}
      </p>

      {img && (
        <div className="flex h-74 overflow-hidden align-middle rounded-2xl object-center focus:h-fit">
          <img className="w-full object-cover" src={img} alt="Post image" />
        </div>
      )}

      <PostInteractions initialLikes={likes} initialComments={commentsList} />
    </div>
  )
}

export default PostComponent
