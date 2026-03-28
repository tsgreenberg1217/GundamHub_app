import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import type { Deck } from '../types/deck';
import { Colors } from '../theme/colors';
import { Fonts, FontSizes } from '../theme/typography';

interface DeckCardProps {
  deck: Deck;
}

export function DeckCard({ deck }: DeckCardProps) {
  const winPct = Math.round(deck.winRate * 100);

  return (
    <View style={styles.container}>
      <View style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.name}>{deck.name}</Text>
        <Text style={styles.archetype}>{deck.archetype}</Text>
        <Text style={styles.record}>
          {deck.wins}W — {deck.losses}L
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.winRate}>{winPct}%</Text>
        <Pressable
          style={styles.editButton}
          onPress={() => Alert.alert('Coming soon')}>
          <Text style={styles.editLabel}>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    gap: 12,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 4,
    backgroundColor: Colors.surface3,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: Fonts.headline,
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  archetype: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  record: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 8,
  },
  winRate: {
    fontFamily: Fonts.headline,
    fontSize: FontSizes.lg,
    color: Colors.primary,
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  editLabel: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    color: Colors.secondary,
  },
});
