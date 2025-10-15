interface Comment {
  user: string;
  text: string;
}

interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <ul className="mt-2 mb-2 px-2 py-1 bg-gray-50 rounded-xl border border-gray-200">
      {comments.map((comment, idx) => (
        <li key={idx} className="mb-1 last:mb-0">
          <span className="font-semibold text-brand">{comment.user}:</span>{" "}
          <span className="text-gray-700">{comment.text}</span>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;