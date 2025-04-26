// app/profile/sections/aide/page.tsx
'use client';
import styles from '@/app/profile/sections/aide.module.css';

export default function AidePage() {
  return (
    <div className={styles.aideContainer}>
      {/* Title */}
      <h1 className={styles.aideTitle}>aide ?</h1>
      
      {/* Sub Title */}
      <h2 className={styles.aideSubtitle}>Trouvez votre réponse maintenant</h2>
      
      {/* Contact Form */}
      <div className={styles.contactForm}>
        <input 
          type="email"
          placeholder="Posez votre question.."
          className={styles.emailInput}
        />
        <button className={styles.submitButton}>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="25" 
            height="22" 
            viewBox="0 0 25 22" 
            fill="none"
            className={styles.sendIcon}
        >
            <path 
            d="M1.75 21.1035L23.5625 11.7535C23.788 11.6575 23.9803 11.4972 24.1154 11.2928C24.2505 11.0883 24.3226 10.8486 24.3226 10.6035C24.3226 10.3584 24.2505 10.1187 24.1154 9.91427C23.9803 9.7098 23.788 9.54957 23.5625 9.45352L1.75 0.103517C1.56113 0.0211348 1.35471 -0.0129298 1.14939 0.00439557C0.944057 0.0217209 0.746272 0.089891 0.573873 0.202757C0.401474 0.315622 0.259886 0.469632 0.161881 0.650892C0.0638762 0.832151 0.0125387 1.03496 0.0125 1.24102L0 7.00352C0 7.62852 0.4625 8.16602 1.0875 8.24102L18.75 10.6035L1.0875 12.9535C0.4625 13.041 0 13.5785 0 14.2035L0.0125 19.966C0.0125 20.8535 0.925 21.466 1.75 21.1035Z" 
            fill="#FFF"
            />
        </svg>
        </button>
      </div>
      
      {/* Demo Title */}
      <h3 className={styles.demoTitle}>
        Regardez la vidéo Demo
      </h3>
      
      <div className={styles.phonePreview}>
        <img 
          src="/img/iphone-frame.jpg" 
          alt="App Demo"
          className={styles.phoneImage}
        />
                <video
                className={styles.phoneVideo}
                src="/video/Demo.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
      </div>
    </div>
  );
}