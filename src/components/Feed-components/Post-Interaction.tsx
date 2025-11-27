import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleLike, addComment } from "../features/postSlice";
import CommentList from "./CommentList";
import { supabase } from "../../supabaseClient";

interface PostInteractionProps {
  postId: string;
  initialLikes: number;
  initialComments: any[];
}

const PostInteraction: React.FC<PostInteractionProps> = ({
  postId,
  initialLikes,
  initialComments,
}) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.auth.user);

  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  /* ---------------------- CHECK LIKE ON MOUNT ---------------------- */
  useEffect(() => {
  if (!currentUser) return;

  const checkIfUserLiked = async () => {
    const { data, error } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", currentUser.id)
      .limit(1);

    // data es un ARRAY, aunque sea 1 solo elemento
    setLiked(data && data.length > 0);
  };

  checkIfUserLiked();
}, [currentUser, postId]);


  /* ----------------------------- LIKE ----------------------------- */
  const handleLike = async () => {
    if (!currentUser) {
      alert("Inicia sesión");
      return;
    }

    const result = await dispatch(
      toggleLike({ postId, userId: currentUser.id })
    );

    if (result.meta.requestStatus === "fulfilled") {
      const { likes_count, added } = result.payload as { likes_count: number; added: boolean };

      setLikes(likes_count);
      setLiked(added);
    }
  };

  /* --------------------------- COMENTAR --------------------------- */
  const handleAddComment = async (e: any) => {
    e.preventDefault();
    if (!currentUser) return alert("Inicia sesión");
    if (!newComment.trim()) return;

    const result = await dispatch(
      addComment({
        postId,
        userId: currentUser.id,
        text: newComment,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      const payload = result.payload as { comment: any };
      const newC = payload.comment;
      setComments((prev) => [...prev, newC]);
      setNewComment("");
    }
  };

  /* --------------------------- ICONOS ----------------------------- */
  const heartOn = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill text-brand" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
    </svg>
  );

  const heartOff = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart text-brand" viewBox="0 0 16 16">
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
    </svg>
  );

  const btnEffects =
    "hover:bg-brand-light hover:text-brand cursor-pointer active:bg-brand active:text-white w-full rounded-md p-1";

  const btnState =
    liked ? "bg-brand text-white font-bold" : "bg-white text-black font-regular";

  return (
    <div className="p-2.5 flex flex-col">
      {/* ------------ Bloque LIKE ------------- */}
      <div className="flex flex-row items-center h-fit gap-0.5">
        <button
          onClick={handleLike}
          className="focus:outline-none"
          disabled={liked === null}
        >
          {liked ? heartOn : heartOff}
        </button>

        <h2
          id="like-counter"
          className={`flex items-baseline text-lg ml-2 ${
            liked ? "text-brand" : "text-black"
          }`}
        >
          {likes}
        </h2>
      </div>

      {/* ------------ Botones principales ------------- */}
      <div className="flex justify-around mt-2">
        <button
          className={`${btnEffects} ${btnState}`}
          onClick={handleLike}
          disabled={liked === null}
        >
          {liked ? "Liked" : "Like"}
        </button>

        <button
          className={btnEffects}
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          Comentar
        </button>

        <button className={btnEffects}>Compartir</button>
      </div>

      {/* ------------ Comentarios ------------- */}
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
};

export default PostInteraction;
