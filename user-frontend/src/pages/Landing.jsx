// src/pages/Landing.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Fetch featured products from your Product Service
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products?limit=6`);
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Marketplace</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Add hero image here */}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p className="price">₦{product.price.toLocaleString()}</p>
              <Link to={`/products/${product.id}`} className="btn btn-small">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">📱</div>
            <h3>Electronics</h3>
          </div>
          <div className="category-card">
            <div className="category-icon">👕</div>
            <h3>Fashion</h3>
          </div>
          <div className="category-card">
            <div className="category-icon">🏠</div>
            <h3>Home & Garden</h3>
          </div>
          <div className="category-card">
            <div className="category-icon">⚽</div>
            <h3>Sports</h3>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Create an account and start shopping today</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Create Account
        </Link>
      </section>
    </div>
  );
};

export default Landing;