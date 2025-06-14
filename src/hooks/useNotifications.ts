// src/hooks/useNotifications.ts
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

export interface Notification {
  id: string;
  userId: string;
  from: string;
  type: string;
  timestamp: any;
  read: boolean;
}

export const useNotifications = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Notification, "id">;
        return {
          id: doc.id,
          ...data,
        };
      });

      setNotifications(notifs);
    });

    return () => unsubscribe();
  }, [userId]);

  const markAsRead = async (id: string) => {
    const ref = doc(db, "notifications", id);
    await updateDoc(ref, { read: true });
  };

  return { notifications, markAsRead };
};
