import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatMessage, ChatMessagePayload, ConversationPayload } from '../types/chat';
import { createChatStream } from '../services/chatService';
import type { SSEClient } from '../services/sseClient';

function makeId(): string {
  return Math.random().toString(36).slice(2);
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<SSEClient | null>(null);

  useEffect(() => {
    return () => {
      clientRef.current?.close();
    };
  }, []);

  const send = useCallback(
    (text: string) => {
      if (!text.trim() || sending) {
        return;
      }

      clientRef.current?.close();
      clientRef.current = null;

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

      const assistantId = makeId();
      setMessages(prev => [
        ...prev,
        { id: assistantId, role: 'assistant', content: '', isStreaming: true },
      ]);

      const finalize = () => {
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId ? { ...m, isStreaming: false } : m,
          ),
        );
        setSending(false);
        clientRef.current = null;
      };

      clientRef.current = createChatStream(
        { conversation } as ConversationPayload,
        token => {
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId ? { ...m, content: m.content + token } : m,
            ),
          );
        },
        errorMessage => {
          setError(errorMessage);
          setMessages(prev => prev.filter(m => m.id !== assistantId));
          finalize();
        },
        finalize,
      );
    },
    [messages, sending],
  );

  return { messages, sending, error, send };
}
