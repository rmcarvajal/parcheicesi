import { timeAgo } from "../../utils/time";
import { useState } from "react";
interface Comment {
  user: string;
  text: string;
  time: number;
}

interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
  setExpandedIndex(prev => (prev === idx ? null : idx));
};

  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <ul className="mt-2 mb-2 px-2 py-1 bg-gray-50 rounded-xl border border-gray-200 max-h-80 overflow-y-auto overflow-x-hidden max-w-full">
      {comments.map((comment, idx) => (
        <li key={idx} className="mb-1 last:mb-0 flex justify-between">
          <div className="flex flex-row">
          <span className="font-semibold text-brand">{comment.user}:</span>{" "}
          <span className={`text-gray-700 break-all ${expandedIndex === idx ? "" : "line-clamp-2"}`} onClick={() => handleToggle(idx)}>{comment.text}</span>
          </div>
          <span className="time self-center font-extralight text-xs ml-2 min-w-fit text-gray-400">
            {timeAgo(comment.time)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;