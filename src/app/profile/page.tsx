// app/profile/page.tsx
'use client';

import { useState,useEffect } from 'react';
import styles from './profile.module.css';
import AidePage from './sections/Aide'


const SecurityIcon = ({ }: { active: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_7_2333)">
    <path d="M8.75 4V5.25H5V4H8.75ZM5 7.75V6.5H8.75V7.75H5ZM5 10.25V9H7.5V10.25H5ZM3.75 4V5.25H2.5V4H3.75ZM3.75 6.5V7.75H2.5V6.5H3.75ZM2.5 10.25V9H3.75V10.25H2.5ZM1.25 0.25V17.75H7.5V19H0V-1H10.8887L16.25 4.36133V6.5H15V5.25H10V0.25H1.25ZM11.25 1.13867V4H14.1113L11.25 1.13867ZM17.5 9H20V19H8.75V9H11.25V7.75H12.5V9H16.25V7.75H17.5V9ZM18.75 17.75V12.75H10V17.75H18.75ZM18.75 11.5V10.25H10V11.5H18.75Z" fill="#474747"/>
    </g>
    <defs>
    <clipPath id="clip0_7_2333">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    </defs>
    </svg>
);

const SettingsIcon = ({ active }: { active: boolean }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ fill: active ? '#007BFF' : '#474747' }} // Just an example change
>
  <path d="M20 10C20 11.9778 19.4135 13.9111 18.3148 15.5556C17.216 17.2001 15.6543 18.4818 13.8271 19.2387C11.9999 19.9956 9.98924 20.1937 8.04945 19.8079C6.10967 19.4221 4.32784 18.4698 2.92928 17.0714C1.53071 15.673 0.578229 13.8912 0.192269 11.9515C-0.193692 10.0117 0.0042044 8.00111 0.760933 6.17383C1.51766 4.34655 2.79924 2.7847 4.4436 1.68577C6.08797 0.586841 8.02127 0.000190061 9.99904 0C12.6507 0.00178162 15.1933 1.05589 17.0685 2.93084C18.9436 4.80579 19.998 7.34829 20 10ZM0.908134 10C0.908134 11.798 1.44131 13.5556 2.44023 15.0506C3.43915 16.5456 4.85896 17.7108 6.5201 18.3989C8.18125 19.087 10.0091 19.267 11.7726 18.9162C13.5361 18.5654 15.1559 17.6996 16.4273 16.4282C17.6987 15.1569 18.5645 13.537 18.9153 11.7735C19.266 10.0101 19.086 8.1822 18.3979 6.52106C17.7099 4.85991 16.5447 3.44011 15.0497 2.44118C13.5547 1.44226 11.7971 0.909091 9.99904 0.909091C8.80496 0.908206 7.62242 1.14275 6.51906 1.59929C5.4157 2.05584 4.41317 2.72544 3.56883 3.56978C2.72448 4.41413 2.05488 5.41665 1.59834 6.52001C1.14179 7.62337 0.90725 8.80591 0.908134 10ZM13.2606 7.74841C13.2827 10.321 11.0628 11.5453 10.4555 12.2304V12.807C10.4555 12.8667 10.4438 12.9258 10.4209 12.981C10.3981 13.0361 10.3646 13.0862 10.3224 13.1284C10.2802 13.1707 10.2301 13.2041 10.1749 13.227C10.1198 13.2498 10.0607 13.2616 10.001 13.2616C9.94127 13.2616 9.88216 13.2498 9.82702 13.227C9.77187 13.2041 9.72176 13.1707 9.67955 13.1284C9.63734 13.0862 9.60386 13.0361 9.58102 12.981C9.55818 12.9258 9.54642 12.8667 9.54642 12.807V12.0469C9.5471 11.9466 9.58088 11.8493 9.64252 11.7701C10.5074 10.6169 12.3746 9.87507 12.3554 7.75706V7.74841C12.337 7.13081 12.0835 6.54354 11.6466 6.10663C11.2097 5.66973 10.6224 5.41619 10.0048 5.39785C9.3862 5.41475 8.79748 5.66765 8.35936 6.1047C7.92123 6.54175 7.66689 7.12984 7.64848 7.74841C7.64848 7.86896 7.60059 7.98458 7.51534 8.06982C7.4301 8.15507 7.31448 8.20296 7.19393 8.20296C7.07338 8.20296 6.95776 8.15507 6.87252 8.06982C6.78727 7.98458 6.73938 7.86896 6.73938 7.74841C6.73938 6.88377 7.08286 6.05454 7.69426 5.44315C8.30565 4.83175 9.13488 4.48827 9.99952 4.48827C10.8642 4.48827 11.6934 4.83175 12.3048 5.44315C12.9162 6.05454 13.2597 6.88377 13.2597 7.74841H13.2606ZM10.8457 15.0567C10.8455 15.2237 10.7958 15.3869 10.7028 15.5257C10.6099 15.6645 10.4779 15.7726 10.3236 15.8364C10.1692 15.9002 9.99938 15.9168 9.83558 15.8841C9.67179 15.8514 9.52137 15.7709 9.40333 15.6527C9.28529 15.5345 9.20494 15.384 9.17242 15.2202C9.1399 15.0563 9.15669 14.8865 9.22065 14.7323C9.28461 14.578 9.39288 14.4461 9.53177 14.3533C9.67066 14.2605 9.83394 14.211 10.001 14.211C10.1121 14.2106 10.2222 14.2323 10.325 14.2747C10.4277 14.3172 10.521 14.3796 10.5995 14.4583C10.6779 14.5371 10.74 14.6306 10.7821 14.7334C10.8242 14.8363 10.8455 14.9465 10.8447 15.0577L10.8457 15.0567Z" fill="currentColor"/>
