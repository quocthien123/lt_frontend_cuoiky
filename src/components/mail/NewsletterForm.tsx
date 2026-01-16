// components/NewsletterForm.tsx
'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="newsletter-container">
      <h3>Đăng ký nhận tin mới</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email của bạn..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Đang gửi...' : 'Đăng ký'}
        </button>
      </form>
      {status === 'success' && <p className="text-green">Cảm ơn bạn đã đăng ký!</p>}
      {status === 'error' && <p className="text-red">Có lỗi xảy ra, vui lòng thử lại.</p>}
    </div>
  );
}