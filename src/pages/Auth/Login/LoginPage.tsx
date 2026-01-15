import { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { validateField } from "@/utils/authValidation.ts";
import type { User } from "@/types/auth.ts";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const { login } = useAuth(); // 2. Lấy hàm login từ kho dùng chung
  const navigate = useNavigate(); // Dùng cái này để chuyển trang mượt hơn

  // State cho form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State cho lỗi validation
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // State hiện/ẩn mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const newFormData = { ...formData, [id]: value };
    setFormData(newFormData);

    const errorMsg = validateField(id, value, newFormData, true); // Pass true for isLogin
    setErrors((prev) => ({ ...prev, [id]: errorMsg }));
  };

  // Xử lý đăng nhập
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate các fields
    const emailError = validateField("email", formData.email, formData, true);
    const passwordError = validateField(
      "password",
      formData.password,
      formData,
      true // Pass true for isLogin
    );

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u: User) =>
          u.email === formData.email && u.password === btoa(formData.password)
      );

      if (user) {
        login(user); // Thay vì tự set localStorage, gọi hàm này để "thông báo" cho cả App
        toast.success(`Đăng nhập thành công, chào mừng ${user.fullName}!`);
        setTimeout(() => {
          navigate("/"); // Chuyển về trang chủ sau 2 giây
        }, 2000);
      } else {
        toast.error("Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra!");
      console.error(error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1>Đăng nhập</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputField}>
              <i className="fas fa-envelope"></i>
              <input
                id="email"
                type="email"
                placeholder="abc@gmail.com"
                value={formData.email}
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
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? styles.inputError : ""}
                required
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                } ${styles.togglePass}`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <button id={styles.loginBtn} type="submit" className={styles.btn}>
            Đăng nhập
          </button>
          <p>
            Bạn chưa có tài khoản?{" "}
            <Link className={styles.link} to="/register">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
