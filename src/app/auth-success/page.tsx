'use client';

import { useEffect } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/navigation';

export default function AuthSuccess() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Authentication failed');
      })
      .then(() => {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true); // Update context immediately
        router.replace('/profile?authSuccess=true');
      })
      .catch(() => {
        router.replace('/auth-error');
      });
  }, [router, setIsLoggedIn]);

  return <p>Connexion en cours...</p>;
}