import { isEmailValid, isStrongPassword } from '@/pages/Auth/Register/register.service';

export const validateField = (
    name: string,
    value: string,
    allValues?: Record<string, string>
) => {
    switch (name) {
        case 'fullName':
            return value.trim().length < 2 ? 'Họ tên phải ít nhất 2 ký tự' : '';

        case 'email':
            return !isEmailValid(value.trim()) ? 'Email không hợp lệ' : '';

        case 'password':
            return !isStrongPassword(value.trim()) ? 'Mật khẩu quá yếu' : '';

        case 'confirmPassword':
            return allValues?.password !== value.trim()
                ? 'Mật khẩu xác nhận không khớp'
                : '';

        default:
            return '';
    }
};

export const validateAllFields = (formData: Record<string, string>) => {
    const errors: Record<string, string> = {};

    Object.keys(formData).forEach(key => {
        const error = validateField(key, formData[key], formData);
        if (error) errors[key] = error;
    });

    return Object.keys(errors).length > 0 ? errors : null;
};
