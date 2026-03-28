import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Fonts, FontSizes } from '../theme/typography';

interface RarityBadgeProps {
  rarity: string;
}

function getRarityColor(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case 'legendary':
      return Colors.legendary;
    case 'rare':
      return Colors.rare;
    case 'electric':
      return Colors.electric;
    case 'void':
      return Colors.void;
    default:
      return Colors.common;
  }
}

export function RarityBadge({ rarity }: RarityBadgeProps) {
  const color = getRarityColor(rarity);
  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{rarity.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  text: {
    fontFamily: Fonts.headline,
    fontSize: FontSizes.xs,
    letterSpacing: 0.5,
  },
});
