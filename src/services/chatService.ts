import axios from 'axios';
import { CHAT_URL } from '../constants/api';
import type { AimuroResponse, ConversationPayload } from '../types/chat';

export async function sendChatMessage(
  history: ConversationPayload,
): Promise<AimuroResponse> {
  const response = await axios.post<AimuroResponse>(CHAT_URL, history, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
