export type MessageRole = 'user' | 'assistant';

export const Status = Object.freeze({
  Idle:      'IDLE',
  Loading:   'LOADING',
  Streaming: 'STREAMING',
  Error:     'ERROR',
} as const);

export type StatusValue = typeof Status[keyof typeof Status];

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  isStreaming?: boolean;
  // timestamp: Date;
}

export interface ConversationPayload {
  conversation: ChatMessagePayload[];
}
export interface ChatMessagePayload {
  role: MessageRole;
  content: string;
}

export interface AimuroResponse {
  answer: string;
  isComplete: boolean;
}