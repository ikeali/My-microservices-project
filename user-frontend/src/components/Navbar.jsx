// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav style={{
//       background: 'var(--white)',
//       borderBottom: '1px solid var(--gray-200)',
//       padding: '0 2rem',
//       height: '64px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       boxShadow: 'var(--shadow)',
//       position: 'sticky',
//       top: 0,
//       zIndex: 100,
//     }}>
      
//       {/* Logo */}
//       <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//         <div style={{
//           width: '32px',
//           height: '32px',
//           borderRadius: '8px',
//           background: 'var(--primary)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//           <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>M</span>
//         </div>
//         <span style={{ fontWeight: '700', fontSize: '20px', color: 'var(--primary)' }}>
//           Marketplace
//         </span>
//       </Link>

//       {/* Nav Links */}
//       <div style={{ display: 'flex', gap: '8px' }}>
//         {[
//           { path: '/dashboard', label: 'Dashboard' },
//           { path: '/products', label: 'Products' },
//         ].map(({ path, label }) => (
//           <Link
//             key={path}
//             to={path}
//             style={{
//               padding: '8px 16px',
//               borderRadius: 'var(--radius)',
//               fontWeight: '500',
//               fontSize: '14px',
//               color: isActive(path) ? 'var(--primary)' : 'var(--gray-600)',
//               background: isActive(path) ? 'var(--primary-light)' : 'transparent',
//               transition: 'all 0.2s',
//             }}
//           >
//             {label}
//           </Link>
//         ))}
//       </div>

//       {/* User + Logout */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//         <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
//           👋 {user ? user.email.split('@')[0] : 'User'}
//         </span>

//         <button
//           onClick={handleLogout}
//           style={{
//             padding: '8px 16px',
//             borderRadius: 'var(--radius)',
//             background: 'var(--gray-100)',
//             color: 'var(--gray-700)',
//             fontWeight: '500',
//             fontSize: '14px',
//             cursor: 'pointer'
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }



// // src/components/Navbar.jsx
// import React, { useContext } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import '../styles/Navbar.css';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   // Hide navbar on landing if needed
//   const isLandingPage = location.pathname === '/';

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         {/* Logo */}
//         <Link to="/" className="navbar-logo">
//           <span className="logo-icon">M</span>
//           Marketplace
//         </Link>

//         {/* Navigation Links */}
//         <div className="nav-menu">
//           <Link to="/" className="nav-link">
//             Home
//           </Link>

//           {user ? (
//             <>
//               <Link to="/products" className="nav-link">
//                 Products
//               </Link>
//               <Link to="/dashboard" className="nav-link">
//                 Dashboard
//               </Link>
//               <Link to="/orders" className="nav-link">
//                 Orders
//               </Link>
//               <div className="nav-user">
//                 <span className="user-name">{user.email}</span>
//                 <button onClick={handleLogout} className="btn-logout">
//                   Logout
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="nav-link btn-login">
//                 Sign In
//               </Link>
//               <Link to="/register" className="nav-link btn-register">
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Marketplace
        </Link>

        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/products" className="nav-link">Products</Link>
              <Link to="/orders" className="nav-link">Orders</Link>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;