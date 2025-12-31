import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatPrice, calculateDiscount } from '../../utils/helpers';
import styles from './ProductModal.module.css';

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setIsVisible(false), 300);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!product || !isVisible) return null;

  const discount = calculateDiscount(product.price, product.salePrice);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalContent}>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className={styles.modalGrid}>
          {/* Image Gallery */}
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <img 
                src={product.images[selectedImage]} 
                alt={`${product.name} - view ${selectedImage + 1}`}
              />
              {discount > 0 && (
                <span className={styles.badge}>-{discount}%</span>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className={styles.thumbnails}>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={image} alt={`${product.name} thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className={styles.detailsSection}>
            {product.tagline && (
              <p className={styles.tagline}>{product.tagline}</p>
            )}
            
            <h2 id="modal-title" className={styles.productName}>
              {product.name}
            </h2>

            <div className={styles.pricing}>
              {product.salePrice ? (
                <>
                  <span className={styles.originalPrice}>
                    {formatPrice(product.price)}
                  </span>
                  <span className={styles.salePrice}>
                    {formatPrice(product.salePrice)}
                  </span>
                </>
              ) : (
                <span className={styles.price}>
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <div className={styles.description}>
              <p>{product.fullDescription}</p>
            </div>

            {product.result && (
              <div className={styles.result}>
                <h3>Result</h3>
                <p>{product.result}</p>
              </div>
            )}

            {product.benefits && product.benefits.length > 0 && (
              <div className={styles.benefits}>
                <h3>Key Benefits</h3>
                <ul>
                  {product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.ingredients && product.ingredients.length > 0 && (
              <div className={styles.ingredients}>
                <h3>Key Ingredients</h3>
                <ul>
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      <strong>{ingredient.name}:</strong> {ingredient.benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.howToUse && (
              <div className={styles.usage}>
                <h3>How to Use</h3>
                <p>{product.howToUse}</p>
              </div>
            )}

            {product.packContents && (
              <div className={styles.packContents}>
                <h3>What's Inside</h3>
                <ul>
                  {product.packContents.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className={styles.actions}>
              <div className={styles.quantitySelector}>
                <label htmlFor="quantity">Quantity:</label>
                <div className={styles.quantityControls}>
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input 
                    id="quantity"
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    aria-label="Product quantity"
                  />
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                className={styles.addToCartButton}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    salePrice: PropTypes.number,
    tagline: PropTypes.string,
    shortDescription: PropTypes.string,
    fullDescription: PropTypes.string,
    result: PropTypes.string,
    benefits: PropTypes.arrayOf(PropTypes.string),
    ingredients: PropTypes.arrayOf(PropTypes.object),
    howToUse: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    packContents: PropTypes.arrayOf(PropTypes.string)
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default ProductModal;
