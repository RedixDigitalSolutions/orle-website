import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { getProductById, getRelatedProducts } from '../data/products';
import { formatPrice, calculateDiscount } from '../utils/helpers';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
      setRelatedProducts(getRelatedProducts(id));
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!product) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const discount = calculateDiscount(product.price, product.salePrice);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    
    const notification = document.createElement('div');
    notification.className = styles.notification;
    notification.textContent = `✓ Added ${quantity} item(s) to cart`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add(styles.show), 10);
    setTimeout(() => {
      notification.classList.remove(styles.show);
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.container}>
        {/* Back Button */}
        <button 
          className={styles.backButton}
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <FiArrowLeft size={20} />
          <span>Back to Products</span>
        </button>

        {/* Product Main Section */}
        <div className={styles.productMain}>
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

          {/* Product Info */}
          <div className={styles.productInfo}>
            {product.tagline && (
              <p className={styles.tagline}>{product.tagline}</p>
            )}
            
            <h1 className={styles.productName}>{product.name}</h1>

            <div className={styles.pricing}>
              {product.salePrice ? (
                <>
                  <span className={styles.originalPrice}>
                    {formatPrice(product.price)}
                  </span>
                  <span className={styles.salePrice}>
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className={styles.savings}>
                    Save {formatPrice(product.price - product.salePrice)}
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
                <h2>Result</h2>
                <p>{product.result}</p>
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
                <FiShoppingCart size={20} />
                Add to Cart
              </button>
            </div>

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div className={styles.benefits}>
                <h2>Key Benefits</h2>
                <ul>
                  {product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className={styles.ingredients}>
                <h2>Key Ingredients</h2>
                <ul>
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      <strong>{ingredient.name}:</strong> {ingredient.benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How to Use */}
            {product.howToUse && (
              <div className={styles.usage}>
                <h2>How to Use</h2>
                <p>{product.howToUse}</p>
              </div>
            )}

            {/* Pack Contents */}
            {product.packContents && (
              <div className={styles.packContents}>
                <h2>What's Inside</h2>
                <ul>
                  {product.packContents.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <h2>You May Also Like</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((relatedProduct) => (
                <div 
                  key={relatedProduct.id}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <ProductCard
                    product={relatedProduct}
                    onQuickView={() => {}}
                    onAddToCart={(prod, qty) => addToCart(prod, qty)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
