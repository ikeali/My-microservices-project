// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { loginUser } from '../services/api';
// import toast from 'react-hot-toast';

// export default function Login() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', form);
//     console.log('API URL:', process.env.REACT_APP_API_URL);
//     setLoading(true);
//     try {
//         const response = await loginUser(form);
//         console.log('Login response:', response.data);
//         login(response.data.user || { email: form.email }, response.data.access, response.data.refresh);
//         toast.success('Welcome to MarketPlace!');
//         navigate('/dashboard');
//     } catch (err) {
//         console.log('Login error:', err);
//         toast.error(err.response?.data?.detail || 'Invalid email or password.');
//     } finally {
//         setLoading(false);
//     }
//     };

//   return (
//     <div style={{
//       minHeight: '100vh', display: 'flex',
//       alignItems: 'center', justifyContent: 'center',
//       background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)',
//     }}>
//       <div style={{
//         background: 'var(--white)', borderRadius: 'var(--radius-lg)',
//         boxShadow: 'var(--shadow-lg)', padding: '48px',
//         width: '100%', maxWidth: '420px',
//       }}>
//         {/* Logo */}
//         <div style={{ textAlign: 'center', marginBottom: '32px' }}>
//           <div style={{
//             width: '56px', height: '56px', borderRadius: '16px',
//             background: 'var(--primary)', display: 'flex',
//             alignItems: 'center', justifyContent: 'center',
//             margin: '0 auto 16px',
//           }}>
//             <span style={{ color: 'white', fontWeight: 'bold', fontSize: '28px' }}>P</span>
//           </div>
//           <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--gray-800)' }}>
//             Welcome to MarketPlace
//           </h1>
//           <p style={{ color: 'var(--gray-500)', marginTop: '8px', fontSize: '14px' }}>
//             Real-time payment tracking platform
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '6px' }}>
//               Email Address
//             </label>
//             <input
//               type="email" name="email" value={form.email}
//               onChange={handleChange} required
//               placeholder="you@example.com"
//               style={{
//                 width: '100%', padding: '10px 14px',
//                 border: '1px solid var(--gray-300)',
//                 borderRadius: 'var(--radius)', fontSize: '14px',
//                 color: 'var(--gray-800)', background: 'var(--white)',
//                 transition: 'border-color 0.2s',
//               }}
//             />
//           </div>

//           <div style={{ marginBottom: '24px' }}>
//             <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '6px' }}>
//               Password
//             </label>
//             <input
//               type="password" name="password" value={form.password}
//               onChange={handleChange} required
//               placeholder="Enter your password"
//               style={{
//                 width: '100%', padding: '10px 14px',
//                 border: '1px solid var(--gray-300)',
//                 borderRadius: 'var(--radius)', fontSize: '14px',
//                 color: 'var(--gray-800)', background: 'var(--white)',
//               }}
//             />
//           </div>

//           <button type="submit" disabled={loading} style={{
//             width: '100%', padding: '12px',
//             background: loading ? 'var(--gray-400)' : 'var(--primary)',
//             color: 'white', borderRadius: 'var(--radius)',
//             fontSize: '15px', fontWeight: '600',
//             transition: 'all 0.2s',
//           }}>
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>

//         <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--gray-500)' }}>
//           Don't have an account?{' '}
//           <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>
//             Create one
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }



// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    console.log('API URL:', process.env.REACT_APP_API_URL);
    setLoading(true);
    try {
        const response = await loginUser(form);
        console.log('Login response:', response.data);
        
        // Extract data from response
        const userData = response.data.user || { email: form.email };
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        
        // Call login with correct parameters
        login(userData, accessToken, refreshToken);
        
        toast.success('Welcome to MarketPlace!');
        navigate('/dashboard');
    } catch (err) {
        console.log('Login error:', err);
        toast.error(err.response?.data?.detail || 'Invalid email or password.');
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
            Welcome to MarketPlace
          </h1>
          <p style={{ color: 'var(--gray-500)', marginTop: '8px', fontSize: '14px' }}>
            Real-time payment tracking platform
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
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
                color: 'var(--gray-800)', background: 'var(--white)',
                transition: 'border-color 0.2s',
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
              placeholder="Enter your password"
              style={{
                width: '100%', padding: '10px 14px',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius)', fontSize: '14px',
                color: 'var(--gray-800)', background: 'var(--white)',
              }}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '12px',
            background: loading ? 'var(--gray-400)' : 'var(--primary)',
            color: 'white', borderRadius: 'var(--radius)',
            fontSize: '15px', fontWeight: '600',
            transition: 'all 0.2s',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--gray-500)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}