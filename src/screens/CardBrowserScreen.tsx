import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCards } from '../hooks/useCards';
import { CardItem } from '../components/CardItem';
import { FilterTab } from '../components/FilterTab';
import type { CardFilter } from '../types/card';
import { CARD_FILTERS } from '../types/card';
import { Colors } from '../theme/colors';
import { Fonts, FontSizes } from '../theme/typography';
import { AiMuroBot } from '../components/AiMuroBot.tsx';

const HORIZONTAL_PADDING = 16;
const COLUMN_GAP = 10;

export function CardBrowserScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<CardFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const { cards, loading, error, refetch } = useCards(activeFilter);

  const displayedCards = useMemo(() => {
    if (!searchQuery.trim()) {
      return cards;
    }
    const q = searchQuery.toLowerCase();
    return cards.filter(c => c.name.toLowerCase().includes(q));
  }, [cards, searchQuery]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>NEON CONDUIT</Text>
        <View
        // style={styles.headerIcons}
        >
          <Pressable
            onPress={() => setShowSearch(v => !v)}
            hitSlop={8}
            style={styles.iconButton}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={22}
              color={showSearch ? Colors.primary : Colors.textMuted}
            />
          </Pressable>
        </View>
      </View>

      {/* Search bar */}
      {showSearch && (
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search cards..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      )}

      {/* Filter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {CARD_FILTERS.map(f => (
          <FilterTab
            key={f}
            label={f}
            active={activeFilter === f}
            onPress={() => setActiveFilter(f)}
          />
        ))}
      </ScrollView>

      {/* Content */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Failed to load cards.</Text>
          <Pressable onPress={() => refetch()} style={styles.retryButton}>
            <Text style={styles.retryLabel}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={displayedCards}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 16 },
          ]}
          renderItem={({ item }) => <CardItem card={item} />}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No cards found.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: 14,
  },
  logo: {
    fontFamily: Fonts.headline,
    fontSize: FontSizes.xl,
    color: Colors.primary,
    letterSpacing: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  searchWrapper: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: Colors.surface2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: Colors.text,
    fontFamily: Fonts.body,
    fontSize: FontSizes.md,
  },
  filterRow: {
    paddingHorizontal: HORIZONTAL_PADDING,
    alignItems: 'flex-start',
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: 16
  },
  columnWrapper: {
    gap: COLUMN_GAP,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  errorText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.md,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  retryLabel: {
    fontFamily: Fonts.headline,
    fontSize: FontSizes.sm,
    color: Colors.background,
  },
  emptyText: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.md,
    color: Colors.textMuted,
  },
});
