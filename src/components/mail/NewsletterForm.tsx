'use client';

import React, { useState } from 'react';

interface SubscribeResponse {
  success: boolean;
  error?: string;
}

export default function SubscribePage() {
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('http://localhost:3000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data: SubscribeResponse = await res.json();

      if (res.ok && data.success) {
        setStatus({ type: 'success', message: 'Đăng ký thành công! Cảm ơn bạn.' });
        setEmail(''); 
      } else {
        setStatus({ type: 'error', message: data.error || 'Email này đã tồn tại hoặc lỗi.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Không thể kết nối tới Server Backend.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header-accent"></div>
        <div className="content">
          <div className="icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          
          <h2>Bản Tin <span>Bóng Đá</span></h2>
          <p>Nhận tin tức mới nhất từ Bongdaplus trực tiếp qua Email của bạn mỗi ngày.</p>

          <form onSubmit={handleSubscribe}>
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Địa chỉ email của bạn..."
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? <span className="spinner"></span> : 'Đăng ký ngay'}
            </button>
          </form>

          {status.type && (
            <div className={`alert ${status.type}`}>
              {status.message}
            </div>
          )}
        </div>
      </div>

<style>{`
.container {
  max-width: 600px;
  margin: 60px auto;
  padding: 0 16px;
  font-family: Arial, Helvetica, sans-serif;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.content {
  padding: 24px 24px 20px;
}

/* ===== TEXT ===== */
h2 {
  font-size: 22px;
  margin-bottom: 6px;
  color: #222;
}

p {
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
}

/* ===== FORM ===== */
form {
  display: flex;
  flex-direction: column;
  gap: 10px; /* khoảng cách đều giữa input & button */
}

input {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: fit-content;
  padding: 8px 18px;
  font-size: 14px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* ===== ALERT ===== */
.alert {
  margin-top: 10px;   /* tách nhẹ khỏi nút */
  font-size: 13px;
}

.alert.success {
  color: #1e4620;
}

.alert.error {
  color: #b00020;
}

`}</style>


    </div>
  );
}