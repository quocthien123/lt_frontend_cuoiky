// Hàm lưu trữ và quản lý danh sách bài viết yêu thích của người dùng sử dụng localStorage
export const toggleFavorite = (
  userEmail: string,
  article: { slug: string; title: string; thumb: string; category: string }
): boolean => {
  const data = JSON.parse(localStorage.getItem("user_favorites") || "{}");

  if (!data[userEmail]) data[userEmail] = [];

  // Kiểm tra xem bài viết đã có trong danh sách yêu thích chưa
  const index = data[userEmail].findIndex(
    (item: { slug: string }) => item.slug === article.slug
  );
  if (index > -1) {
    // Nếu có rồi thì xóa (Unfavorite)
    data[userEmail].splice(index, 1);
  } else {
    // Nếu chưa có thì thêm vào
    data[userEmail].push(article);
  }

  localStorage.setItem("user_favorites", JSON.stringify(data));
  return index === -1; // Trả về true nếu đã thêm, false nếu đã xóa
};

// Hàm kiểm tra xem bài viết đã được yêu thích bởi người dùng hay chưa
export const isArticleLiked = (
  userEmail: string,
  articleSlug: string
): boolean => {
  const data = JSON.parse(localStorage.getItem("user_favorites") || "{}");
  if (!data[userEmail]) return false;
  // Check if slug exists in array of objects
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
