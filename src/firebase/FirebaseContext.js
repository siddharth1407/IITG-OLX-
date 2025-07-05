import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCustomToken
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; // Added doc, setDoc, getDoc

// --- Firebase Context ---
const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
    const [app, setApp] = useState(null);
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userProfile, setUserProfile] = useState(null); // New state for user profile
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        try {
            // Firebase configuration and initialization
            const firebaseConfig = process.env.REACT_APP_FIREBASE_CONFIG ? JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG) : {};
            const initializedApp = initializeApp(firebaseConfig);
            const initializedAuth = getAuth(initializedApp);
            const initializedDb = getFirestore(initializedApp);

            setApp(initializedApp);
            setAuth(initializedAuth);
            setDb(initializedDb);

            // Auth state change listener
            const unsubscribe = onAuthStateChanged(initializedAuth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                    console.log("User authenticated:", user.uid);
                    // Fetch user profile when authenticated
                    const profile = await getUserProfile(user.uid, initializedDb);
                    setUserProfile(profile);
                } else {
                    setUserId(null);
                    setUserProfile(null); // Clear profile on sign out
                    console.log("User not authenticated.");
                }
                setIsAuthReady(true);
            });

            // Attempt custom token sign-in only if token is present (for Canvas environment)
            const initialAuthToken = process.env.REACT_APP_INITIAL_AUTH_TOKEN || null;
            if (initialAuthToken && !initializedAuth.currentUser) {
                signInWithCustomToken(initializedAuth, initialAuthToken)
                    .then(() => console.log("Signed in with custom token (Canvas)"))
                    .catch((error) => console.error("Error signing in with custom token:", error));
            }

            return () => unsubscribe(); // Cleanup listener on unmount
        } catch (error) {
            console.error("Failed to initialize Firebase:", error);
        }
    }, []);

    // Helper function to get user profile (can be called internally or exposed)
    const getUserProfile = async (uid, firestoreDb) => {
        const appId = process.env.REACT_APP_APP_ID || 'default-app-id';
        const profileDocRef = doc(firestoreDb, `artifacts/${appId}/users/${uid}/profile/data`);
        try {
            const docSnap = await getDoc(profileDocRef);
            if (docSnap.exists()) {
                console.log("User profile fetched:", docSnap.data());
                return docSnap.data();
            } else {
                console.log("No user profile found for:", uid);
                return null;
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            return null;
        }
    };

    // Function to create/update user profile
    const createUserProfile = async (uid, profileData) => {
        if (!db) throw new Error("Firestore not initialized.");
        const appId = process.env.REACT_APP_APP_ID || 'default-app-id';
        const profileDocRef = doc(db, `artifacts/${appId}/users/${uid}/profile/data`);
        try {
            await setDoc(profileDocRef, profileData, { merge: true }); // Use merge: true to update existing fields or create new
            setUserProfile(profileData); // Update local state
            console.log("User profile created/updated for:", uid);
        } catch (error) {
            console.error("Error creating/updating user profile:", error);
            throw error;
        }
    };

    // Function to handle Email/Password Sign Up
    const signUpWithEmail = async (email, password) => {
        if (!auth || !db) throw new Error("Firebase Auth or Firestore not initialized.");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            console.log("User signed up:", uid);

            // Create initial profile for new user
            const initialProfile = {
                name: email.split('@')[0], // Default name from email
                email: email,
                hostel: '',
                department: '',
                contactPhone: '',
                bio: '',
                createdAt: new Date().toISOString()
            };
            await createUserProfile(uid, initialProfile); // Use the new function

            return userCredential.user;
        } catch (error) {
            console.error("Error during sign up:", error);
            throw error;
        }
    };

    // Function to handle Email/Password Sign In
    const signInWithEmail = async (email, password) => {
        if (!auth || !db) throw new Error("Firebase Auth or Firestore not initialized.");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            console.log("User signed in:", uid);

            // Fetch profile on sign-in (already handled by onAuthStateChanged, but good to ensure)
            const profile = await getUserProfile(uid, db);
            if (!profile) {
                // If somehow profile doesn't exist for an existing user, create a basic one
                const initialProfile = {
                    name: email.split('@')[0],
                    email: email,
                    hostel: '',
                    department: '',
                    contactPhone: '',
                    bio: '',
                    createdAt: new Date().toISOString()
                };
                await createUserProfile(uid, initialProfile);
            }

            return userCredential.user;
        } catch (error) {
            console.error("Error during sign in:", error);
            throw error;
        }
    };

    return (
        <FirebaseContext.Provider value={{ app, db, auth, userId, userProfile, isAuthReady, signUpWithEmail, signInWithEmail, createUserProfile, getUserProfile }}>
            {children}
        </FirebaseContext.Provider> /* Fixed: Changed </FirebaseContext.Context> to </FirebaseContext.Provider> */
    );
};

// --- Custom Hook to use Firebase Context ---
export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};
