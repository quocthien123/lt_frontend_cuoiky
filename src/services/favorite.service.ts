// Hàm thêm hoặc xóa bài viết yêu thích
export const toggleFavorite = (
  userEmail: string,
  article: { slug: string; title: string; thumb: string; category: string }
): boolean => {
  const data = JSON.parse(localStorage.getItem("user_favorites") || "{}");

  if (!data[userEmail]) data[userEmail] = [];

  const index = data[userEmail].findIndex(
    (item: { slug: string }) => item.slug === article.slug
  );
  if (index > -1) {
    data[userEmail].splice(index, 1);
  } else {
    data[userEmail].push(article);
  }

  localStorage.setItem("user_favorites", JSON.stringify(data));
  return index === -1;
};

// Hàm kiểm tra bài viết đã được yêu thích hay chưa
export const isArticleLiked = (
  userEmail: string,
  articleSlug: string
): boolean => {
  const data = JSON.parse(localStorage.getItem("user_favorites") || "{}");
  if (!data[userEmail]) return false;
  return data[userEmail].some(
    (item: { slug: string }) => item.slug === articleSlug
  );
};

// Hàm lấy danh sách bài viết yêu thích của người dùng
export const getUserFavorites = (
  userEmail: string
): Array<{ slug: string; title: string; thumb: string; category: string }> => {
  const data = JSON.parse(localStorage.getItem("user_favorites") || "{}");
  return data[userEmail] || [];
};
