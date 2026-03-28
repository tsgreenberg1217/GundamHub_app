import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Fonts, FontSizes } from '../theme/typography';

interface FilterTabProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export function FilterTab({ label, active, onPress }: FilterTabProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={[styles.tab, active ? styles.tabActive : styles.tabInactive]}>
      <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 4,
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  tabInactive: {
    backgroundColor: Colors.surface2,
  },
  label: {
    fontFamily: Fonts.headline,
    fontSize: FontSizes.sm,
  },
  labelActive: {
    color: Colors.background,
  },
  labelInactive: {
    color: Colors.textMuted,
  },
});
