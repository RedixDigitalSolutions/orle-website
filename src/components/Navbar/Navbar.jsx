import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { useTheme } from '../../hooks/useTheme';
import { siteContent } from '../../data/siteContent';
import { navigation } from '../../data/navigation';
import { scrollToSection } from '../../utils/helpers';
import styles from './Navbar.module.css';

const Navbar = ({ onCartOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const cartCount = getCartCount();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.replace('#', '');
      scrollToSection(sectionId);
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search for:', searchQuery);
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/" aria-label="ORLE Home">
            <img src={siteContent.brand.logo} alt={siteContent.brand.name} />
          </Link>
        </div>

        {/* Desktop Search */}
        <form className={styles.searchBar} onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" aria-label="Submit search">
            <FiSearch size={20} />
          </button>
        </form>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          {navigation.main.map((item) => (
            <li key={item.id}>
              {item.href.startsWith('#') ? (
                <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                  {item.label}
                </a>
              ) : (
                <Link to={item.href}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className={styles.actions}>
          {/* Theme Toggle */}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Cart Button */}
          <button
            className={styles.cartButton}
            onClick={onCartOpen}
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <form className={styles.mobileSearch} onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch size={20} />
          </form>
          <ul>
            {navigation.mobile.map((item) => (
              <li key={item.id}>
                {item.href.startsWith('#') ? (
                  <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
