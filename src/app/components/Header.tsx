'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/Header.module.css'
import { useAuth } from '../context/auth-context'
import { useRouter } from 'next/navigation';
import LanguageSelector from './languageSelector'


export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeButton, setActiveButton] = useState('Home')
  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const navButtons = [
    { name: 'Acceuil', path: '/' },
    { name: "à propos", path: '/about' },
    { name: 'Destinations', path: '/destination' },
    { name: 'Expériences', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        hamburgerRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isMenuOpen, isDropdownOpen]);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        router.push('/');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <div className={styles.navContent}>
          <button 
            ref={hamburgerRef}
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link href="/" className={styles.logoLink}>
            <Image 
              src='/img/FINAL 3.png' 
              alt="Logo" 
              width={139} 
              height={71.27}
            />
          </Link>

          {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu} />}

          <div ref={menuRef} className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
            <div className={styles.menuContent}>
              <div className={styles.navLinks}>
                {navButtons.map((button) => (
                  <Link
                    key={button.name}
                    href={button.path}
                    className={`${styles.navLink} ${activeButton === button.name ? styles.active : ''}`}
                    onClick={() => {
                      setActiveButton(button.name);
                      setIsMenuOpen(false);
                    }}
                  >
                    {button.name}
                  </Link>
                ))}
                <div className={styles.loginSection}>
                  <div className={styles.userIcon} ref={dropdownRef}>
                  <div 
                    className={`${styles.connexionTrigger} ${isDropdownOpen ? styles.textHidden : ''}`}
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isDropdownOpen}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                      <g clipPath="url(#clip0_620_488)">
                        <path d="M10.74 10.22C12.72 9.45 14.12 7.53 14.12 5.29C14.12 2.37 11.75 0 8.83 0C5.91 0 3.54 2.37 3.54 5.29C3.54 7.53 4.95 9.45 6.92 10.22C2.97 11.1 0 14.62 0 18.84C0 20.58 1.42 22 3.17 22H14.5C16.25 22 17.67 20.58 17.67 18.83C17.66 14.62 14.69 11.1 10.74 10.22ZM5.84 5.29C5.84 3.64 7.18 2.3 8.83 2.3C10.48 2.3 11.82 3.64 11.82 5.29C11.82 6.94 10.48 8.28 8.83 8.28C7.18 8.28 5.84 6.94 5.84 5.29ZM14.5 19.7H3.17C2.69 19.7 2.3 19.31 2.3 18.83C2.3 15.23 5.23 12.3 8.83 12.3C12.43 12.3 15.36 15.23 15.36 18.83C15.36 19.32 14.97 19.7 14.5 19.7Z" fill="#002863"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_620_488">
                          <rect width="17.66" height="22" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    {!isDropdownOpen && <span>Connexion</span>}
                    <svg
                        className={`${styles.connexionSvg} ${isDropdownOpen ? styles.rotated : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <mask id="path-1-inside-1_620_490" fill="white">
                          <path d="M14.9292 7.99902L7.85859 14.9277L0.929936 7.85706L8.00055 0.928408L14.9292 7.99902Z"/>
                        </mask>
                        <path d="M7.85859 14.9277L5.71587 17.0274L7.81557 19.1701L9.95829 17.0704L7.85859 14.9277ZM12.8295 5.8563L5.75889 12.785L9.95829 17.0704L17.0289 10.1417L12.8295 5.8563ZM10.0013 12.828L3.07266 5.75736L-1.21279 9.95676L5.71587 17.0274L10.0013 12.828Z" fill="#002863" mask="url(#path-1-inside-1_620_490)"/>
                      </svg>
                    </div>

                    <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.show : ''}`}>
                      {isLoggedIn ? (
                        <>
                          <Link href="/profile" onClick={() => setIsDropdownOpen(true)}>Profil</Link>
                          <button 
                            className={styles.logoutButton}
                            onClick={(e) => {
                              e.preventDefault();
                              handleLogout();
                              setIsDropdownOpen(false);
                            }}
                          >
                            Déconnexion
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href="/sign-in" onClick={() => setIsDropdownOpen(false)}>Se connecter</Link>
                          <Link href="/sign-up" onClick={() => setIsDropdownOpen(false)}>Créer un nouveau compte</Link>
                        </>
                      )}
                    </div>
                  </div>
                        <LanguageSelector/>
                      </div>
                    </div>
                  </div>
            </div>
            </div>
        </nav>
    </header>
  )
}