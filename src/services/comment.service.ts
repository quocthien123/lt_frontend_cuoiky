import { type Comment } from "@/types/comment";

// Hàm thêm bình luận mới
// Omit để không cần truyền id và timestamp khi gọi hàm
export const addComment = (
  comment: Omit<Comment, "id" | "timestamp">
): Comment => {
  const uniqueId =
    Date.now().toString() + Math.random().toString(36).substring(2, 8);

  const newComment: Comment = {
    ...comment,
    id: uniqueId,
    timestamp: Date.now(),
  };

  const data = JSON.parse(localStorage.getItem("article_comments") || "{}");

  if (!data[comment.articleSlug]) {
    data[comment.articleSlug] = [];
  }

  data[comment.articleSlug].unshift(newComment);
  localStorage.setItem("article_comments", JSON.stringify(data));

  return newComment;
};

// Hàm lấy danh sách bình luận cho một bài viết

export const getCommentsForArticle = (articleSlug: string): Comment[] => {
  const data = JSON.parse(localStorage.getItem("article_comments") || "{}");
  const comments = data[articleSlug] || [];

  return comments.sort((a: Comment, b: Comment) => b.timestamp - a.timestamp);
};

// Hàm xóa bình luận theo ID

export const deleteComment = (articleSlug: string, commentId: string) => {
  const data = JSON.parse(localStorage.getItem("article_comments") || "{}");

  if (data[articleSlug]) {
    data[articleSlug] = data[articleSlug].filter(
      (comment: Comment) => comment.id !== commentId
    );

    if (data[articleSlug].length === 0) {
      delete data[articleSlug];
    }

    localStorage.setItem("article_comments", JSON.stringify(data));
  }
};
