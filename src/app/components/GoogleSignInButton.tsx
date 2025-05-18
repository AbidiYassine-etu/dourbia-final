import { FcGoogle } from 'react-icons/fc';

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    // Redirect the user to your NestJS backend Google OAuth route
    window.location.href = 'http://localhost:8000/auth/google';
  };

  return (
    <button type="button" onClick={handleGoogleSignIn} className="google-button">
      <FcGoogle size={20} />
      Google
    </button>
  );
};

export default GoogleSignInButton;
