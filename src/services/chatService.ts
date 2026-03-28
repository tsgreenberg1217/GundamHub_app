import axios from 'axios';
import { CHAT_URL } from '../constants/api';
import type { ChatMessagePayload } from '../types/chat';

export async function sendChatMessage(
  history: ChatMessagePayload[],
): Promise<string> {
  const response = await axios.post<string>(CHAT_URL, history, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
