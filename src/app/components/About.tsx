import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from '@/app/Aboout.module.css';

const About = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (galleryRef.current) {
      setStartX(e.pageX - galleryRef.current.offsetLeft);
      setScrollLeft(galleryRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !galleryRef.current) return;
    
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = x - startX;
    galleryRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.contentColumn}>
            <div className={styles.contentBox}>
              {/* Title Section */}
              <div className={styles.headerContent}>
                <h6 className={styles.subtitle}>Découvrez nos expériences</h6>
                <h1 className={styles.title}>TOP destinations</h1>
              </div>

              {/* Gallery Contai */}
              <div className={styles.galleryContainer}>
                <div 
                  ref={galleryRef}
                  className={`${styles.galleryRow} ${isDragging ? styles.grabbing : ''}`}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  {[1, 2].map((item) => (
                    <div key={item} className={styles.galleryItem}>
                      <Image
                        src={`/img/circuit-${item}.png`}
                        alt={`Tour experience ${item}`}
                        fill
                        objectFit="contain"
                        className={styles.galleryImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;