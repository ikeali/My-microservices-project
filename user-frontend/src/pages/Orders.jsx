// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { getOrders, createOrder, initiatePayment } from '../services/api';
// import { getProducts } from '../services/api';
// import toast from 'react-hot-toast';

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [payingOrderId, setPayingOrderId] = useState(null);
//   const [form, setForm] = useState({ product_id: '', quantity: 1 });
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const productId = params.get('product');
//     if (productId) setForm((f) => ({ ...f, product_id: productId }));
//     fetchOrders();
//     fetchProducts();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await getOrders();
//       setOrders(response.data);
//     } catch (err) {
//       toast.error('Failed to load orders.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await getProducts();
//       setProducts(response.data);
//     } catch (err) {}
//   };

//   const handleCreateOrder = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await createOrder(form);
//       toast.success('Order created successfully!');
//       setForm({ product_id: '', quantity: 1 });
//       fetchOrders();
//     } catch (err) {
//       toast.error('Failed to create order.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handlePayment = async (orderId) => {
//     setPayingOrderId(orderId);
//     try {
//       const response = await initiatePayment(orderId);
//       toast.success('Redirecting to payment...');
//       window.open(response.data.authorization_url, '_blank');
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Payment initiation failed.');
//     } finally {
//       setPayingOrderId(null);
//     }
//   };

//   const statusColor = (status) => {
//     const colors = {
//       pending: { bg: '#fffff0', color: '#744210', border: '#f6e05e' },
//       paid: { bg: '#f0fff4', color: '#276749', border: '#9ae6b4' },
//       failed: { bg: '#fff5f5', color: '#c53030', border: '#feb2b2' },
//       cancelled: { bg: '#f7fafc', color: '#4a5568', border: '#cbd5e0' },
//     };
//     return colors[status] || colors.pending;
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: 'var(--gray-50)' }}>
//       <Navbar />
//       <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

//         {/* Header */}
//         <div style={{ marginBottom: '32px' }}>
//           <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--gray-800)' }}>Orders</h1>
//           <p style={{ color: 'var(--gray-500)', marginTop: '4px' }}>Create and manage your orders</p>
//         </div>

//         {/* Create Order Form */}
//         <div style={{
//           background: 'var(--white)', borderRadius: 'var(--radius-lg)',
//           padding: '24px', marginBottom: '32px',
//           boxShadow: 'var(--shadow-md)', border: '1px solid var(--gray-200)',
//         }}>
//           <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: 'var(--gray-800)' }}>
//             Create New Order
//           </h2>
//           <form onSubmit={handleCreateOrder}>
//             <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
//               <div>
//                 <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '6px' }}>
//                   Select Product
//                 </label>
//                 <select
//                   value={form.product_id} required
//                   onChange={(e) => setForm({ ...form, product_id: e.target.value })}
//                   style={{
//                     width: '100%', padding: '10px 14px',
//                     border: '1px solid var(--gray-300)',
//                     borderRadius: 'var(--radius)', fontSize: '14px',
//                     color: 'var(--gray-800)', background: 'var(--white)',
//                   }}
//                 >
//                   <option value="">Choose a product...</option>
//                   {products.map((p) => (
//                     <option key={p.id} value={p.id}>
//                       {p.name} — ₦{Number(p.price).toLocaleString()}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '6px' }}>
//                   Quantity
//                 </label>
//                 <input
//                   type="number" min="1" value={form.quantity} required
//                   onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
//                   style={{
//                     width: '100%', padding: '10px 14px',
//                     border: '1px solid var(--gray-300)',
//                     borderRadius: 'var(--radius)', fontSize: '14px',
//                   }}
//                 />
//               </div>
//             </div>
//             <button type="submit" disabled={submitting} style={{
//               padding: '10px 24px', background: 'var(--primary)',
//               color: 'white', borderRadius: 'var(--radius)',
//               fontWeight: '600', fontSize: '14px',
//             }}>
//               {submitting ? 'Creating...' : 'Create Order'}
//             </button>
//           </form>
//         </div>

//         {/* Orders List */}
//         <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--gray-800)', marginBottom: '16px' }}>
//           Your Orders
//         </h2>

//         {loading ? (
//           <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gray-500)' }}>
//             Loading orders...
//           </div>
//         ) : orders.length === 0 ? (
//           <div style={{
//             textAlign: 'center', padding: '60px',
//             background: 'var(--white)', borderRadius: 'var(--radius-lg)',
//             border: '1px solid var(--gray-200)',
//           }}>
//             <p style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</p>
//             <p style={{ color: 'var(--gray-500)', fontSize: '16px' }}>No orders yet. Create your first order!</p>
//           </div>
//         ) : (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//             {orders.map((order) => {
//               const sc = statusColor(order.status);
//               return (
//                 <div key={order.id} style={{
//                   background: 'var(--white)', borderRadius: 'var(--radius-lg)',
//                   padding: '20px 24px', boxShadow: 'var(--shadow)',
//                   border: '1px solid var(--gray-200)',
//                   display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                     <div style={{
//                       width: '44px', height: '44px', borderRadius: 'var(--radius)',
//                       background: 'var(--primary-light)', display: 'flex',
//                       alignItems: 'center', justifyContent: 'center',
//                       fontSize: '20px',
//                     }}>🛍️</div>
//                     <div>
//                       <p style={{ fontWeight: '600', color: 'var(--gray-800)', fontSize: '15px' }}>
//                         {order.product?.name}
//                       </p>
//                       <p style={{ color: 'var(--gray-500)', fontSize: '13px', marginTop: '2px' }}>
//                         Qty: {order.quantity} · Order #{order.id}
//                       </p>
//                     </div>
//                   </div>

//                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                     <p style={{ fontWeight: '700', fontSize: '16px', color: 'var(--gray-800)' }}>
//                       ₦{Number(order.total_price).toLocaleString()}
//                     </p>
//                     <span style={{
//                       padding: '4px 12px', borderRadius: '20px', fontSize: '13px',
//                       fontWeight: '600', background: sc.bg, color: sc.color,
//                       border: `1px solid ${sc.border}`,
//                     }}>
//                       {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                     </span>
//                     {order.status === 'pending' && (
//                       <button
//                         onClick={() => handlePayment(order.id)}
//                         disabled={payingOrderId === order.id}
//                         style={{
//                           padding: '8px 16px', background: 'var(--primary)',
//                           color: 'white', borderRadius: 'var(--radius)',
//                           fontWeight: '600', fontSize: '13px',
//                         }}
//                       >
//                         {payingOrderId === order.id ? 'Processing...' : 'Pay Now'}
//                       </button>
//                     )}
//                     {order.status === 'paid' && (
//                       <span style={{ fontSize: '20px' }}>✅</span>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }