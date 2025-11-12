import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, addComment, Comment as CommentType } from '../features/postSlice';
import { RootState, AppDispatch } from '../app/store';
import { v4 as uuidv4 } from 'uuid';
import CommentList from './CommentList';

interface PostInteractionsProps {
  postId: string;
  initialLikes?: number;
  initialComments?: CommentType[];
}

function PostInteractions({ postId, initialLikes = 0, initialComments = [] }: PostInteractionsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const post = useSelector((state: RootState) =>
    state.posts.posts.find((p) => p.id === postId)
  );
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");

  const likes = post?.likes ?? initialLikes;
  const comments = post?.commentsList ?? initialComments;
  const likedBy = post?.likedBy ?? [];
  const liked = currentUser ? likedBy.includes(currentUser.username) : false;

  const handleLike = () => {
    if (!currentUser) {
      alert("Debes iniciar sesión para dar like.");
      return;
    }

    dispatch(toggleLike({ postId, username: currentUser.username }));
  };

  const handleAddComment = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = newComment.trim();
    if (!text || !currentUser) return;

    const comment: CommentType = {
      id: uuidv4(),
      user: currentUser.username,
      text,
    };

    dispatch(addComment({ postId, comment }));
    setNewComment("");
  };

  const heartOff = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart text-brand" viewBox="0 0 16 16">
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
    </svg>
  );
  
  const heartOn = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill text-brand" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
    </svg>
  );

  const btnEffects = "hover:bg-brand-light hover:text-brand cursor-pointer active:bg-brand active:text-white w-full rounded-md p-1";
  const btnState = liked ? "bg-brand text-white font-bold" : "bg-white text-black font-regular";

  return (
    <div className="p-2.5 flex flex-col">
      <div className="flex flex-row items-center h-fit gap-0.5">
        <button onClick={handleLike} className="focus:outline-none">
          {liked ? heartOn : heartOff}
        </button>
        <h2 id="like-counter" className={`flex items-baseline text-lg ml-2 ${liked ? 'text-brand' : 'text-black'}`}>
          {likes}
        </h2>
      </div>

      <div className="flex justify-around mt-2">
        <button className={`${btnEffects} ${btnState}`} onClick={handleLike}>
          {liked ? "Liked" : "Like"}
        </button>
        <button className={btnEffects} onClick={() => setShowCommentBox(!showCommentBox)}>
          Comentar
        </button>
        <button className={btnEffects}>Compartir</button>
      </div>

      {showCommentBox && (
        <div className="mt-3 w-full">
          <form onSubmit={handleAddComment} className="flex gap-2 items-start">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="flex-1 border rounded-lg p-2 text-sm"
            />
            <button 
              type="submit" 
              className="ml-2 bg-brand text-white px-4 py-2 rounded-lg"
              disabled={!newComment.trim()}
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      {comments.length > 0 && (
        <div className="mt-3">
          <CommentList comments={comments} />
        </div>
      )}
    </div>
  );
}

export default PostInteractions;