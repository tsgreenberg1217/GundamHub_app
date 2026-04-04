import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatMessage, ChatMessagePayload, ConversationPayload, StatusValue } from '../types/chat';
import { Status } from '../types/chat';
import { createChatStream } from '../services/chatService';
import type { SSEClient } from '../services/sseClient';

function makeId(): string {
  return Math.random().toString(36).slice(2);
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<StatusValue>(Status.Idle);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const clientRef = useRef<SSEClient | null>(null);

  useEffect(() => {
    return () => {
      clientRef.current?.close();
    };
  }, []);

  const send = useCallback(
    (text: string) => {
      console.log("Sending", text);
      if (!text.trim() || status === Status.Loading || status === Status.Streaming) {
        return;
      }
      console.log("Passed the gaurd block");

      clientRef.current?.close();
      clientRef.current = null;

      const userMsg: ChatMessage = {
        id: makeId(),
        role: 'user',
        content: text.trim(),
      };

      setMessages(prev => [...prev, userMsg]);
      setStatus(Status.Loading);
      setErrorMessage(null);

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
        console.log("finalizing")
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId ? { ...m, isStreaming: false } : m,
          ),
        );
        console.log("setting idle")
        setStatus(Status.Idle);
        clientRef.current = null;
      };

      clientRef.current = createChatStream(
        { conversation } as ConversationPayload,
        token => {
          setStatus(prev => prev === Status.Loading ? Status.Streaming : prev);
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId ? { ...m, content: m.content + token } : m,
            ),
          );
        },
        msg => {
          setErrorMessage(msg);
          setStatus(Status.Error);
          setMessages(prev => prev.filter(m => m.id !== assistantId));
          clientRef.current = null;
        },
        finalize,
      );
    },
    [messages, status],
  );

  return { messages, status, errorMessage, send };
}
