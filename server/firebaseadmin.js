// server/firebaseAdmin.js
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Support __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

if (process.env.FIREBASE_KEY_BASE64) {
  console.log('🔥 Using Firebase credentials from environment');
  const decoded = Buffer.from(process.env.FIREBASE_KEY_BASE64, 'base64').toString('utf-8');
  serviceAccount = JSON.parse(decoded);
} else {
  console.log('🧪 Using local serviceAccountKey.json');
  const keyPath = path.resolve(__dirname, './serviceAccountKey.json');
  serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));
}

// Only initialize once (important for hot reload or testing)
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();
export default db;