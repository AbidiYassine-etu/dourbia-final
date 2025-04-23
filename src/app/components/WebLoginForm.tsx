"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/app/style/login.css";
import { FcGoogle } from 'react-icons/fc';


export default function SignInForm() {
  // États pour gérer le formulaire
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleGoogleSignIn = () => {

    window.location.href = 'http://localhost:8000/auth/google';
  };

  return (
    <main className="maincontainer">
      {/* Message de succès */}
      {showSuccess && (
        <div className="success-message">
          Enregistrement réussi !
        </div>
      )}

      {/* Partie Gauche - Image */}
      <div className="leftpanel">
        <div className="imagecontainer">
          <Image
            src="/img/image11.png"
            alt="Background Dourbia"
            layout="fill"
            objectFit="cover"
            className="backgroundimage"
          />
          <div className="overlay">
            <div className="logo-position1">
              <Image
                src="/img/logo1.png"
                alt="Logo Dourbia"
                width={340}
                height={210}
                className="main-logo"
              />
            </div>
            <h1 className="title-text1">
              ACCÉDEZ À <br />
              <span>DOURBIA !</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="spacer"></div>
      {/* Partie Droite - Formulaire */}
      <div className="rightpanel">
        <Image
          src="/img/logo4.png"
          alt="Logo Dourbia"
          width={103}
          height={94}
          className="logo"
        />
        <div className="formcontainer">

          <form className="authform">
            {/* Input Email */}
            <div className="inputgroup emailinput">
              <input
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="forminput"
                required
              />
            </div>

            {/* Input Mot de passe */}
            <div className="inputgroup passwordinput">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="forminput"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="passwordtoggle"
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

            {/* Checkbox Se rappeler */}
            {/* <div className="rememberme" onClick={() => setRememberMe(!rememberMe)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
              >
                <path
                  d="M27.1699 10.4524V29.9997H0V3.58008H21.4242L18.5984 6.83009H3.34231V26.7379H23.8155V14.3287L27.1699 10.4524Z"
                  fill="#C7C2C2"
                />
                {rememberMe && (
                  <path
                    d="M14.7716 21.9375L6.60425 13.9957L10.296 10.4059L14.4435 14.4419L26.9619 0L30.9575 3.27069L14.7716 21.9375Z"
                    fill="#C7C2C2"
                  />
                )}
              </svg>
              <label htmlFor="remember">Se rappeler de moi ?</label>
            </div> */}
            <div className="rememberme" onClick={() => setRememberMe(!rememberMe)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="27"
                viewBox="0 0 31 30"
                fill="none"
              >
                <path
                  d="M1 1H30V29H1V1Z"
                  fill="#fff"
                  stroke="#C7C2C2"
                  strokeWidth="2"
                />
                {rememberMe && (
                  <path
                    d="M7 15L13 21L24 8"
                    stroke="#C7C2C2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
              <label htmlFor="remember">Se rappeler de moi ?</label>
            </div>
            {/* Bouton Se Connecter */}
            <button type="submit" className="loginbutton">
              Se Connecter
            </button>
            {/* Mot de passe oublié */}
            <div className="forgotpassword">
              <Link href="/email-page">
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="separator">
              <div className="separator-line"></div>
              <span>OU</span>
              <div className="separator-line"></div>
            </div>
            {/* Bouton Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="google-button"
            >
              <FcGoogle size={20} />
              Google
            </button>

            {/* Créer un compte */}
            <div className="createaccount">
              <p>Vous n&apos;êtes pas un membre?</p>
              <Link href="/sign-up">
                Créer un compte
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}