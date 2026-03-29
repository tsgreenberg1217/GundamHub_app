import { CHAT_URL } from '../constants/api';
import type { AimuroResponse, ConversationPayload } from '../types/chat';
import { SSEClient } from './sseClient';

export function createChatStream(
  history: ConversationPayload,
  onToken: (token: string) => void,
  onError: (message: string) => void,
  onDone: () => void,
): SSEClient {
  return new SSEClient(
    {
      url: CHAT_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify(history),
    },
    rawData => {
      try {
        const parsed: AimuroResponse = JSON.parse(rawData);
        onToken(parsed.answer);
      } catch {
        // Malformed SSE frame — skip
      }
    },
    () => onError('Failed to reach The Conduit. Check your connection.'),
    onDone,
  );
}
