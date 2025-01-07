"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  const { sessionClaims, userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({ title: "New Document" });

  if (sessionClaims.email) {
    await adminDb
      .collection("user")
      .doc(sessionClaims.email!)
      .collection("rooms")
      .doc(docRef.id)
      .set({
        userId: sessionClaims.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id,
      });
  }

  return docRef.id;
}

export async function deleteDocument(roomId: string) {
  const { sessionClaims, userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();

    //delete the room  reference in the users collection for every user who were in the room
    query.docs.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();
    await liveblocks.deleteRoom(roomId);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function inviteUserToDoc(roomId: string, email: string) {
  const { sessionClaims, userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    await adminDb
      .collection("user")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({ userId: email, role: "editor", createdAt: new Date(), roomId });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  const { sessionClaims, userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    await adminDb
      .collection("user")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}