</svg>
);

const ActivityIcon = ({ }: { active: boolean }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M19.9997 17.2025C19.9889 17.5879 19.9008 17.9672 19.7408 18.3179C19.5807 18.6685 19.352 18.9834 19.0681 19.2438C18.7842 19.5042 18.4509 19.7048 18.0881 19.8337C17.7252 19.9625 17.3402 20.0171 16.956 19.994C14.5555 20.0074 12.1551 19.994 9.75472 19.994C9.60688 19.994 9.46508 19.9352 9.36054 19.8305C9.256 19.7258 9.19727 19.5838 9.19727 19.4357C9.19727 19.2877 9.256 19.1456 9.36054 19.0409C9.46508 18.9362 9.60688 18.8774 9.75472 18.8774C12.2075 18.8774 14.6603 18.9132 17.1132 18.8774C18.3474 18.8596 18.8848 17.9305 18.8848 16.8251V2.90856C18.8934 2.55712 18.7946 2.21142 18.6018 1.9177C18.4089 1.62397 18.1311 1.39621 17.8055 1.26489C17.4206 1.15968 17.0201 1.12376 16.6226 1.15881H9.75472C9.60688 1.15881 9.46508 1.09999 9.36054 0.995283C9.256 0.890579 9.19727 0.74857 9.19727 0.600496C9.19727 0.452423 9.256 0.310414 9.36054 0.20571C9.46508 0.101006 9.60688 0.0421836 9.75472 0.0421836C12.2343 0.0421836 14.7328 -0.0527295 17.2102 0.0421836C17.5895 0.0517928 17.9632 0.136871 18.3094 0.292468C18.6557 0.448065 18.9676 0.671073 19.2269 0.948515C19.4863 1.22596 19.688 1.55229 19.8203 1.90853C19.9526 2.26478 20.0128 2.64381 19.9974 3.02357L19.9997 17.2025Z" fill="#E70013"/>
  <path d="M0.163319 9.62583C0.069122 9.71731 0.0139762 9.84177 0.0094604 9.9731C0.0094604 9.98985 0.00946036 10.0044 0.00277087 10.0211C-0.00391862 10.0379 0.00277091 10.0513 0.0094604 10.0669C0.0139216 10.1986 0.0690532 10.3234 0.163319 10.4153L4.25394 14.5122C4.35908 14.6139 4.49989 14.6702 4.64606 14.6689C4.79222 14.6676 4.93204 14.6089 5.0354 14.5054C5.13875 14.4019 5.19738 14.2618 5.19865 14.1154C5.19992 13.9691 5.14373 13.828 5.04219 13.7227L1.9037 10.5783H13.8801C14.028 10.5783 14.1698 10.5195 14.2743 10.4148C14.3788 10.3101 14.4376 10.1681 14.4376 10.02C14.4376 9.87193 14.3788 9.72992 14.2743 9.62522C14.1698 9.52051 14.028 9.46169 13.8801 9.46169H1.9037L5.04219 6.31727C5.14373 6.21197 5.19992 6.07094 5.19865 5.92455C5.19738 5.77817 5.13875 5.63814 5.0354 5.53462C4.93204 5.4311 4.79222 5.37239 4.64606 5.37111C4.49989 5.36984 4.35908 5.42612 4.25394 5.52782L0.163319 9.62583Z" fill="#E70013"/>
</svg>
);


