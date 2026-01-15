import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  addComment,
  getCommentsForArticle,
  deleteComment,
} from "@/services/comment.service";
import type { Comment } from "@/types/comment";
import styles from "./CommentSection.module.css";
import toast from "react-hot-toast";

interface CommentSectionProps {
  articleSlug: string;
}

export const CommentSection = ({ articleSlug }: CommentSectionProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const loadComments = () => {
      const articleComments = getCommentsForArticle(articleSlug);
      setComments(articleComments);
    };
    loadComments();
  }, [articleSlug]);

  // Hàm xử lý thêm bình luận mới
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Vui lòng đăng nhập để bình luận");
      return;
    }

    if (newComment.trim().length === 0) {
      toast.error("Nội dung bình luận không được để trống");
      return;
    }

    const comment = addComment({
      articleSlug,
      userEmail: user.email,
      userName: user.fullName,
      content: newComment.trim(),
    });

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
    toast.success("Đã thêm bình luận");
  };

  // Hàm xử lý xóa bình luận
  const handleDeleteComment = (commentId: string) => {
    deleteComment(articleSlug, commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    toast.success("Đã xóa bình luận");
  };

  // Formatter ngày tháng
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;

    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className={styles.commentSection}>
      <h2 className={styles.title}>Bình luận ({comments.length})</h2>

      {user ? (
        <form className={styles.commentForm} onSubmit={handleAddComment}>
          <textarea
            className={styles.textarea}
            placeholder="Viết bình luận của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <button type="submit" className={styles.submitBtn}>
            Gửi bình luận
          </button>
        </form>
      ) : (
        <div className={styles.loginPrompt}>
          <p>Vui lòng đăng nhập để bình luận</p>
        </div>
      )}

      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>
            Chưa có bình luận nào. Hãy là người đầu tiên!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.commentCard}>
              <div className={styles.commentHeader}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{comment.userName}</span>
                  <span className={styles.timestamp}>
                    {formatDate(comment.timestamp)}
                  </span>
                </div>
                {user && user.email === comment.userEmail && (
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteComment(comment.id)}
                    title="Xóa bình luận"
                  >
                    ✕
                  </button>
                )}
              </div>
              <p className={styles.commentContent}>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
