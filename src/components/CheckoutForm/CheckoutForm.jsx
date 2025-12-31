import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../hooks/useCart';
import { formatPrice, validateEmail, validatePhone } from '../../utils/helpers';
import { SHIPPING_COST, FORM_VALIDATION } from '../../utils/constants';
import styles from './CheckoutForm.module.css';

const CheckoutForm = ({ isOpen, onClose }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = getCartTotal();
  const shipping = SHIPPING_COST;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = FORM_VALIDATION.required;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = FORM_VALIDATION.required;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = FORM_VALIDATION.phone;
    }

    if (!formData.city.trim()) {
      newErrors.city = FORM_VALIDATION.required;
    }

    if (!formData.address.trim()) {
      newErrors.address = FORM_VALIDATION.required;
    }

    if (!formData.email.trim()) {
      newErrors.email = FORM_VALIDATION.required;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = FORM_VALIDATION.email;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);

  // Format cart items to readable string
  const cartItemsFormatted = cart.map(item => 
    `${item.name} (x${item.quantity})`
  ).join(', ');

  try {
    await fetch(process.env.REACT_APP_GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        email: formData.email,
        cartItems: cartItemsFormatted,  // Now it's readable: "product-1 (x2), product-2 (x1)"
        subtotal: subtotal,
        shipping: shipping,
        total: total
      })
    });
    
    console.log('Order submitted:', {
      customer: formData,
      items: cart,
      subtotal,
      shipping,
      total
    });

    setIsSuccess(true);
    clearCart();

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setFormData({
        name: '',
        phone: '',
        city: '',
        address: '',
        email: ''
      });
    }, 3000);
  } catch (error) {
    console.error('Order submission failed:', error);
    alert('Failed to submit order. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};


  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div className={styles.modal}>
        {!isSuccess ? (
          <>
            <div className={styles.header}>
              <h2 id="checkout-title">Checkout</h2>
              <button 
                className={styles.closeButton}
                onClick={onClose}
                disabled={isSubmitting}
                aria-label="Close checkout"
              >
                ✕
              </button>
            </div>

            <div className={styles.content}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formSection}>
                  <h3>Customer Information</h3>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="name">
                      Full Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? styles.error : ''}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <span id="name-error" className={styles.errorMessage}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">
                      Phone Number <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? styles.error : ''}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <span id="phone-error" className={styles.errorMessage}>
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">
                      Email Address <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? styles.error : ''}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className={styles.errorMessage}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="city">
                      City <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? styles.error : ''}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? 'city-error' : undefined}
                    />
                    {errors.city && (
                      <span id="city-error" className={styles.errorMessage}>
                        {errors.city}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="address">
                      Delivery Address <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className={errors.address ? styles.error : ''}
                      aria-invalid={!!errors.address}
                      aria-describedby={errors.address ? 'address-error' : undefined}
                    />
                    {errors.address && (
                      <span id="address-error" className={styles.errorMessage}>
                        {errors.address}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.orderSummary}>
                  <h3>Order Summary</h3>
                  
                  <div className={styles.orderItems}>
                    {cart.map((item) => (
                      <div key={item.id} className={styles.orderItem}>
                        <div className={styles.itemInfo}>
                          <span className={styles.itemName}>{item.name}</span>
                          <span className={styles.itemQty}>×{item.quantity}</span>
                        </div>
                        <span className={styles.itemPrice}>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.summaryTotals}>
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
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your order. We'll contact you shortly to confirm delivery details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

CheckoutForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CheckoutForm;
