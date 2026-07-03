import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, enableNetwork } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore with offline persistence
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

// Ensure network is enabled after initialization
// This prevents Firebase from staying in offline mode
// Especially important for localhost development
if (typeof window !== 'undefined') {
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname === '';
  
  // For localhost, be more aggressive about enabling network
  const ensureNetworkEnabled = async () => {
    try {
      await enableNetwork(db);
      if (isLocalhost) {
        console.debug('Firebase network enabled (localhost mode)');
      }
    } catch (error) {
      // Silently handle - network might already be enabled
      if (isLocalhost && error.code !== 'failed-precondition') {
        console.debug('Network enable attempt:', error.message);
      }
    }
  };
  
  // Initial enable
  ensureNetworkEnabled();
  
  // For localhost, retry more aggressively
  if (isLocalhost) {
    // Retry after a short delay to ensure network is enabled
    setTimeout(() => {
      ensureNetworkEnabled();
    }, 1000);
    
    // Also retry after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(ensureNetworkEnabled, 500);
      });
    }
  }
  
  // Monitor online/offline events and sync Firebase network state
  window.addEventListener('online', () => {
    ensureNetworkEnabled();
  });
  
  // For localhost, also check periodically
  if (isLocalhost) {
    setInterval(() => {
      if (navigator.onLine) {
        ensureNetworkEnabled();
      }
    }, 5000); // Check every 5 seconds on localhost
  }
}

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;

