import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      const errors = err.response?.data;
      const message = errors?.email?.[0] || errors?.username?.[0] || errors?.password?.[0] || 'Registration failed.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)',
    }}>
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)', padding: '48px',
        width: '100%', maxWidth: '420px',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'var(--primary)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '28px' }}>P</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--gray-800)' }}>
            Create your account
          </h1>
          <p style={{ color: 'var(--gray-500)', marginTop: '8px', fontSize: '14px' }}>
            Join Market Place today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '6px' }}>
              Username
            </label>
            <input
              type="text" name="username" value={form.username}
              onChange={handleChange} required
              placeholder="johndoe"
              style={{
                width: '100%', padding: '10px 14px',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius)', fontSize: '14px',
                color: 'var(--gray-800)',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email" name="email" value={form.email}
              onChange={handleChange} required
              placeholder="you@example.com"
              style={{
                width: '100%', padding: '10px 14px',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius)', fontSize: '14px',
                color: 'var(--gray-800)',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password" name="password" value={form.password}
              onChange={handleChange} required
              placeholder="Minimum 8 characters"
              style={{
                width: '100%', padding: '10px 14px',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius)', fontSize: '14px',
                color: 'var(--gray-800)',
              }}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '12px',
            background: loading ? 'var(--gray-400)' : 'var(--primary)',
            color: 'white', borderRadius: 'var(--radius)',
            fontSize: '15px', fontWeight: '600',
            transition: 'all 0.2s',
          }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--gray-500)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}