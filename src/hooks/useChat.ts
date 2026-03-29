import { useState, useCallback } from 'react';
import {
  AimuroResponse,
  ChatMessage,
  ChatMessagePayload,
  ConversationPayload,
} from '../types/chat';
import { sendChatMessage } from '../services/chatService';

function makeId(): string {
  return Math.random().toString(36).slice(2);
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || sending) {
        return;
      }

      const userMsg: ChatMessage = {
        id: makeId(),
        role: 'user',
        content: text.trim(),
      };

      setMessages(prev => [...prev, userMsg]);
      setSending(true);
      setError(null);

      const conversation: ChatMessagePayload[] = [...messages, userMsg].map(
        m => ({
          role: m.role,
          content: m.content,
        }),
      );
      try {
        const reply: AimuroResponse = await sendChatMessage({ conversation });
        console.log("reply is: ", reply);
        const assistantMsg: ChatMessage = {
          id: makeId(),
          role: 'assistant',
          content: reply.answer,
          // timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMsg]);
      } catch {
        setError('Failed to reach The Conduit. Check your connection.');
      } finally {
        setSending(false);
      }
    },
    [messages, sending],
  );

  return { messages, sending, error, send };
}
