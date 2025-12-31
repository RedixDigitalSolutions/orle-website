import React from 'react';
import { FiShield, FiTruck, FiCheckCircle, FiHeadphones } from 'react-icons/fi';
import { siteContent } from '../../data/siteContent';
import styles from './TrustBadges.module.css';

const TrustBadges = () => {
  const getIcon = (iconName) => {
    const icons = {
      shield: <FiShield size={48} />,
      truck: <FiTruck size={48} />,
      check: <FiCheckCircle size={48} />,
      support: <FiHeadphones size={48} />
    };
    return icons[iconName] || <FiCheckCircle size={48} />;
  };

  return (
    <section className={styles.trustSection} aria-label="Trust badges">
      <div className={styles.container}>
        <h2 className={styles.title}>{siteContent.sections.trust.title}</h2>
        
        <div className={styles.badges}>
          {siteContent.trustBadges.map((badge) => (
            <div key={badge.id} className={styles.badge}>
              <div className={styles.icon} aria-hidden="true">
                {getIcon(badge.icon)}
              </div>
              <h3 className={styles.badgeTitle}>{badge.title}</h3>
              <p className={styles.badgeDescription}>{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
