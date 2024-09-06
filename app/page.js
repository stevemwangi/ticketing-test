"use client"

import { useEffect } from 'react';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Auth from './components/auth';
import { useRouter } from "next/navigation"
const auth = getAuth();
 

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, []);

  return <Auth />;
}