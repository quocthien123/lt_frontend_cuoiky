const STORAGE_KEY = "recently_viewed";
const MAX_ITEMS = 15;

export interface ViewedArticle {
  slug: string;
  title: string;
  thumb: string;
  category: string;
  viewedAt: number;
}

// Thêm bài viết vào lịch sử đọc
export const addToReadingHistory = (article: Omit<ViewedArticle, "viewedAt">) => {
  const history = getReadingHistory();
  
  const filtered = history.filter((item) => item.slug !== article.slug);
  
  const newHistory = [
    { ...article, viewedAt: Date.now() },
    ...filtered,
  ].slice(0, MAX_ITEMS);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
};

// Lấy danh sách lịch sử đọc
export const getReadingHistory = (): ViewedArticle[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Xóa toàn bộ lịch sử đọc
export const clearReadingHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Xóa một bài viết khỏi lịch sử đọc
export const removeFromHistory = (slug: string) => {
  const history = getReadingHistory();
  const filtered = history.filter((item) => item.slug !== slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
