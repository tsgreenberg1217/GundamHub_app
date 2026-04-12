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
        <View style={[
          styles.bubbleOuter,
          isUser ? styles.bubbleUserOuter : styles.bubbleAssistantOuter,
        ]}>
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
  bubbleOuter: {
    maxWidth: '80%',
    borderRadius: 14,
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  bubbleUserOuter: {
    paddingRight: 1,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 0,
  },
  bubbleAssistantOuter: {
    paddingLeft: 1,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 0,
  },
  bubbleUser: {
    backgroundColor: Colors.surface2,
    borderTopRightRadius: 0,
  },
  bubbleAssistant: {
    backgroundColor: Colors.surface2,
    borderTopLeftRadius: 0,
  },
  text: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.md,
    lineHeight: 22,
  },
  textUser: {
    color: Colors.text,
  },
  textAssistant: {
    color: Colors.text,
  },
});
