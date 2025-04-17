import { useState, useEffect, useRef } from 'react';
import styles from '@/app/language.module.css'
import { TunisiaFlag, FranceFlag, UKFlag } from '@/app/components/flag'; // Import your SVG components

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('fr');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    setIsOpen(false);
  };

  return (
    <div className={styles.langSelector} ref={wrapperRef}>
      <div className={styles.selectWrapper}>
        <div className={styles.langIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            {/* Keep your existing globe icon */}
            <g clipPath="url(#clip1)">
              <path d="M10.86 0C4.87 0 0 4.87 0 10.86C0 16.85 4.87 21.72 10.86 21.72C16.85 21.72 21.72 16.85 21.72 10.86C21.72 4.87 16.84 0 10.86 0ZM19.32 9.71H16.02C15.9 7.33 15.42 4.97 14.59 3.18C17.11 4.4 18.93 6.82 19.32 9.71ZM10.86 19.41C9.8 19.41 8.23 16.5 8 12.01H13.73C13.48 16.5 11.92 19.41 10.86 19.41ZM7.99 9.71C8.22 5.22 9.79 2.3 10.85 2.3C11.91 2.3 13.48 5.21 13.71 9.71H7.99ZM7.12 3.17C6.29 4.97 5.81 7.32 5.69 9.7H2.39C2.78 6.82 4.6 4.4 7.12 3.17ZM2.39 12.01H5.69C5.81 14.39 6.29 16.75 7.12 18.54C4.6 17.31 2.78 14.89 2.39 12.01ZM14.59 18.54C15.42 16.74 15.9 14.39 16.02 12.01H19.32C18.93 14.89 17.11 17.31 14.59 18.54Z" 
                fill="#002863" fillOpacity="0.83"/>
            </g>
            <defs>
              <clipPath id="clip1">
                <rect width="21.71" height="21.71" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Hidden select for form submission */}
        <select value={selectedLang} className={styles.hiddenSelect}>
          <option value="ar">Arabe</option>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>

        {/* Custom dropdown */}
        <div className={styles.customSelect} onClick={() => setIsOpen(!isOpen)}>
          <div className={styles.selected}>
            {selectedLang === 'ar' && <TunisiaFlag className={styles.flag} />}
            {selectedLang === 'fr' && <FranceFlag className={styles.flag} />}
            {selectedLang === 'en' && <UKFlag className={styles.flag} />}
            <span className={styles.langText}>
              {selectedLang === 'ar' && 'Arabe'}
              {selectedLang === 'fr' && 'Français'}
              {selectedLang === 'en' && 'English'}
            </span>
          </div>

          {isOpen && (
            <div className={styles.options}>
              <div className={styles.option} onClick={() => handleLanguageChange('ar')}>
                <TunisiaFlag className={styles.flag} />
                <span>Arabe</span>
              </div>
              <div className={styles.option} onClick={() => handleLanguageChange('fr')}>
                <FranceFlag className={styles.flag} />
                <span>Français</span>
              </div>
              <div className={styles.option} onClick={() => handleLanguageChange('en')}>
                <UKFlag className={styles.flag} />
                <span>English</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;