import styles from '@/app/Feature.module.css';
import Image from 'next/image';

const Features = () => {
  const features = [
    {
      title: 'Guide numérique',
      text: 'Profitez de nos circuits culturels avec une navigation fluide géolocalisée tout en accédant à des contenus multimédias historiques.',
      icon: '/img/feature-1.png'
    },
    {
      title: 'Packs De Services Diversifiés ', 
      text: 'Location de vélo, Expériences VR/AR, Ateliers numériques et artistiques pour enrichir la visite et relier le monument à son écosystème.',
      icon: '/img/feature-2.png'
    },
    {
      title: 'Circuits De Visite Personnalisés',
      text: 'Explorez les sites historiques et culturels à votre rythme et selon vos préférences (Durée, Budget, époque, ...) grâce à des itinéraires sur mesure.',
      icon: '/img/feature-3.png'
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <div className={styles.featureContent}>
                <div className={styles.iconContainer}>
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={80}  // Set appropriate size
                    height={80}
                    className={styles.featureIcon}
                  />
                </div>
                <div className={styles.textContainer}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureText}>{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;