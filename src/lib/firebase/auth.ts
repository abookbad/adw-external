"use client";

import { auth, googleProvider } from './client';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

export const emailSignIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const emailRegister = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const googleSignIn = () => signInWithPopup(auth, googleProvider);

export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

export const logout = () => signOut(auth);

export const subscribeToAuth = (cb: (u: User | null) => void) => onAuthStateChanged(auth, cb);


