import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useChat } from '../hooks/useChat';
import { MessageBubble } from '../components/MessageBubble';
import type { ChatMessage } from '../types/chat';
import { Status } from '../types/chat';
import { Colors } from '../theme/colors';
import { Fonts, FontSizes } from '../theme/typography';

export function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { messages, status, errorMessage, send } = useChat();
  const isActive = status === Status.Loading || status === Status.Streaming;
  const [inputText, setInputText] = useState('');
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const handleSend = async () => {
    console.log("Sending chat");
    const text = inputText;
    setInputText('');
    await send(text);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>THE CONDUIT</Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isActive ? '#f39c12' : Colors.primary },
              ]}
            />
            <Text style={styles.statusLabel}>
              {isActive ? 'Processing...' : 'Online'}
            </Text>
          </View>
        </View>

        {/* Message list */}
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={[styles.listContent, { flexGrow: 1 }]}
          onContentSizeChange={() =>
            listRef.current?.scrollToOffset({ offset: Infinity, animated: true })
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="forum-outline"
                size={40}
                color={Colors.surface3}
              />
              <Text style={styles.emptyText}>
                Ask anything about Gundam Card Game rules, cards, or strategy.
              </Text>
            </View>
          }
        />

        {/* Error banner */}
        {status === Status.Error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {/* Input row */}
        <View
          style={[
            styles.inputRow,
            { paddingBottom: insets.bottom + 8 },
          ]}>
          <TextInput
            style={styles.input}
            placeholder="Ask AiMuro..."
            placeholderTextColor={Colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            editable={!isActive}
            multiline={false}
          />
          <Pressable
            style={[
              styles.sendButton,
              (!inputText.trim() || isActive) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() || isActive}>
            {isActive ? (
              <ActivityIndicator size="small" color={Colors.background} />
            ) : (
              <MaterialCommunityIcons
                name="send"
                size={18}
                color={Colors.background}
              />
            )}
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.headline,
    fontSize: FontSizes.xl,
    color: Colors.primary,
    letterSpacing: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 100,
  },
  statusLabel: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
    gap: 16,
  },
  emptyText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.md,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  errorBanner: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(255,113,108,0.15)',
    borderWidth: 1,
    borderColor: '#ff716c',
  },
  errorText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: '#ff716c',
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: Colors.text,
    fontFamily: Fonts.body,
    fontSize: FontSizes.md,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
});
