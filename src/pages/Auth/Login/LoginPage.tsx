import { useState } from 'react';
import styles from './LoginPage.module.css';
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import { validateField } from "@/utils/authValidation.ts";
import type {User} from "@/types/auth.ts";
import {useAuth} from "@/context/AuthContext.tsx";

export const LoginPage = () => {

    const { login } = useAuth(); // 2. Lấy hàm login từ kho dùng chung
    const navigate = useNavigate(); // Dùng cái này để chuyển trang mượt hơn

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        const newFormData = { ...formData, [id]: value };
        setFormData(newFormData);

        const errorMsg = validateField(id, value, newFormData);
        setErrors(prev => ({ ...prev, [id]: errorMsg }));
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate các fields
        const emailError = validateField('email', formData.email, formData);
        const passwordError = validateField('password', formData.password, formData);

        if (emailError || passwordError) {
            setErrors({
                email: emailError,
                password: passwordError
            });
            return;
        }

        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find((u: User) =>
                u.email === formData.email && u.password === btoa(formData.password)
            );

            if (user) {
                // 3. THAY THẾ ĐOẠN NÀY:
                login(user); // Thay vì tự set localStorage, gọi hàm này để "thông báo" cho cả App
                alert('Đăng nhập thành công!');
                navigate('/'); // Chuyển trang mượt mà, Header tự đổi tên ngay
            } else {
                alert('Email hoặc mật khẩu không đúng!');
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
                                className={errors.email ? styles.inputError : ''}
                                required
                            />
                        </div>
                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
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
                                className={errors.password ? styles.inputError : ''}
                                required
                            />
                            <i
                                className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} ${styles.togglePass}`}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                    </div>

                    <button id={styles.loginBtn} type="submit" className={styles.btn}>Đăng nhập</button>
                    <p>Bạn chưa có tài khoản? <Link className={styles.link} to="/register">Đăng ký</Link></p>
                </form>
            </div>
        </div>
    );
};
