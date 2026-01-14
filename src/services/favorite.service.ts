// Hàm lưu trữ và quản lý danh sách bài viết yêu thích của người dùng sử dụng localStorage
export const toggleFavorite = (userEmail: string, articleSlug: string): boolean => {
    const data = JSON.parse(localStorage.getItem('user_favorites') || '{}');

    if (!data[userEmail]) {
        data[userEmail] = [];
    }

    const index = data[userEmail].indexOf(articleSlug);
    if (index > -1) {
        // Nếu có rồi thì xóa (Unfavorite)
        data[userEmail].splice(index, 1);
    } else {
        // Nếu chưa có thì thêm vào
        data[userEmail].push(articleSlug);
    }

    localStorage.setItem('user_favorites', JSON.stringify(data));
    return index === -1; // Trả về true nếu vừa thêm, false nếu vừa xóa
};

// Hàm kiểm tra xem bài viết đã được yêu thích bởi người dùng hay chưa
export const isArticleLiked = (userEmail: string, articleSlug: string): boolean => {
    const data = JSON.parse(localStorage.getItem('user_favorites') || '{}');
    return data[userEmail] ? data[userEmail].includes(articleSlug) : false;
};