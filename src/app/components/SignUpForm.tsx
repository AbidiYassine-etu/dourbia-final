"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/app/style/register.css";
import { useRouter } from "next/navigation";

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
  <div className='modalOverlay'>
    <div className='modalContent'>
      <img src={gifSrc} alt="Status GIF" className='modalGif' />
      <h2 className='modalHeading'>{heading}</h2>
      <p className='modalMessage'>{message}</p>
      <div className='modalButtons'>
        <button 
          onClick={onPrimaryClick || onClose}
          className='modalButton'
        >
          {primaryButtonText}
        </button>
        {secondaryButtonText && (
          <button 
            onClick={onSecondaryClick || onClose}
            className='modalButtonSecondary'
          >
            {secondaryButtonText}
          </button>
        )}
      </div>
    </div>
  </div>
);

export default function SignUpForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeModal, setActiveModal] = useState<'Success' | 'Error' | null>(null);

  const modals = {
    Success: {
      gifSrc: '/gifs/gif-check1.gif',
      heading: 'succès',
      message: 'Compte créé avec succès. Un code de vérification vous a été envoyé par email.',
      primaryButtonText: 'Continuer',
    },
    Error: {
      gifSrc: '/gifs/gif-alert2.gif',
      heading: 'Erreur',
      message: "Échec de l'inscription. Veuillez vérifier les informations saisies.",
      primaryButtonText: 'Réessayer',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setActiveModal('Error');
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: fullName,
          email,
          password,
          country,
          region,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setActiveModal('Success');
      } else {
        setActiveModal('Error');
      }
    } catch (error) {
      console.error("Erreur complète:", error);
      setActiveModal('Error');
    }
  };

  const handleModalContinue = () => {
    setActiveModal(null);
    if (activeModal === 'Success') {
      router.push("/sign-up/verification");
    }
  };

  

  return (
    <main className="main-container">
      {/* Partie Gauche - Image */}
      <div className="left-panel">
        <div className="image-container">
          <Image
            src="/img/SignupImage.png"
            alt="Background Dourbia"
            layout="fill"
            objectFit="cover"
            className="background-image"
          />
          <div className="overlay">
            <div className="logo-position">
              <Image
                src="/img/logo1.png"
                alt="Logo Dourbia"
                width={340}
                height={210}
                className="main-logo"
              />
            </div>
            <h1 className="title-text">
              BIENVENUE À <br />
              <span>DOURBIA</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="spacer"></div>

      {/* Partie Droite - Formulaire */}
      <div className="right-panel">
        <Image
          src="/img/logo3.png"
          alt="Logo Dourbia"
          width={90}
          height={80}
          className="logo"
        />
        <div className="form-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Créer un compte</h2>
          <form className="auth-form">
            {/* Input Nom complet */}
            <div className="input-group">
              <input
                type="text"
                placeholder="Nom et prénom "
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                required
              />
              {!fullName && (
                <span className="orange-star">*</span>
              )}
            </div>
            {/* Input Email */}
            <div className="input-group">
              <input
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
              {!email && (
                <span className="orange-star-email">*</span>
              )}
            </div>
            {/* Input Mot de passe */}
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                minLength={8}
                required
              />
              {!password && (
                <span className="orange-star-password">*</span>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 18" fill="none">
                  {showPassword ? (
                    <>
                      <path d="M9.73 2.073C10.1516 2.0241 10.5756 1.99973 11 2C15.664 2 19.4 4.903 21 9C20.6127 9.99659 20.0894 10.9348 19.445 11.788M5.52 3.519C3.48 4.764 1.9 6.693 1 9C2.6 13.097 6.336 16 11 16C12.9321 16.0102 14.8292 15.484 16.48 14.48M8.88 6.88C8.6014 7.1586 8.3804 7.48935 8.22963 7.85335C8.07885 8.21736 8.00125 8.6075 8.00125 9.0015C8.00125 9.3955 8.07885 9.78564 8.22963 10.1496C8.3804 10.5137 8.6014 10.8444 8.88 11.123C9.1586 11.4016 9.48934 11.6226 9.85335 11.7734C10.2174 11.9242 10.6075 12.0018 11.0015 12.0018C11.3955 12.0018 11.7856 11.9242 12.1496 11.7734C12.5137 11.6226 12.8444 11.4016 13.123 11.123" stroke="#777272" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 1L19 17" stroke="#777272" strokeOpacity="0.5" strokeLinecap="round" />
                    </>
                  ) : (
                    <path d="M11 2C6.336 2 2.6 4.903 1 9C2.6 13.097 6.336 16 11 16C15.664 16 19.4 13.097 21 9C19.4 4.903 15.664 2 11 2ZM11 13.5C8.51472 13.5 6.5 11.4853 6.5 9C6.5 6.51472 8.51472 4.5 11 4.5C13.4853 4.5 15.5 6.51472 15.5 9C15.5 11.4853 13.4853 13.5 11 13.5ZM11 6C9.34315 6 8 7.34315 8 9C8 10.6569 9.34315 12 11 12C12.6569 12 14 10.6569 14 9C14 7.34315 12.6569 6 11 6Z" fill="#777272" fillOpacity="0.5" />
                  )}
                </svg>
              </button>
            </div>

            {/* Input Confirmation mot de passe */}
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmer mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                minLength={8}
                required
              />
              {!confirmPassword && (
                <span className="orange-star-password-confirm">*</span>
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 18" fill="none">
                  {showConfirmPassword ? (
                    <>
                      <path d="M9.73 2.073C10.1516 2.0241 10.5756 1.99973 11 2C15.664 2 19.4 4.903 21 9C20.6127 9.99659 20.0894 10.9348 19.445 11.788M5.52 3.519C3.48 4.764 1.9 6.693 1 9C2.6 13.097 6.336 16 11 16C12.9321 16.0102 14.8292 15.484 16.48 14.48M8.88 6.88C8.6014 7.1586 8.3804 7.48935 8.22963 7.85335C8.07885 8.21736 8.00125 8.6075 8.00125 9.0015C8.00125 9.3955 8.07885 9.78564 8.22963 10.1496C8.3804 10.5137 8.6014 10.8444 8.88 11.123C9.1586 11.4016 9.48934 11.6226 9.85335 11.7734C10.2174 11.9242 10.6075 12.0018 11.0015 12.0018C11.3955 12.0018 11.7856 11.9242 12.1496 11.7734C12.5137 11.6226 12.8444 11.4016 13.123 11.123" stroke="#777272" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 1L19 17" stroke="#777272" strokeOpacity="0.5" strokeLinecap="round" />
                    </>
                  ) : (
                    <path d="M11 2C6.336 2 2.6 4.903 1 9C2.6 13.097 6.336 16 11 16C15.664 16 19.4 13.097 21 9C19.4 4.903 15.664 2 11 2ZM11 13.5C8.51472 13.5 6.5 11.4853 6.5 9C6.5 6.51472 8.51472 4.5 11 4.5C13.4853 4.5 15.5 6.51472 15.5 9C15.5 11.4853 13.4853 13.5 11 13.5ZM11 6C9.34315 6 8 7.34315 8 9C8 10.6569 9.34315 12 11 12C12.6569 12 14 10.6569 14 9C14 7.34315 12.6569 6 11 6Z" fill="#777272" fillOpacity="0.5" />
                  )}
                </svg>
              </button>
            </div>

            {/* Input Pays */}
            <div className="input-group">
              <input
                type="text"
                placeholder="Pays"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Input Région */}
            <div className="input-group">
              <input
                type="text"
                placeholder="Région"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Checkbox Conditions */}
            {/* <div className="terms-checkbox" onClick={() => setAcceptedTerms(!acceptedTerms)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                className="checkbox-svg"
              >
                <path
                  d="M27.492 2.0166H8.64581C4.92851 2.0166 1.91504 5.03007 1.91504 8.74737V27.5935C1.91504 31.3108 4.92851 34.3243 8.64581 34.3243H27.492C31.2093 34.3243 34.2227 31.3108 34.2227 27.5935V8.74737C34.2227 5.03007 31.2093 2.0166 27.492 2.0166Z"
                  stroke="#777272"
                />
                {acceptedTerms && (
                  <path
                    d="M27.492 2.0166H8.64581C4.92851 2.0166 1.91504 5.03007 1.91504 8.74737V27.5935C1.91504 31.3108 4.92851 34.3243 8.64581 34.3243H27.492C31.2093 34.3243 34.2227 31.3108 34.2227 27.5935V8.74737C34.2227 5.03007 31.2093 2.0166 27.492 2.0166Z"
                    fill="#777272"
                  />
                )}
              </svg>
              <label>
                J&apos;accepte les{" "}
                <Link href="#">conditions d&apos;utilisation</Link>{" "}
                de Dourbia
              </label>
            </div> */}
            <div className="terms-checkbox" onClick={() => setAcceptedTerms(!acceptedTerms)}>
              {acceptedTerms ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M13.7714 21.9375L5.604 13.9957L9.29574 10.4059L13.4432 14.4419L25.9617 0L29.9573 3.27069L13.7714 21.9375Z"
                      fill="#C7C2C2"
                    />
                    <path
                      d="M27.4554 9.65261V29.4056H-0.000488281V2.70801H21.6492L18.7937 5.99222H3.37699V26.1095H24.0656V13.5698L27.4554 9.65261Z"
                      fill="#C7C2C2"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="27"
                    viewBox="0 0 28 27"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.37699 15.8499V23.4009H24.0656V10.8612L24.0786 10.8462V3.29518L3.38997 3.29518L3.38997 15.8349L3.37699 15.8499ZM27.4554 26.6966V26.697H-0.000488281V-0.000616963H0.000210349L0.000210349 -0.000976562L27.4561 -0.000973273L27.4561 26.6966H27.4554Z"
                      fill="#C7C2C2"
                    />
                  </svg>
                )}
                <label htmlFor="remember">J&apos;accepte les{" "}
                <Link href="#">conditions d&apos;utilisation</Link>{" "}
                de Dourbia
              </label>
              </div>

            {/* Bouton d'inscription */}
            <button type="submit" className="signup-button">
              S&apos;inscrire
            </button>

            {/* Lien de connexion */}
            <Link href="/sign-in" className="login-link">
              Vous avez déjà un compte?
            </Link>
          </form>
        </div>
      </div>
            {/* Modal Render */}
            {activeModal && (
        <CustomModal
          {...modals[activeModal]}
          onClose={() => setActiveModal(null)}
          onPrimaryClick={handleModalContinue}
        />
      )}
    </main>
  );
}