const WelcomeModal = ({ onClose }: { onClose: () => void }) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <h2>Welcome Back! 👋</h2>
      <p>You have successfully logged in.</p>
      <button 
        onClick={onClose}
        className={styles.modalButton}
      >
        OK
      </button>
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
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '',
    country: '',
    region: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:8000/auth/update/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) throw new Error('Failed to update profile');
  
      const updated = await res.json();
      console.log('Profile updated:', updated);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      alert('Something went wrong.');
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
            <span>Mes Information</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`${styles.navButton} ${activeTab === 'security' ? styles.active : ''}`}
          >
            <SecurityIcon active={activeTab === 'security'} />
            <span>mes reservations</span>
          </button>

          <button
            onClick={() => setActiveTab('aide')}
            className={`${styles.navButton} ${activeTab === 'aide' ? styles.active : ''}`}
          >
            <SettingsIcon active={activeTab === 'aide'} />
            <span>aide</span>
          </button>

          <button
            onClick={() => setActiveTab('activity')}
            className={`${styles.navButton} ${activeTab === 'activity' ? styles.active : ''}` }
          >
            <ActivityIcon active={activeTab === 'activity'} />
            <span style={{ color: "#FF4444" }} >déconnexion</span>
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
                />) : ( <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="25" viewBox="0 0 29 25" fill="none">
                  <path d="M21.1686 4.21515C22.5164 4.21515 23.8511 4.21515 25.1857 4.21515C25.7429 4.20387 26.2941 4.33079 26.7893 4.58439C27.2846 4.83799 27.7082 5.21026 28.0218 5.66743C28.4353 6.23046 28.6545 6.91101 28.6467 7.60768C28.6467 12.2066 28.6467 16.8055 28.6467 21.4044C28.644 22.3004 28.2851 23.1592 27.6481 23.7942C27.011 24.4292 26.1471 24.789 25.2442 24.7955C18.0862 24.7955 10.9286 24.7955 3.77157 24.7955C2.86816 24.789 2.0038 24.4291 1.36621 23.7939C0.728616 23.1587 0.369271 22.2995 0.366211 21.4029C0.366211 16.804 0.366211 12.2051 0.366211 7.60623C0.370035 6.71004 0.729673 5.85146 1.36714 5.21666C2.00461 4.58186 2.86853 4.22202 3.77157 4.21515C5.04767 4.21515 6.32426 4.21515 7.60133 4.21515C7.78718 4.21515 7.87645 4.17012 7.9306 3.98133C8.04328 3.58921 8.18523 3.20581 8.32133 2.8195C8.54777 2.1245 8.99428 1.52063 9.59442 1.09777C10.1946 0.6749 10.9162 0.455637 11.6521 0.472608H17.3594C18.0961 0.455491 18.8186 0.675585 19.4187 1.09995C20.0188 1.52432 20.4644 2.13014 20.6886 2.82676C20.8496 3.28423 21.0018 3.74461 21.1628 4.21515H21.1686ZM14.5028 22.9264H25.0481C25.2768 22.9455 25.5069 22.9152 25.7226 22.8374C25.9383 22.7597 26.1344 22.6364 26.2973 22.476C26.4603 22.3157 26.5862 22.1222 26.6664 21.9088C26.7466 21.6955 26.7791 21.4674 26.7618 21.2403C26.7618 16.7585 26.7618 12.2763 26.7618 7.79358C26.7819 7.56371 26.7509 7.33226 26.6709 7.11562C26.5909 6.89897 26.4639 6.70243 26.2988 6.5399C26.1338 6.37737 25.9348 6.25283 25.7159 6.17509C25.497 6.09735 25.2635 6.06832 25.032 6.09005H20.614C20.3667 6.12259 20.1162 6.0599 19.9139 5.91486C19.7117 5.76982 19.5732 5.55344 19.5267 5.31017C19.3218 4.70311 19.1242 4.09315 18.9179 3.4861C18.8222 3.14456 18.612 2.84561 18.322 2.63861C18.032 2.43161 17.6795 2.32893 17.3228 2.34751C15.4477 2.34751 13.5725 2.34751 11.6974 2.34751C11.3353 2.32731 10.9772 2.43193 10.6839 2.64365C10.3905 2.85537 10.1799 3.16119 10.0877 3.50934C9.87986 4.12656 9.67791 4.74523 9.46572 5.361C9.41461 5.58575 9.28195 5.78397 9.09303 5.91789C8.90411 6.05181 8.67213 6.11205 8.44133 6.08714H4.02475C3.78571 6.05939 3.54344 6.08558 3.31603 6.16375C3.08862 6.24192 2.88194 6.37005 2.71141 6.53858C2.54089 6.70711 2.41092 6.91169 2.33121 7.13705C2.2515 7.36241 2.22411 7.60272 2.25109 7.84005C2.25109 12.2734 2.25109 16.7067 2.25109 21.1401C2.22051 21.3813 2.24583 21.6263 2.32512 21.8564C2.40441 22.0864 2.53556 22.2955 2.7086 22.4677C2.88164 22.6398 3.09199 22.7705 3.32362 22.8497C3.55526 22.929 3.80206 22.9547 4.04523 22.9249H14.5028V22.9264Z" fill="#474747"/>
                  <path d="M14.4967 21.0554C13.0959 21.0533 11.7274 20.6384 10.5647 19.8631C9.40197 19.0879 8.49752 17.9874 7.96608 16.7013C7.43464 15.4151 7.30018 14.0013 7.57974 12.6392C7.85931 11.277 8.5403 10.028 9.53632 9.05061C10.5323 8.0732 11.7985 7.41145 13.1741 7.14931C14.5497 6.88718 15.9728 7.03649 17.2627 7.57828C18.5527 8.12008 19.6514 9.02996 20.4195 10.1924C21.1875 11.3549 21.5903 12.7177 21.5767 14.1077C21.5624 15.9595 20.8093 17.7303 19.4824 19.0325C18.1555 20.3346 16.3628 21.062 14.4967 21.0554ZM19.6918 14.0467C19.6929 13.0285 19.3896 12.0329 18.8202 11.1859C18.2507 10.3389 17.4408 9.67871 16.493 9.28887C15.5452 8.89903 14.5021 8.7971 13.4959 8.99599C12.4897 9.19487 11.5655 9.68563 10.8406 10.4061C10.1156 11.1266 9.62239 12.0444 9.4234 13.0432C9.22441 14.0421 9.3286 15.0771 9.72276 16.0171C10.1169 16.9572 10.7833 17.76 11.6376 18.3239C12.4919 18.8878 13.4956 19.1875 14.5215 19.1849C15.8908 19.1746 17.201 18.6297 18.1686 17.6681C19.1362 16.7065 19.6834 15.4056 19.6918 14.0467Z" fill="#474747"/>
                  <path d="M23.9505 7.95661C24.0754 7.95711 24.1989 7.98253 24.3136 8.03138C24.4284 8.08022 24.5321 8.15148 24.6185 8.24091C24.7049 8.33035 24.7723 8.43613 24.8167 8.55195C24.8611 8.66778 24.8816 8.79129 24.8768 8.91512C24.8755 9.0366 24.85 9.15662 24.8018 9.26828C24.7536 9.37995 24.6836 9.48106 24.5959 9.56581C24.5082 9.65056 24.4045 9.71728 24.2907 9.76213C24.1769 9.80697 24.0553 9.82907 23.9329 9.82715C23.808 9.82855 23.684 9.80497 23.5685 9.7578C23.4529 9.71064 23.3481 9.64086 23.2602 9.55263C23.1724 9.4644 23.1034 9.35953 23.0573 9.24426C23.0112 9.12899 22.989 9.00569 22.992 8.88172C22.9911 8.75777 23.0155 8.63493 23.0637 8.52058C23.1119 8.40623 23.1829 8.30274 23.2724 8.21632C23.362 8.1299 23.4682 8.06235 23.5847 8.01772C23.7013 7.97308 23.8257 7.9523 23.9505 7.95661Z" fill="#474747"/>
                  </svg></div>)}
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
            <div className={styles.formGroup}>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={styles.formInput}
                  required
                  placeholder="Mot de passe * "
                  minLength={8}
                />
                <svg
                  className={`${styles.eyeIcon} ${showPassword ? styles.active : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
                    <path 
                        className={styles.strikeThrough} 
                        d="M3 3L21 21" 
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                </svg>
              </div>
              <span className={styles.inputHint}>Minimum 8 characters</span>
            </div>

              <div className={styles.formGroup}>
                <div className={styles.passwordInputContainer}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.formInput}
                    placeholder="Confirmé Mot de Passe * "
                    required
                  />
                  <svg
                    className={`${styles.eyeIcon} ${showConfirmPassword ? styles.active : ''}`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"/>
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"/>
                    <path 
                        className={styles.strikeThrough} 
                        d="M3 3L21 21" 
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                  </svg>
                </div>
                {confirmPassword && (
                  <span className={`${styles.inputHint} ${
                    formData.password === confirmPassword 
                      ? styles.inputHintValid 
                      : styles.inputHintInvalid
                  }`}>
                    {formData.password === confirmPassword 
                      ? 'Passwords match!' 
                      : 'Passwords do not match'}
                  </span>
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
              Save Changes
            </button>
          </form>
        ) : (
          <div>
          </div>
        )}  
          {activeTab === 'aide' && <AidePage />}
      </main>
      {showWelcomeModal && <WelcomeModal onClose={() => setShowWelcomeModal(false)} />}
    </div>
  );
}