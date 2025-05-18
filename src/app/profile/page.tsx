// app/profile/page.tsx
'use client';

import { useState,useEffect } from 'react';
import styles from './profile.module.css';
import { Eye, EyeOff } from 'lucide-react'; // Import these icons
import { ActivityIcon} from '../components/Icons';
import AidePage from "@/app/profile/sections/aide";

// Generic Modal Component
const CustomModal = ({
  gifSrc,
  heading,
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  onClose
}: {
  gifSrc: string;
  heading?: string;
  message: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onClose: () => void;
}) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <img src={gifSrc} alt="Status GIF" className={styles.modalGif} />
      <h2 className={styles.modalHeading}>{heading}</h2>
      <p className={styles.modalMessage}>{message}</p>
      <div className={styles.modalButtons}>
        <button 
          onClick={onPrimaryClick || onClose}
          className={styles.modalButton}
        >
          {primaryButtonText}
        </button>
        {secondaryButtonText && (
          <button 
            onClick={onSecondaryClick || onClose}
            className={styles.modalButtonSecondary}
          >
            {secondaryButtonText}
          </button>
        )}
      </div>
    </div>
  </div>
);


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);  
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '',
    country: '',
    region: '',
    phone: '',
  });

    // Modal states
    const [activeModal, setActiveModal] = useState<
    'welcome' | 'logout' | 'updateSuccess' | 
    'updateError' | 'delete' | null
  >(null);

  // Modals configuration
  const modals = {
    welcome: {
      gifSrc: '/gifs/gif-check1.gif',
      heading: 'Félicitation! 👋',
      message: "Vous aves connecté avec succées. s'il vous plaît changeé vos mot de passe",
      primaryButtonText: 'OK',
    },
    logout: {
      gifSrc: '/gifs/gif-alert2.gif',
      message: 'Voulez-vous vraiment vous déconnecter ?',
      primaryButtonText: 'Oui',
      secondaryButtonText: 'Annuler',
    },
    updateSuccess: {
      gifSrc: '/gifs/gif-check1.gif',
      heading: 'succès',
      message: 'Votre profil a été mis à jour avec succès.',
      primaryButtonText: 'Continuer',
    },
    updateError: {
      gifSrc: '/gifs/gif-alert2.gif',
      heading: 'Erreur',
      message: 'Données utilisateur introuvables.',
      primaryButtonText: 'Réessayer',
    },
    delete: {
      gifSrc: '/gifs/gif-alert2.gif',
      message: 'Voulez-vous vraiment vous supprimer le compte ?',
      primaryButtonText: 'Oui',
      secondaryButtonText: 'Annuler',
    },
  };


  // Update handling with modals
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== confirmPassword) {
      setActiveModal('updateError');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/auth/update/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update profile');
      setActiveModal('updateSuccess');
    } catch (err) {
      console.error('Update error:', err);
      setActiveModal('updateError');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const uploadResponse = await fetch('http://localhost:8000/profile/avatar', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (uploadResponse.ok) {
        const newAvatarResponse = await fetch('http://localhost:8000/profile/avatar', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (newAvatarResponse.ok) {
          const newBlob = await newAvatarResponse.blob();
          const newUrl = URL.createObjectURL(newBlob);
          setAvatarUrl(newUrl);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

    // Logout handler
    const handleLogout = async () => {
      try {
        await fetch('http://localhost:8000/auth/logout', {
          method: 'POST',
          credentials: 'include'
        });
        window.location.href = '/sign-in';
      } catch (err) {
        console.error('Logout error:', err);
      }
    };
  
    // Delete account handler
    const handleDeleteAccount = async () => {
      try {
        await fetch(`http://localhost:8000/auth/delete/${userId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        window.location.href = '/';
      } catch (err) {
        console.error('Delete error:', err);
      }
    };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get('authSuccess');       
      if (authSuccess === 'true') {
        setShowWelcomeModal(true);
        window.history.replaceState({}, document.title, '/profile');
      }
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:8000/auth/profile', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!res.ok) throw new Error('Failed to fetch profile');
  
        const data = await res.json();
        
        setUserId(data.id);
        setFormData(prev => ({
          ...prev,
          username: data.username || '',
          email: data.email || '',
          avatar: data.avatar || '',
          country: data.country || '',
          region: data.region || '',
          phone: data.phone || '',
          password: '', 
        }));
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };
  
    fetchProfile();
  }, []);



  // Separate useEffect for avatar loading
  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const response = await fetch('http://localhost:8000/profile/avatar', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store'
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setAvatarUrl(url);
        }
      } catch (error) {
        console.error('Error loading avatar:', error);
      }
    };

    loadAvatar();

    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, []);


  return (
    
    <div className={styles.container}>
      {/* Left Navigation */}
      <nav className={styles.sidebar}>
        <div className={styles.navContainer}>
          <button
            onClick={() => setActiveTab('profile')}
            className={`${styles.navButton} ${activeTab === 'profile' ? styles.active : ''}`}
          >
            <div className={styles.profileImageWrapper}>
              <img 
                src={'/img/image-22.jpg'} 
                alt="Profile" 
                className={`${styles.profileImage} ${activeTab === 'profile' ? styles.activeImage : ''}`}
              />
            </div>
            <span>Mes Informations</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`${styles.navButton} ${activeTab === 'security' ? styles.active : ''}`}
          >
            <div className={styles.profileImageWrapper}>
              <img 
                src={'/img/reservation.jpg'} 
                alt="Reservation" 
                className={`${styles.profileImage} ${activeTab === 'profile' ? styles.activeImage : ''}`}
              />
            </div>
            <span>mes reservations</span>
          </button>

          <button
            onClick={() => setActiveTab('aide')}
            className={`${styles.navButton} ${activeTab === 'aide' ? styles.active : ''}`}
          >
            <div className={styles.profileImageWrapper}>
              <img 
                src={'/img/Groupe1183.jpg'} 
                alt="Aide" 
                className={`${styles.profileImage} ${activeTab === 'profile' ? styles.activeImage : ''}`}
              />
            </div>
            <span>aide</span>
          </button>

      {/* Activity/Logout button */}
        <button
            onClick={() => setActiveModal('logout')}
            className={`${styles.navButton} ${activeTab === 'activity' ? styles.active : ''}`}
          >
            <ActivityIcon active={activeTab === 'activity'} />
            <span style={{ color: "#FF4444" }}>déconnexion</span>
          </button>
        </div>
      </nav>
     <main className={styles.mainContent}>
        {activeTab === 'profile' ? (
          <form onSubmit={handleSubmit} className={styles.profileForm}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper}>
              {formData.avatar || avatarUrl ? (
                <img 
                  src = {avatarUrl || formData.avatar} 
                  alt="Profile" 
                  className={styles.avatarImage}
                />) : ( <div><div className={styles.profile_container}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="25" viewBox="0 0 29 25" fill="none">
                  <path d="M21.1686 4.21515C22.5164 4.21515 23.8511 4.21515 25.1857 4.21515C25.7429 4.20387 26.2941 4.33079 26.7893 4.58439C27.2846 4.83799 27.7082 5.21026 28.0218 5.66743C28.4353 6.23046 28.6545 6.91101 28.6467 7.60768C28.6467 12.2066 28.6467 16.8055 28.6467 21.4044C28.644 22.3004 28.2851 23.1592 27.6481 23.7942C27.011 24.4292 26.1471 24.789 25.2442 24.7955C18.0862 24.7955 10.9286 24.7955 3.77157 24.7955C2.86816 24.789 2.0038 24.4291 1.36621 23.7939C0.728616 23.1587 0.369271 22.2995 0.366211 21.4029C0.366211 16.804 0.366211 12.2051 0.366211 7.60623C0.370035 6.71004 0.729673 5.85146 1.36714 5.21666C2.00461 4.58186 2.86853 4.22202 3.77157 4.21515C5.04767 4.21515 6.32426 4.21515 7.60133 4.21515C7.78718 4.21515 7.87645 4.17012 7.9306 3.98133C8.04328 3.58921 8.18523 3.20581 8.32133 2.8195C8.54777 2.1245 8.99428 1.52063 9.59442 1.09777C10.1946 0.6749 10.9162 0.455637 11.6521 0.472608H17.3594C18.0961 0.455491 18.8186 0.675585 19.4187 1.09995C20.0188 1.52432 20.4644 2.13014 20.6886 2.82676C20.8496 3.28423 21.0018 3.74461 21.1628 4.21515H21.1686ZM14.5028 22.9264H25.0481C25.2768 22.9455 25.5069 22.9152 25.7226 22.8374C25.9383 22.7597 26.1344 22.6364 26.2973 22.476C26.4603 22.3157 26.5862 22.1222 26.6664 21.9088C26.7466 21.6955 26.7791 21.4674 26.7618 21.2403C26.7618 16.7585 26.7618 12.2763 26.7618 7.79358C26.7819 7.56371 26.7509 7.33226 26.6709 7.11562C26.5909 6.89897 26.4639 6.70243 26.2988 6.5399C26.1338 6.37737 25.9348 6.25283 25.7159 6.17509C25.497 6.09735 25.2635 6.06832 25.032 6.09005H20.614C20.3667 6.12259 20.1162 6.0599 19.9139 5.91486C19.7117 5.76982 19.5732 5.55344 19.5267 5.31017C19.3218 4.70311 19.1242 4.09315 18.9179 3.4861C18.8222 3.14456 18.612 2.84561 18.322 2.63861C18.032 2.43161 17.6795 2.32893 17.3228 2.34751C15.4477 2.34751 13.5725 2.34751 11.6974 2.34751C11.3353 2.32731 10.9772 2.43193 10.6839 2.64365C10.3905 2.85537 10.1799 3.16119 10.0877 3.50934C9.87986 4.12656 9.67791 4.74523 9.46572 5.361C9.41461 5.58575 9.28195 5.78397 9.09303 5.91789C8.90411 6.05181 8.67213 6.11205 8.44133 6.08714H4.02475C3.78571 6.05939 3.54344 6.08558 3.31603 6.16375C3.08862 6.24192 2.88194 6.37005 2.71141 6.53858C2.54089 6.70711 2.41092 6.91169 2.33121 7.13705C2.2515 7.36241 2.22411 7.60272 2.25109 7.84005C2.25109 12.2734 2.25109 16.7067 2.25109 21.1401C2.22051 21.3813 2.24583 21.6263 2.32512 21.8564C2.40441 22.0864 2.53556 22.2955 2.7086 22.4677C2.88164 22.6398 3.09199 22.7705 3.32362 22.8497C3.55526 22.929 3.80206 22.9547 4.04523 22.9249H14.5028V22.9264Z" fill="#474747"/>
                  <path d="M14.4967 21.0554C13.0959 21.0533 11.7274 20.6384 10.5647 19.8631C9.40197 19.0879 8.49752 17.9874 7.96608 16.7013C7.43464 15.4151 7.30018 14.0013 7.57974 12.6392C7.85931 11.277 8.5403 10.028 9.53632 9.05061C10.5323 8.0732 11.7985 7.41145 13.1741 7.14931C14.5497 6.88718 15.9728 7.03649 17.2627 7.57828C18.5527 8.12008 19.6514 9.02996 20.4195 10.1924C21.1875 11.3549 21.5903 12.7177 21.5767 14.1077C21.5624 15.9595 20.8093 17.7303 19.4824 19.0325C18.1555 20.3346 16.3628 21.062 14.4967 21.0554ZM19.6918 14.0467C19.6929 13.0285 19.3896 12.0329 18.8202 11.1859C18.2507 10.3389 17.4408 9.67871 16.493 9.28887C15.5452 8.89903 14.5021 8.7971 13.4959 8.99599C12.4897 9.19487 11.5655 9.68563 10.8406 10.4061C10.1156 11.1266 9.62239 12.0444 9.4234 13.0432C9.22441 14.0421 9.3286 15.0771 9.72276 16.0171C10.1169 16.9572 10.7833 17.76 11.6376 18.3239C12.4919 18.8878 13.4956 19.1875 14.5215 19.1849C15.8908 19.1746 17.201 18.6297 18.1686 17.6681C19.1362 16.7065 19.6834 15.4056 19.6918 14.0467Z" fill="#474747"/>
                  <path d="M23.9505 7.95661C24.0754 7.95711 24.1989 7.98253 24.3136 8.03138C24.4284 8.08022 24.5321 8.15148 24.6185 8.24091C24.7049 8.33035 24.7723 8.43613 24.8167 8.55195C24.8611 8.66778 24.8816 8.79129 24.8768 8.91512C24.8755 9.0366 24.85 9.15662 24.8018 9.26828C24.7536 9.37995 24.6836 9.48106 24.5959 9.56581C24.5082 9.65056 24.4045 9.71728 24.2907 9.76213C24.1769 9.80697 24.0553 9.82907 23.9329 9.82715C23.808 9.82855 23.684 9.80497 23.5685 9.7578C23.4529 9.71064 23.3481 9.64086 23.2602 9.55263C23.1724 9.4644 23.1034 9.35953 23.0573 9.24426C23.0112 9.12899 22.989 9.00569 22.992 8.88172C22.9911 8.75777 23.0155 8.63493 23.0637 8.52058C23.1119 8.40623 23.1829 8.30274 23.2724 8.21632C23.362 8.1299 23.4682 8.06235 23.5847 8.01772C23.7013 7.97308 23.8257 7.9523 23.9505 7.95661Z" fill="#474747"/>
                  </svg></div><img 
                  src ='/img/placeholder.jpg'
                  alt="Profile"
                  className={styles.avatarImage} 
                /></div>)}
                <label className={styles.avatarUploadLabel}>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className={styles.avatarUploadInput}
                  />
                  <span>✎</span>
                </label>
                <span className={styles.avatarText}>Changer la photo de profil</span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className={styles.formInput}
                placeholder="Nom et prénom * "
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={styles.formInput}
                placeholder=" Adresse e-mail * "
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={styles.formInput}
                placeholder="Téléphone/Whatsapp * "
                required
              />
              </div>
            {/* Password input section */}
            <div className={styles.formGroup}>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={styles.formInput}
                  placeholder="Mot de passe *"
                  required
                                  />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {formData.password.length > 0 && (
                <div className={formData.password.length >= 8 ? styles.passwordValid : styles.passwordInvalid}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    {formData.password.length >= 8 ? (
                      <>
                        <path d="M14.7016 5.99316L7.34062 12.9235L3.66016 9.45832" stroke="#2B641E" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="9" cy="9" r="8.5" stroke="#2B641E"/>
                      </>
                    ) : (
                      <>
                        <path d="M9.74639 9.73387L14.0272 6.11353C14.1094 6.02866 14.1514 5.9209 14.1451 5.81123C14.1387 5.70156 14.0844 5.59782 13.9928 5.52017C13.9011 5.44253 13.7786 5.39654 13.6491 5.39116C13.5196 5.38577 13.3924 5.42137 13.2922 5.49103L9.01788 9.11683L4.74356 5.49103C4.64335 5.42137 4.51613 5.38577 4.38665 5.39116C4.25716 5.39654 4.13468 5.44253 4.04301 5.52017C3.95134 5.59782 3.89705 5.70156 3.89069 5.81123C3.88433 5.9209 3.92636 6.02866 4.0086 6.11353L8.28938 9.73387L4.0086 13.3542C3.91175 13.437 3.85742 13.5489 3.85742 13.6655C3.85742 13.782 3.91175 13.8939 4.0086 13.9767C4.10718 14.0574 4.23895 14.1026 4.37608 14.1026C4.51321 14.1026 4.64497 14.0574 4.74356 13.9767L9.01788 10.3509L13.2922 13.9767C13.3908 14.0574 13.5226 14.1026 13.6597 14.1026C13.7968 14.1026 13.9286 14.0574 14.0272 13.9767C14.124 13.8939 14.1783 13.782 14.1783 13.6655C14.1783 13.5489 14.124 13.437 14.0272 13.3542L9.74639 9.73387Z" fill="#FF0000"/>
                        <circle cx="9" cy="9" r="8.5" stroke="#FF0000"/>
                      </>
                    )}
                  </svg>
                  <p>
                    {formData.password.length >= 8 
                      ? "Mot de passe valide !"
                      : "Le mot de passe doit contenir au moins 8 caractères"}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className={styles.formGroup}>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordMismatch(formData.password !== e.target.value);
                  }}
                  className={styles.formInput}
                  placeholder="Confirmer le mot de passe"
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {passwordMismatch && (
                <div className={styles.passwordInvalid}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9.74639 9.73387L14.0272 6.11353C14.1094 6.02866 14.1514 5.9209 14.1451 5.81123C14.1387 5.70156 14.0844 5.59782 13.9928 5.52017C13.9011 5.44253 13.7786 5.39654 13.6491 5.39116C13.5196 5.38577 13.3924 5.42137 13.2922 5.49103L9.01788 9.11683L4.74356 5.49103C4.64335 5.42137 4.51613 5.38577 4.38665 5.39116C4.25716 5.39654 4.13468 5.44253 4.04301 5.52017C3.95134 5.59782 3.89705 5.70156 3.89069 5.81123C3.88433 5.9209 3.92636 6.02866 4.0086 6.11353L8.28938 9.73387L4.0086 13.3542C3.91175 13.437 3.85742 13.5489 3.85742 13.6655C3.85742 13.782 3.91175 13.8939 4.0086 13.9767C4.10718 14.0574 4.23895 14.1026 4.37608 14.1026C4.51321 14.1026 4.64497 14.0574 4.74356 13.9767L9.01788 10.3509L13.2922 13.9767C13.3908 14.0574 13.5226 14.1026 13.6597 14.1026C13.7968 14.1026 13.9286 14.0574 14.0272 13.9767C14.124 13.8939 14.1783 13.782 14.1783 13.6655C14.1783 13.5489 14.124 13.437 14.0272 13.3542L9.74639 9.73387Z" fill="#FF0000"/>
                    <circle cx="9" cy="9" r="8.5" stroke="#FF0000"/>
                  </svg>
                  <p>Les deux mots de passe sont différents.</p>
                </div>
              )}
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className={styles.formInput}
                placeholder="Pays * "
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="region"
                value={formData.region}
                onChange={(e) => setFormData({...formData, region: e.target.value})}
                className={styles.formInput}
                placeholder="Region  "
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Modifier
            </button>
                  {/* Delete Button */}
            <button 
          onClick={() => setActiveModal('delete')}
          className={styles.deleteButton}
        >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
          aria-hidden="true"
        >
          <path 
            d="M8.66335 7.9858L12.4685 4.1864C12.5416 4.09732 12.5789 3.98424 12.5733 3.86915C12.5676 3.75405 12.5194 3.64517 12.4379 3.56369C12.3564 3.48221 12.2475 3.43395 12.1324 3.42829C12.0173 3.42264 11.9043 3.46 11.8152 3.53311L8.01579 7.33824L4.21639 3.53311C4.12731 3.46 4.01423 3.42264 3.89913 3.42829C3.78404 3.43395 3.67516 3.48221 3.59368 3.56369C3.5122 3.64517 3.46393 3.75405 3.45828 3.86915C3.45263 3.98424 3.48999 4.09732 3.56309 4.1864L7.36823 7.9858L3.56309 11.7852C3.47701 11.8721 3.42871 11.9895 3.42871 12.1118C3.42871 12.2342 3.47701 12.3516 3.56309 12.4385C3.65072 12.5232 3.76785 12.5706 3.88974 12.5706C4.01163 12.5706 4.12876 12.5232 4.21639 12.4385L8.01579 8.63336L11.8152 12.4385C11.9028 12.5232 12.0199 12.5706 12.1418 12.5706C12.2637 12.5706 12.3809 12.5232 12.4685 12.4385C12.5546 12.3516 12.6029 12.2342 12.6029 12.1118C12.6029 11.9895 12.5546 11.8721 12.4685 11.7852L8.66335 7.9858Z" 
            fill="#E70013"
          />
          <circle cx="8" cy="8" r="7.5" stroke="#E70013"/>
        </svg>
        <span className="text-[#E70013] font-actor text-[1.125rem] font-normal leading-normal capitalize">
          Supprimer le compte
        </span>      
        </button>
          </form>
        ) : (
          <div>
          </div>
        )}  
        {activeTab === 'aide' && <AidePage />}
      </main>
      {activeModal && (
        <CustomModal
          {...modals[activeModal]}
          onClose={() => setActiveModal(null)}
          onPrimaryClick={
            activeModal === 'logout' ? handleLogout :
            activeModal === 'delete' ? handleDeleteAccount : undefined
          }
          onSecondaryClick={() => setActiveModal(null)}
        />
      )}

      {/* Welcome Modal (triggered by authSuccess) */}
      {showWelcomeModal && (
        <CustomModal
          {...modals.welcome}
          onClose={() => setShowWelcomeModal(false)}
        />
      )}
    </div>

  );
}