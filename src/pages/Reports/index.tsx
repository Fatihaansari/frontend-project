import CommentSection from "@/components/comments/CommentSection";

export default function index() {
  return (
    <div className="p-6">
      <CommentSection targetType="task" targetId="task-1" />
    </div>
  );
}
