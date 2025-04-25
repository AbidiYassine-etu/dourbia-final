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
      price: 0
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
      price: 0
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
      price: 0
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
      price: 0
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
      price: 0
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
      price: 0
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
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
              <path d="M1.09977 8.67888L13.3832 8.67888L8.01674 13.358C7.58786 13.732 7.58786 14.3456 8.01674 14.7196C8.11847 14.8085 8.23931 14.879 8.37234 14.9271C8.50538 14.9752 8.64799 15 8.79201 15C8.93603 15 9.07864 14.9752 9.21167 14.9271C9.3447 14.879 9.46554 14.8085 9.56728 14.7196L16.8141 8.40082C16.9161 8.31211 16.997 8.20674 17.0522 8.09075C17.1073 7.97475 17.1357 7.85041 17.1357 7.72483C17.1357 7.59925 17.1073 7.47491 17.0522 7.35891C16.997 7.24292 16.9161 7.13755 16.8141 7.04885L9.56728 0.73007C9.46547 0.641298 9.3446 0.570882 9.21158 0.52284C9.07856 0.474796 8.93599 0.450069 8.79201 0.450069C8.64803 0.450069 8.50546 0.474796 8.37243 0.52284C8.23941 0.570882 8.11855 0.641298 8.01674 0.73007C7.91493 0.818841 7.83417 0.92423 7.77907 1.04022C7.72397 1.1562 7.69561 1.28051 7.69561 1.40606C7.69561 1.5316 7.72397 1.65591 7.77907 1.7719C7.83417 1.88788 7.91493 1.99327 8.01674 2.08204L13.3832 6.76119L1.09977 6.76119C0.494949 6.76119 9.53674e-05 7.19267 9.53674e-05 7.72004C9.53674e-05 8.2474 0.494949 8.67888 1.09977 8.67888Z" fill="white"/>
            </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;