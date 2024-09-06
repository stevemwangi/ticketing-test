import { db } from "@/app/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";



export const createUserDocument = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { email, displayName, photoURL } = user;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        uid: user.uid,
        email,
        displayName: displayName || 'Anonymous',
        photoURL: photoURL || null,
        createdAt,
        role: 'user', // Default role
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
};