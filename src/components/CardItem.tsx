import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import type { Card } from '../types/card';
import { RarityBadge } from './RarityBadge';
import { Colors } from '../theme/colors';
import { Fonts, FontSizes } from '../theme/typography';

const COLUMN_GAP = 10;
const HORIZONTAL_PADDING = 16;

interface CardItemProps {
  card: Card;
}

export function CardItem({ card }: CardItemProps) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - HORIZONTAL_PADDING * 2 - COLUMN_GAP) / 2;

  return (
    <View style={[styles.container, { width: cardWidth }]}>
      {card.imageSmall ? (
        <Image
          source={{ uri: card.imageSmall }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.badgeWrapper}>
        <RarityBadge rarity={card.rarity} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {card.name}
        </Text>
        <View style={styles.stats}>
          {card.ap != null && (
            <View style={styles.statChip}>
              <Text style={styles.statLabel}>AP</Text>
              <Text style={[styles.statValue, { color: Colors.primary }]}>
                {card.ap}
              </Text>
            </View>
          )}
          {card.hp != null && (
            <View style={styles.statChip}>
              <Text style={styles.statLabel}>HP</Text>
              <Text style={[styles.statValue, { color: Colors.textMuted }]}>
                {card.hp}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: COLUMN_GAP,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: Colors.surface3,
  },
  badgeWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  info: {
    padding: 8,
  },
  name: {
    fontFamily: Fonts.bodyBold,
    fontSize: FontSizes.sm,
    color: Colors.text,
    marginBottom: 4,
  },
  stats: {
    flexDirection: 'row',
    gap: 6,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  statLabel: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  statValue: {
    fontFamily: Fonts.bodyBold,
    fontSize: FontSizes.xs,
  },
});
