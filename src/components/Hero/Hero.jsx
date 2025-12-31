import React, { useRef, useEffect } from 'react';
import { siteContent } from '../../data/siteContent';
import { scrollToSection } from '../../utils/helpers';
import styles from './Hero.module.css';

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Ensure video is muted and plays automatically
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  const handleCTAClick = () => {
    scrollToSection('products');
  };

  return (
    <section className={styles.hero} id="home" aria-label="Hero section">
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={siteContent.hero.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.heading}>
          {siteContent.hero.heading}
        </h1>
        {siteContent.hero.subheading && (
          <p className={styles.subheading}>
            {siteContent.hero.subheading}
          </p>
        )}
        <button 
          className={styles.cta}
          onClick={handleCTAClick}
          aria-label="Shop now"
        >
          {siteContent.hero.cta}
        </button>
      </div>
    </section>
  );
};

export default Hero;
