import { isEmailValid } from "@/pages/Auth/Register/register.service";

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

// Check individual password requirements
export const checkPasswordRequirements = (
  password: string
): PasswordRequirement[] => {
  return [
    {
      label: "Ít nhất 8 ký tự",
      met: password.length >= 8,
    },
    {
      label: "Có chữ hoa (A-Z)",
      met: /[A-Z]/.test(password),
    },
    {
      label: "Có chữ thường (a-z)",
      met: /[a-z]/.test(password),
    },
    {
      label: "Có số (0-9)",
      met: /\d/.test(password),
    },
    {
      label: "Có ký tự đặc biệt (@$!%*?&#)",
      met: /[@$!%*?&#]/.test(password),
    },
  ];
};

// Check if all password requirements are met
export const isPasswordStrong = (password: string): boolean => {
  const requirements = checkPasswordRequirements(password);
  return requirements.every((req) => req.met);
};

export const validateField = (
  name: string,
  value: string,
  allValues?: Record<string, string>,
  isLogin: boolean = false // Add flag to skip password strength check on login
) => {
  switch (name) {
    case "fullName":
      return value.trim().length < 2 ? "Họ tên phải ít nhất 2 ký tự" : "";

    case "email":
      return !isEmailValid(value.trim()) ? "Email không hợp lệ" : "";

    case "password":
      // On login, just check if password exists, don't validate strength
      if (isLogin) {
        return value.trim().length === 0 ? "Vui lòng nhập mật khẩu" : "";
      }
      // On register, check password strength
      return !isPasswordStrong(value.trim()) ? "Mật khẩu chưa đủ mạnh" : "";

    case "confirmPassword":
      return allValues?.password !== value.trim()
        ? "Mật khẩu xác nhận không khớp"
        : "";

    default:
      return "";
  }
};

export const validateAllFields = (formData: Record<string, string>) => {
  const errors: Record<string, string> = {};

  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key], formData);
    if (error) errors[key] = error;
  });

  return Object.keys(errors).length > 0 ? errors : null;
};
