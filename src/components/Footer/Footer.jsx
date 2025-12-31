import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { siteContent } from '../../data/siteContent';
import { validateEmail } from '../../utils/helpers';
import styles from './Footer.module.css';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    console.log('Contact form submission:', formData);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitStatus(''), 3000);
  };

  const getSocialIcon = (icon) => {
    const icons = {
      facebook: <FaFacebookF size={18} />,
      instagram: <FaInstagram size={18} />,
      twitter: <FaTwitter size={18} />
    };
    return icons[icon] || null;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <img 
              src={siteContent.brand.logo} 
              alt={siteContent.brand.name}
              className={styles.logo}
            />
            <p className={styles.brandDescription}>
              {siteContent.footer.about}
            </p>
            
            {/* Social Links */}
            <div className={styles.social}>
              {siteContent.footer.social.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.platform}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3>Quick Links</h3>
            <ul>
              {siteContent.footer.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Form */}
          <div className={styles.contactSection}>
            <h3>{siteContent.footer.contact.title}</h3>
            <p>{siteContent.footer.contact.description}</p>
            
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                required
                aria-label="Your name"
              />
              
              <input
                type="email"
                name="email"
                placeholder="Email (optional)"
                value={formData.email}
                onChange={handleChange}
                aria-label="Your email"
              />
              
              <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={handleChange}
                aria-label="Your phone number"
              />
              
              <textarea
                name="message"
                placeholder="Your Message *"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                aria-label="Your message"
              />
              
              <button type="submit">Send Message</button>
            </form>
            
            {submitStatus === 'success' && (
              <p className={styles.successMessage}>
                ✓ Message sent successfully!
              </p>
            )}
            {submitStatus === 'error' && (
              <p className={styles.errorMessage}>
                Please fill in all required fields correctly.
              </p>
            )}
          </div>
        </div>

        {/* Payment Info */}
        <div className={styles.paymentInfo}>
          <p>💵 We accept Cash on Delivery</p>
        </div>

        {/* Copyright & Credits */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {siteContent.footer.copyright.replace('2025', currentYear)}
          </p>
          <p className={styles.credits}>
            {siteContent.footer.credits.text}{' '}
            <a 
              href={siteContent.footer.credits.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteContent.footer.credits.company}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
