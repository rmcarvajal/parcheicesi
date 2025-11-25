import { timeAgo } from "../../utils/time";
import { useState } from "react";
interface Comment {
  user_name?: string;
  text: string;
  created_at: string;
}

interface CommentListItem {
  user_name?: string;
  text: string;
  created_at: string;
}


function CommentList({ comments }: { comments: CommentListItem[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!comments || comments.length === 0) return null;

  return (
    <ul className="mt-2 mb-2 px-2 py-1 bg-gray-50 rounded-xl border border-gray-200 max-h-80 overflow-y-auto overflow-x-hidden max-w-full">
      {comments.map((c, idx) => (
        <li key={idx} className="mb-1 last:mb-0 flex justify-between">
          <div className="flex flex-row">
            <span className="font-semibold text-brand">
              {c.user_name ?? "Usuario"}:
            </span>{" "}
            <span
              className={`text-gray-700 break-all ${
                expandedIndex === idx ? "" : "line-clamp-2"
              }`}
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            >
              {c.text}
            </span>
          </div>

          <span className="time self-center font-extralight text-xs ml-2 min-w-fit text-gray-400">
            {timeAgo(new Date(c.created_at).getTime())}
          </span>
        </li>
      ))}
    </ul>
  );
}


export default CommentList;