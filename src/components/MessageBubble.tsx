import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ChatMessage } from '../types/chat';
import { Colors } from '../theme/colors';
import { Fonts, FontSizes } from '../theme/typography';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowAssistant]}>
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleAssistant,
        ]}>
        <Text style={[styles.text, isUser ? styles.textUser : styles.textAssistant]}>
          {message.content}{message.isStreaming ? '▌' : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  rowUser: {
    alignItems: 'flex-end',
  },
  rowAssistant: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 4,
  },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 0,
  },
  bubbleAssistant: {
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
    borderBottomLeftRadius: 0,
  },
  text: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.md,
    lineHeight: 22,
  },
  textUser: {
    color: Colors.background,
  },
  textAssistant: {
    color: Colors.text,
  },
});
