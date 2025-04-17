'use client';
import Image from 'next/image';
import styles from '@/app/Packages.module.css';
const Packages = () => {
  const packages = [
    {
      image: '/img/pack1.png',
      title: (
        <>
          Pack Visiteur
          <br /> Démi Journée
        </>
      ),
      altText: "Pack Visiteur Journée Complète", // Add string alternative
      rating: 3,
      price: 300
    },
    {
      image: '/img/pack2.png',
      title: (
        <>
          Pack Visiteur
          <br />Journée Compléte
        </>
      ),
      altText: "Pack Visiteur Journée Complète", // Add string alternative
      rating: 4.2,
      price: 60
    },
    {
      image: '/img/pack3.png',
      title: (
        <>
          Pack team building
          <br /> l’ére du numérique
        </>
      ),
      altText: "Pack Visiteur Journée Complète", // Add string alternative
      rating: 4.2,
      price: 120
    },
    {
      image: '/img/pack4.png',
      title: (
        <>
          PACK GUIDE
          <br /> DEMI JOURNée
        </>
      ),
      altText: "Pack Visiteur Journée Complète", // Add string alternative
      rating: 4.2,
      price: 55
    },
    {
      image: '/img/pack5.png',
      title: (
        <>
          Pack vélo
          <br /> journée complète
        </>
      ),
      altText: "Pack Visiteur Journée Complète", // Add string alternative
      rating: 4.2,
      price: 80
    },
    {
      image: '/img/pack6.png',
      title: (
        <>
          PACK VACANCES
          <br /> JOURNEE COMPLèTE
        </>
      ),
      altText: "Pack Visiteur Journée Complète", // Add string alternative
      rating: 4.2,
      price: 150
    },
  ];


  return (
    <section className={styles.packagesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h6 className={styles.subtitle}>Packages</h6>
          <h1 className={styles.title}>Nos Packs De Services</h1>
        </div>

        <div className={styles.packagesContainer}>
          <div className={styles.packagesGrid}>
            {packages.map((pkg, index) => (
              <div key={index} className={styles.packageCard}>
                <div className={styles.imageContainer}>
                  <Image
                    src={pkg.image}
                    alt={pkg.altText}
                    fill
                    className={styles.image}
                    priority={index < 3} // Prioritize first 3 images
                  />
                </div>

                <div className={styles.packageContent}>
                  <div className={styles.packageHeader}>
                    <h3 className={styles.packageTitle}>{pkg.title}</h3>
                    <span className={styles.price}>{pkg.price}DT</span>
                  </div>

                  <div className={styles.packageFooter}>
                    <div className={styles.ratingContainer}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M6.50098 0L7.96032 4.49139H12.6828L8.86224 7.26722L10.3216 11.7586L6.50098 8.98278L2.68037 11.7586L4.13971 7.26722L0.319109 4.49139H5.04164L6.50098 0Z" fill="#FA7921" />
                      </svg><svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M6.50098 0L7.96032 4.49139H12.6828L8.86224 7.26722L10.3216 11.7586L6.50098 8.98278L2.68037 11.7586L4.13971 7.26722L0.319109 4.49139H5.04164L6.50098 0Z" fill="#FA7921" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M6.50098 0L7.96032 4.49139H12.6828L8.86224 7.26722L10.3216 11.7586L6.50098 8.98278L2.68037 11.7586L4.13971 7.26722L0.319109 4.49139H5.04164L6.50098 0Z" fill="#FA7921" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M6.50098 0L7.96032 4.49139H12.6828L8.86224 7.26722L10.3216 11.7586L6.50098 8.98278L2.68037 11.7586L4.13971 7.26722L0.319109 4.49139H5.04164L6.50098 0Z" fill="#FA7921" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M6.50195 0L7.96129 4.49139H12.6838L8.86322 7.26722L10.3226 11.7586L6.50195 8.98278L2.68135 11.7586L4.14069 7.26722L0.320086 4.49139H5.04261L6.50195 0Z" fill="#D9D9D9" />
                      </svg>
                    </div>
                    <div className={styles.priceContainer}>
                      <span className={styles.priceLabel}></span>
                      {/* <span className={styles.price}>{pkg.price}DT</span> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.viewMoreContainer}>
            <button className={styles.viewMoreButton}>
              Voir Plus
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <g filter="url(#filter0_d_684_775)">
                  <circle cx="13" cy="13" r="11" transform="rotate(-180 13 13)" fill="#FA7921" />
                </g>
                <path d="M5.44987 13.9074L17.7333 13.9074L12.3668 18.5866C11.938 18.9605 11.938 19.5742 12.3668 19.9481C12.4686 20.037 12.5894 20.1075 12.7224 20.1556C12.8555 20.2037 12.9981 20.2285 13.1421 20.2285C13.2861 20.2285 13.4287 20.2037 13.5618 20.1556C13.6948 20.1075 13.8156 20.037 13.9174 19.9481L21.1642 13.6293C21.2662 13.5406 21.3471 13.4353 21.4023 13.3193C21.4574 13.2033 21.4858 13.0789 21.4858 12.9533C21.4858 12.8278 21.4574 12.7034 21.4023 12.5874C21.3471 12.4714 21.2662 12.3661 21.1642 12.2774L13.9174 5.95859C13.8156 5.86981 13.6947 5.7994 13.5617 5.75136C13.4287 5.70331 13.2861 5.67859 13.1421 5.67859C12.9981 5.67859 12.8556 5.70331 12.7225 5.75136C12.5895 5.7994 12.4686 5.86981 12.3668 5.95859C12.265 6.04736 12.1843 6.15275 12.1292 6.26873C12.0741 6.38472 12.0457 6.50903 12.0457 6.63457C12.0457 6.76011 12.0741 6.88443 12.1292 7.00041C12.1843 7.1164 12.265 7.22178 12.3668 7.31056L17.7333 11.9897L5.44987 11.9897C4.84505 11.9897 4.35019 12.4212 4.35019 12.9486C4.35019 13.4759 4.84505 13.9074 5.44987 13.9074Z" fill="white" />
                <defs>
                  <filter id="filter0_d_684_775" x="0" y="0" width="30" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="2" dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.694118 0 0 0 0 0.694118 0 0 0 0 0.694118 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_684_775" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_684_775" result="shape" />
                  </filter>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;