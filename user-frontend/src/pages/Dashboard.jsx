// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { getProducts, getUsers } from '../services/api';
// // import { getProducts } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import '../styles/Dashboard.css';



// import toast from 'react-hot-toast';

// export default function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [productsRes, usersRes] = await Promise.all([
//         getProducts(),
//         getUsers()
//       ]);

//       setProducts(productsRes.data);
//       setUsers(usersRes.data);
//     } catch (err) {
//       toast.error('Failed to load dashboard data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: 'var(--gray-50)' }}>
//       <Navbar />

//       <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

//         {/* Welcome */}
//         <div style={{ marginBottom: '32px' }}>
//           <h1 style={{ fontSize: '28px', fontWeight: '700' }}>
//             Welcome back, {user?.email || 'User'} 👋
//           </h1>
//           <p style={{ color: 'var(--gray-500)' }}>
//             Overview of your system
//           </p>
//         </div>

//         {/* Stats */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: '20px',
//           marginBottom: '32px'
//         }}>
//           <StatCard label="Total Users" value={users.length} icon="👥" />
//           <StatCard label="Total Products" value={products.length} icon="📦" />
//           <StatCard label="Your Role" value={user?.role || 'user'} icon="🔐" />
//         </div>

//         {/* Recent Products */}
//         <div style={{
//           background: 'white',
//           padding: '24px',
//           borderRadius: '12px'
//         }}>
//           <h2>Recent Products</h2>

//           {loading ? (
//             <p>Loading...</p>
//           ) : products.length === 0 ? (
//             <p>No products yet</p>
//           ) : (
//             products.slice(0, 5).map(p => (
//               <div key={p.id} style={{ padding: '10px 0' }}>
//                 <strong>{p.name}</strong> - ₦{p.price}
//               </div>
//             ))
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// function StatCard({ label, value, icon }) {
//   return (
//     <div style={{
//       background: 'white',
//       padding: '20px',
//       borderRadius: '12px'
//     }}>
//       <div>{icon}</div>
//       <h2>{value}</h2>
//       <p>{label}</p>
//     </div>
//   );
// }

// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getUsers } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, usersRes] = await Promise.all([
        getProducts(),
        getUsers()
      ]);

      setProducts(productsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      toast.error('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray-50)' }}>
      {/* ❌ REMOVED: <Navbar /> */}

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Welcome */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700' }}>
            Welcome back, {user?.email || 'User'} 👋
          </h1>
          <p style={{ color: 'var(--gray-500)' }}>
            Overview of your system
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <StatCard label="Total Users" value={users.length} icon="👥" />
          <StatCard label="Total Products" value={products.length} icon="📦" />
          <StatCard label="Your Role" value={user?.role || 'user'} icon="🔐" />
        </div>

        {/* Recent Products */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px'
        }}>
          <h2>Recent Products</h2>

          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>No products yet</p>
          ) : (
            products.slice(0, 5).map(p => (
              <div key={p.id} style={{ padding: '10px 0' }}>
                <strong>{p.name}</strong> - ₦{p.price}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '12px'
    }}>
      <div>{icon}</div>
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );
}