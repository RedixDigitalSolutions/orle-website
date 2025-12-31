import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/helpers';
import { SHIPPING_COST } from '../../utils/constants';
import styles from './Cart.module.css';

const Cart = ({ isOpen, onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = cart.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      onCheckout();
    }
  };

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={handleOverlayClick}
        aria-hidden={!isOpen}
      />
      
      <aside 
        className={`${styles.cart} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        <div className={styles.header}>
          <h2>Shopping Cart ({cart.length})</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <span className={styles.emptyIcon}>🛒</span>
            <p>Your cart is empty</p>
            <button 
              className={styles.shopButton}
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p className={styles.itemPrice}>
                      {formatPrice(item.price)}
                    </p>
                    
                    <div className={styles.quantityControls}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.itemActions}>
                    <p className={styles.itemTotal}>
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button 
                      className={styles.removeButton}
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping:</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button 
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

Cart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired
};

export default Cart;
