import type { RegisterFormData, User } from '@/types/auth';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const isEmailValid = (email: string) => EMAIL_REGEX.test(email);
export const isStrongPassword = (password: string) => PASSWORD_REGEX.test(password);

export const saveUserToStorage = (formData: RegisterFormData) => {
    // 1. Lấy dữ liệu cũ
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // 2. Kiểm tra email tồn tại
    const isExisted = users.some(user => user.email.toLowerCase() === formData.email.toLowerCase().trim());
    if (isExisted) throw new Error("Email đã được sử dụng, vui lòng chọn email khác.");

    // 3. Tạo ID mới (Dùng timestamp cho đơn giản và không bao giờ trùng)
    const newId = Date.now().toString();

    // 4. Tạo người dùng mới
    const newUser: User = {
        id: newId,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        // Mã hóa Base64 để "che mắt" trong localStorage
        password: btoa(formData.password.trim())
    };

    // 5. Lưu vào mảng và ghi vào Storage
    const updatedUsers = [...users, newUser]; // Cách viết sạch hơn
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return newUser; // Trả về để component có thể dùng nếu cần
};