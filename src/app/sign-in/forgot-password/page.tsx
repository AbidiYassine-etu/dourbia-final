'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from "lucide-react";
import '@/app/style/forgot-password.css';

const ForgotPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setPasswordMismatch(false);

    try {
      const response = await fetch('http://localhost:8000/auth/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Mot de passe réinitialisé avec succès');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setError(data.message || 'Une erreur est survenue');
      }
    } catch {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <Image 
        src="/img/logo4.png" 
        alt="Logo" 
        width={90} 
        height={45} 
        className="forgot-logo" 
      />

      <h1 className="forgot-title">
        Réinitialisez le mot de passe
      </h1>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit} className="forgot-form">
        {/* Nouveau mot de passe */}
        <div className="input-container">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
            className="forgot-input"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {newPassword.length > 0 && newPassword.length < 8 && (
                <div className="password-requirement">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.74639 9.73387L14.0272 6.11353C14.1094 6.02866 14.1514 5.9209 14.1451 5.81123C14.1387 5.70156 14.0844 5.59782 13.9928 5.52017C13.9011 5.44253 13.7786 5.39654 13.6491 5.39116C13.5196 5.38577 13.3924 5.42137 13.2922 5.49103L9.01788 9.11683L4.74356 5.49103C4.64335 5.42137 4.51613 5.38577 4.38665 5.39116C4.25716 5.39654 4.13468 5.44253 4.04301 5.52017C3.95134 5.59782 3.89705 5.70156 3.89069 5.81123C3.88433 5.9209 3.92636 6.02866 4.0086 6.11353L8.28938 9.73387L4.0086 13.3542C3.91175 13.437 3.85742 13.5489 3.85742 13.6655C3.85742 13.782 3.91175 13.8939 4.0086 13.9767C4.10718 14.0574 4.23895 14.1026 4.37608 14.1026C4.51321 14.1026 4.64497 14.0574 4.74356 13.9767L9.01788 10.3509L13.2922 13.9767C13.3908 14.0574 13.5226 14.1026 13.6597 14.1026C13.7968 14.1026 13.9286 14.0574 14.0272 13.9767C14.124 13.8939 14.1783 13.782 14.1783 13.6655C14.1783 13.5489 14.124 13.437 14.0272 13.3542L9.74639 9.73387Z" fill="#FF0000"/>
                    <circle cx="9" cy="9" r="8.5" stroke="#FF0000"/>
                  </svg>
                  <p >
                    Le mot de passe doit contenir au moins 8 caractères.
                  </p>
                </div>
              )}
              {newPassword.length >= 8 && (
              <div className="password-valide">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7016 5.99316L7.34062 12.9235L3.66016 9.45832" stroke="#2B641E" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="9" r="8.5" stroke="#2B641E"/>
                </svg>
                <p>
                  Mot de passe valide !
                </p>
              </div>
            )}
        </div>

        {/* Confirmer le mot de passe */}
        <div className="input-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordMismatch(newPassword !== e.target.value);
            }}
            placeholder="Confirmer le mot de passe"
            className="forgot-input"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {passwordMismatch && (
                <div className="password-requirement">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.74639 9.73387L14.0272 6.11353C14.1094 6.02866 14.1514 5.9209 14.1451 5.81123C14.1387 5.70156 14.0844 5.59782 13.9928 5.52017C13.9011 5.44253 13.7786 5.39654 13.6491 5.39116C13.5196 5.38577 13.3924 5.42137 13.2922 5.49103L9.01788 9.11683L4.74356 5.49103C4.64335 5.42137 4.51613 5.38577 4.38665 5.39116C4.25716 5.39654 4.13468 5.44253 4.04301 5.52017C3.95134 5.59782 3.89705 5.70156 3.89069 5.81123C3.88433 5.9209 3.92636 6.02866 4.0086 6.11353L8.28938 9.73387L4.0086 13.3542C3.91175 13.437 3.85742 13.5489 3.85742 13.6655C3.85742 13.782 3.91175 13.8939 4.0086 13.9767C4.10718 14.0574 4.23895 14.1026 4.37608 14.1026C4.51321 14.1026 4.64497 14.0574 4.74356 13.9767L9.01788 10.3509L13.2922 13.9767C13.3908 14.0574 13.5226 14.1026 13.6597 14.1026C13.7968 14.1026 13.9286 14.0574 14.0272 13.9767C14.124 13.8939 14.1783 13.782 14.1783 13.6655C14.1783 13.5489 14.124 13.437 14.0272 13.3542L9.74639 9.73387Z" fill="#FF0000"/>
                  <circle cx="9" cy="9" r="8.5" stroke="#FF0000"/>
                </svg>
                <p>
                Les deux mots de passe sont différents.
                </p>
              </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Modification...' : 'Valider'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
