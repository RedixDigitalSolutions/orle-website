import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import ProductCard from '../components/ProductCard/ProductCard';
import ProductModal from '../components/ProductModal/ProductModal';
import TrustBadges from '../components/TrustBadges/TrustBadges';
import { useCart } from '../hooks/useCart';
import { products } from '../data/products';
import { siteContent } from '../data/siteContent';
import styles from './Home.module.css';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(`.${styles.fadeIn}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [visibleProducts]);

  useEffect(() => {
    setVisibleProducts(products);
  }, []);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    
    const notification = document.createElement('div');
    notification.className = styles.notification;
    notification.textContent = `✓ Added to cart`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add(styles.show);
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove(styles.show);
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={styles.home}>
      <Hero />

      <section className={styles.productsSection} id="products">
        <div className={styles.container}>
          <div className={`${styles.sectionHeader} ${styles.fadeIn}`}>
            <h2>{siteContent.sections.trending.title}</h2>
            <p>{siteContent.sections.trending.subtitle}</p>
          </div>

          <div className={styles.productsGrid}>
            {visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className={styles.fadeIn}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProductClick(product.id)}
              >
                <ProductCard
                  product={product}
                  onQuickView={handleQuickView}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Home;
