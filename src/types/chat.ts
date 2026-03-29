export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
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
}