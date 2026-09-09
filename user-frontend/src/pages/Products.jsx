// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { getProducts, createProduct } from '../services/api';
import toast from 'react-hot-toast';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      console.log('Products Response:', response.data);

      // Prevent .map() crash
      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setProducts(data);

      // Optional debugging
      if (!Array.isArray(response.data)) {
        console.error('Products API did not return an array');
        console.error(response.data);

        toast.error(
          response.data?.detail ||
          'Invalid products response from server.'
        );
      }

    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.detail ||
        'Failed to load products.'
      );

      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await createProduct(form);

      toast.success('Product created successfully!');

      setForm({
        name: '',
        description: '',
        price: '',
      });

      setShowForm(false);

      fetchProducts();

    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.detail ||
        'Failed to create product.'
      );

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--gray-50)',
      }}
    >
      {/* ❌ REMOVED: <Navbar /> */}

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '32px 24px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: 'var(--gray-800)',
              }}
            >
              Products
            </h1>

            <p
              style={{
                color: 'var(--gray-500)',
                marginTop: '4px',
              }}
            >
              Manage your products
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '10px 20px',
              background: 'var(--primary)',
              color: 'white',
              borderRadius: 'var(--radius)',
              fontWeight: '600',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {showForm ? 'Cancel' : '+ Add Product'}
          </button>
        </div>

        {/* Create Product Form */}
        {showForm && (
          <div
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--gray-200)',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '20px',
                color: 'var(--gray-800)',
              }}
            >
              Create New Product
            </h2>

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                {/* Product Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'var(--gray-700)',
                      marginBottom: '6px',
                    }}
                  >
                    Product Name
                  </label>

                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Premium Plan"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid var(--gray-300)',
                      borderRadius: 'var(--radius)',
                      fontSize: '14px',
                    }}
                  />
                </div>

                {/* Price */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'var(--gray-700)',
                      marginBottom: '6px',
                    }}
                  >
                    Price (₦)
                  </label>

                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        price: e.target.value,
                      })
                    }
                    placeholder="e.g. 5000"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid var(--gray-300)',
                      borderRadius: 'var(--radius)',
                      fontSize: '14px',
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--gray-700)',
                    marginBottom: '6px',
                  }}
                >
                  Description
                </label>

                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your product..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius)',
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '10px 24px',
                  background: 'var(--primary)',
                  color: 'white',
                  borderRadius: 'var(--radius)',
                  fontWeight: '600',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? 'Creating...' : 'Create Product'}
              </button>
            </form>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px',
              color: 'var(--gray-500)',
            }}
          >
            Loading products...
          </div>

        ) : products.length === 0 ? (

          /* Empty State */
          <div
            style={{
              textAlign: 'center',
              padding: '60px',
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--gray-200)',
            }}
          >
            <p
              style={{
                fontSize: '48px',
                marginBottom: '16px',
              }}
            >
              📦
            </p>

            <p
              style={{
                color: 'var(--gray-500)',
                fontSize: '16px',
              }}
            >
              No products yet. Create your first product!
            </p>
          </div>

        ) : (

          /* Products Grid */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  boxShadow: 'var(--shadow)',
                  border: '1px solid var(--gray-200)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--gray-800)',
                    }}
                  >
                    {product.name}
                  </h3>

                  <span
                    style={{
                      padding: '4px 10px',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '600',
                    }}
                  >
                    ₦
                    {Number(product.price || 0).toLocaleString()}
                  </span>
                </div>

                <p
                  style={{
                    color: 'var(--gray-500)',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    marginBottom: '16px',
                  }}
                >
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}