import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice, calculateDiscount } from '../../utils/helpers';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onQuickView, onAddToCart }) => {
  const discount = calculateDiscount(product.price, product.salePrice);

  const handleImageError = (e) => {
    e.target.src = '/orle-logo.png';
  };

  return (
    <article className={styles.card} aria-label={product.name}>
      <div className={styles.imageContainer}>
        <img
          src={product.images[0]}
          alt={product.name}
          className={styles.image}
          loading="lazy"
          onError={handleImageError}
        />
        {discount > 0 && (
          <span className={styles.badge} aria-label={`${discount}% discount`}>
            -{discount}%
          </span>
        )}
        <div className={styles.overlay}>
          <button
            className={styles.quickView}
            onClick={() => onQuickView(product)}
            aria-label={`Quick view ${product.name}`}
          >
            Quick View
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {product.tagline && (
          <p className={styles.tagline}>{product.tagline}</p>
        )}
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.shortDescription}</p>
        
        <div className={styles.footer}>
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
          
          <button
            className={styles.addToCart}
            onClick={() => onAddToCart(product, 1)}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    salePrice: PropTypes.number,
    shortDescription: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onQuickView: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default React.memo(ProductCard);
