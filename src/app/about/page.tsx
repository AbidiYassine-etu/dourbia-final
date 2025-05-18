import styles from '@/app/about/About.module.css';

export default function APropos() {
  return (
    <div className={styles.container}>
      {/* First Section - Images and Text */}
      <div className={styles.section}>
        <div className={styles.imageContainer}>
          <img 
            src="/img/logo-orange 1.png" 
            alt="Image 1"
            width={252.27} 
            height={252.24}
            className={styles.image}
          />
          <img 
            src="/img/logo1.png" 
            alt="Image 2" 
            width={200} 
            height={100}
            className={styles.image}
          />
        </div>
        
        <div className={styles.textContent}>
          <p className={styles.description}>
            La Solution Innovante pour une exploration culturelle personnalisée
          </p>
        </div>
      </div>

      {/* Second Section - Text and Video */}
      <div className={styles.section}>
        <div className={styles.textContent}>
          <h3 className={styles.subtitle}>dourbia</h3>
          <h2 className={styles.title}>vivez l’innovation culturelle</h2>
          <p className={styles.description2}>
          Dourbia est un guide touristique numérique contenant des circuits standards et des circuits personnalisés (grâce à l'intelligence artificielle) avec du contenu numérique qui permettent de découvrir la culture et l’histoire du patrimoine. Ce guide favorise également la découverte des activités locales (location de vélos, ateliers artistiques, boutiques pour des articles souvenirs,  expériences de réalité augmentée/réalité virtuelle, hébergement, restauration, etc.)
          </p>
        </div>

        <div className={styles.videoContainer}>
          <iframe
            className={styles.video}
            src="/video/ines.mp4"
            title="Video presentation"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {/* Card 1 */}
        <div className={styles.card}>
          <div className={styles.cardImageContainer}>
            <img 
              src="/img/card1.png"
              alt="Card 1" 
              className={styles.cardImage}
            />
          </div>
          <h3 className={styles.cardTitle}>notre</h3>
          <h4 className={styles.cardSubtitle}>mission</h4>
          <p className={styles.cardText}>
          Faciliter l’accès à la culture et aux services locaux liés au patrimoine grâce aux outils numériques.
          </p>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <div className={styles.cardImageContainer}>
            <img 
              src="/img/card2.png" 
              alt="Card 2" 
              className={styles.cardImage}
            />
          </div>
          <h3 className={styles.cardTitle}>notre</h3>
          <h4 className={styles.cardSubtitle}>vision</h4>
          <p className={styles.cardText}>
          Réinventer le tourisme culturel en proposant des expériences de visite immersives et innovantes
          </p>
        </div>
      </div>
      <div className={styles.highlightSection}>
        <h2 className={styles.highlightTitle}>ODDs DE DOURBIA</h2>
      </div>
      {/* Features Section */}
      <div className={styles.featuresContainer}>
        <div className={styles.featureBox}>
          <img 
            src="/img/about-1.jpg" 
            alt="Feature 1" 
            className={styles.featureImage}
          />
          <div className={styles.featureContent}>
            <p className={styles.featureText}>éducation culturelle de qualité accessible à tous.</p>
          </div>
        </div>

        <div className={styles.featureBox}>
          <img 
            src="/img/card-2.png" 
            alt="Feature 2" 
            className={styles.featureImage}
          />
          <div className={styles.featureContent}>
            <p className={styles.featureText}>opportunités d'emploi dans le secteur du tourisme, des industries culturelles et creativives.</p>
          </div>
        </div>

        <div className={styles.featureBox}>
          <img 
            src="/img/card-3.png" 
            alt="Feature 3" 
            className={styles.featureImage}
          />
          <div className={styles.featureContent}>
            <p className={styles.featureText}>utiliser des technologies innovantes pour promou-voir le tourisme culturel.</p>
          </div>
        </div>

        <div className={styles.featureBox}>
          <img 
            src="/img/card-4.png" 
            alt="Feature 4" 
            className={styles.featureImage}
          />
          <div className={styles.featureContent}>
            <p className={styles.featureText}>intégrer le tourisme culturel digital pour valoriser le patrimoine des villes.</p>
          </div>
        </div>
      </div>
      <div className={styles.highlightSection}>
        <h2 className={styles.highlightTitle1}>L’équipe</h2>
      </div>
    </div>
  );
}