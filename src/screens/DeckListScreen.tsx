import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DeckCard } from '../components/DeckCard';
import { MOCK_DECKS } from '../types/deck';
import { Colors } from '../theme/colors';
import { Fonts, FontSizes } from '../theme/typography';

export function DeckListScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>COMMAND CENTER</Text>
      </View>

      {/* New Deck button */}
      <View style={styles.actionRow}>
        <Pressable
          style={styles.newDeckButton}
          onPress={() => Alert.alert('Coming soon')}>
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={18}
            color={Colors.secondary}
          />
          <Text style={styles.newDeckLabel}>New Deck</Text>
        </Pressable>
      </View>

      {/* Deck list */}
      <FlatList
        data={MOCK_DECKS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <DeckCard deck={item} />}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 16 },
        ]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    fontFamily: Fonts.headline,
    fontSize: FontSizes.xl,
    color: Colors.text,
    letterSpacing: 1,
  },
  actionRow: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    alignItems: 'flex-start',
  },
  newDeckButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  newDeckLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: FontSizes.sm,
    color: Colors.secondary,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  separator: {
    height: 10,
  },
});
