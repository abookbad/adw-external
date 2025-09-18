import { getApps, initializeApp, cert, getApp, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

type ServiceAccountShape = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

function parseServiceAccountFromEnv(): ServiceAccountShape | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (raw) {
    try {
      const jsonStr = /^[A-Za-z0-9+/=]+$/.test(raw.trim()) ? Buffer.from(raw, 'base64').toString('utf8') : raw;
      const obj = JSON.parse(jsonStr);
      const projectId = obj.project_id || obj.projectId;
      const clientEmail = obj.client_email || obj.clientEmail;
      let privateKey = obj.private_key || obj.privateKey;
      if (typeof privateKey === 'string') privateKey = privateKey.replace(/\\n/g, '\n');
      if (projectId && clientEmail && privateKey) {
        return { projectId, clientEmail, privateKey };
      }
    } catch {}
  }
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (typeof privateKey === 'string') privateKey = privateKey.replace(/\\n/g, '\n');
  if (projectId && clientEmail && privateKey) {
    return { projectId, clientEmail, privateKey } as ServiceAccountShape;
  }
  return null;
}

let cachedApp: App | null = null;

export function getAdminApp(): App {
  if (cachedApp) return cachedApp;
  if (getApps().length) {
    cachedApp = getApp();
    return cachedApp;
  }

  const sa = parseServiceAccountFromEnv();
  if (!sa) {
    // Defer throwing a clear error until first actual use instead of during module import
    throw new Error('Firebase Admin credentials are missing. Set FIREBASE_SERVICE_ACCOUNT (JSON or base64) or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.');
  }

  cachedApp = initializeApp({ credential: cert(sa as any) });
  return cachedApp;
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}


