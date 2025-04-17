'use client'
import Image from 'next/image';
import styles from '@/app/DemoSection.module.css';

const DemoSection = () => {
  return (
    <section className={styles.container}>
      {/* Left Text Content */}
      <div className={styles.textContent}>
        <h2 className={styles.title}>
          Fonctionnalités<br /> Révolutionnaires<br /> Pour Une Expérience <br /> Inégalée
        </h2>
        <div className={styles.buttonGroup}>
          <button className={styles.button}><span className={styles.buttonText}>Devenir Partenaire</span></button>
          <button className={styles.button}><span className={styles.buttonText}>Devenir Expert</span></button>
        </div>


      </div>
      {/* Center Phone Demo */}
      <div className={styles.phoneDemo}>
        <div className={styles.phoneWrapper}>
          <Image
            src="/img/iphone-frame.jpg"
            alt="App Demo"
            width={380}
            height={721}
            className={styles.phoneFrame}
          />
            <video
                className={styles.phoneVideo}
                src="/video/Demo.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            <div className={styles.Demo}>
              <p>Démo</p>
            </div>
        </div>
      </div>
      {/* Right Store Badges */}
      <div className={styles.storeSection}>
        <div className={styles.storeBadges}>
          {/* Company Logo */}
          <div className={styles.logoContainer}>
            <Image
              src="/img/logo-orange 1.png"
              alt="Company Logo"
              width={180}
              height={60}
              className={styles.logoImage}
            />
          </div>
          <div className={styles.badgesRow}>
            {/* App Stores */}
            <div className={styles.appStores}>
              <a href="#" className={styles.storeLink}>
                <Image
                  src="/img/app-store.png"
                  alt="Apple App Store"
                  width={240}
                  height={60}
                  className={styles.storeImage}
                />
              </a>
              <a href="#" className={styles.storeLink}>
                <Image
                  src="/img/google-play.png"
                  alt="Google Play Store"
                  width={240}
                  height={60}
                  className={styles.storeImage}
                />
              </a>
            </div>
            {/* QR Code */}
            <div className={styles.qrCode}>
              <Image
                src="/img/qr-code.png"
                alt="Download QR Code"
                width={160}
                height={160}
                className={styles.qrImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;