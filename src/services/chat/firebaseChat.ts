import type { Database } from "firebase/database";
import type { ChatMessage, Role } from "../../types";
import { getFirebaseApp, isFirebaseConfigured } from "../firebase/client";

export const isChatConfigured = isFirebaseConfigured;
async function databaseOrNull(): Promise<Database | null> {
  if (!isFirebaseConfigured) return null;
  const { getDatabase } = await import("firebase/database");
  return getDatabase(getFirebaseApp());
}
export async function subscribeToChat(
  requestId: string,
  onMessages: (messages: ChatMessage[]) => void,
  onError: (error: Error) => void,
) {
  const database = await databaseOrNull();
  if (!database) return () => undefined;
  const { onValue, ref } = await import("firebase/database");
  return onValue(
    ref(database, `messages/${requestId}`),
    (snapshot) => {
      const value = snapshot.val() as Record<
        string,
        Omit<ChatMessage, "id">
      > | null;
      const messages = Object.entries(value ?? {}).map(([id, message]) => ({
        ...message,
        id,
        requestId: message.requestId ?? requestId,
      }));
      messages.sort((a, b) => a.createdAt - b.createdAt);
      onMessages(messages);
    },
    onError,
  );
}
export async function sendChatMessage(input: {
  requestId: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  text: string;
}) {
  const database = await databaseOrNull();
  if (!database)
    throw new Error("Firebase Realtime Database is not configured.");
  const { ref, set } = await import("firebase/database");
  const id = `msg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  const message: ChatMessage = {
    id,
    requestId: input.requestId,
    senderId: input.senderId,
    senderName: input.senderName,
    senderRole: input.senderRole,
    text: input.text.trim(),
    createdAt: Date.now(),
  };
  const { id: _id, ...payload } = message;
  await set(ref(database, `messages/${input.requestId}/${id}`), payload);
  return message;
}
