import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { Colors } from '../theme/colors';

interface GlassPanelProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function GlassPanel({ children, style }: GlassPanelProps) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
  },
});
