import { useState } from "react";
import styles from "./RegisterPage.module.css";
import { saveUserToStorage } from "@/pages/Auth/Register/register.service.ts";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { validateAllFields, validateField } from "@/utils/authValidation.ts";
import toast from "react-hot-toast";
import { PasswordStrengthIndicator } from "@/components/auth/PasswordStrengthIndicator";

export const RegisterPage = () => {
  // Khởi tạo navigate
  const navigate = useNavigate();

  // Khai báo State cần cho form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // State cho lỗi validation
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Cập nhật dữ liệu cho form
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Cập nhật formData
    const newFormData = { ...formData, [id]: value };
    setFormData(newFormData);

    // Validate field với formData mới
    const errorMsg = validateField(id, value, newFormData);
    setErrors((prev) => ({ ...prev, [id]: errorMsg }));
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate tất cả fields
    const validationErrors = validateAllFields(formData);

    if (validationErrors) {
      setErrors((prev) => ({ ...prev, ...validationErrors }));
      return;
    }

    try {
      saveUserToStorage(formData);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1>Đăng ký tài khoản</h1>
        <form onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName">Họ và tên</label>
            <div className={styles.inputField}>
              <i className="fas fa-user"></i>
              <input
                id="fullName"
                type="text"
                placeholder="Họ và tên"
                onChange={handleChange}
                className={errors.fullName ? styles.inputError : ""}
                required
              />
            </div>
            {/* Hiển thị lỗi ở đây */}
            {errors.fullName && (
              <span className={styles.errorText}>{errors.fullName}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputField}>
              <i className="fas fa-envelope"></i>
              <input
                id="email"
                type="email"
                placeholder="abc@gmail.com"
                onChange={handleChange}
                className={errors.email ? styles.inputError : ""}
                required
              />
            </div>
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <div className={styles.inputField}>
              <i className="fas fa-lock"></i>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                onChange={handleChange}
                className={errors.password ? styles.inputError : ""}
                required
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                } ${styles.togglePass}`}
                onClick={() => setShowPassword(!showPassword)}
                id="togglePassword"
              ></i>
            </div>
            <PasswordStrengthIndicator password={formData.password} />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <div className={styles.inputField}>
              <i className="fas fa-lock"></i>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                onChange={handleChange}
                className={errors.confirmPassword ? styles.inputError : ""}
                required
              />
              <i
                className={`fa-solid ${
                  showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                } ${styles.togglePass}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                id="toggleConfirmPassword"
              ></i>
            </div>
            {errors.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>

          <button id={styles.registerBtn} type="submit" className={styles.btn}>
            Đăng ký
          </button>
          <p>
            Bạn đã có tài khoản?{" "}
            <Link className={styles.link} to="/login">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
