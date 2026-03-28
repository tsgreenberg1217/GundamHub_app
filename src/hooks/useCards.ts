import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client/core';
import type { Card, CardFilter } from '../types/card';

const CARDS_QUERY = gql`
  query Cards {
    cards(filter: null) {
      id
      code
      rarity
      name
      effect
      level
      cost
      color
      cardType
      zone
      trait
      link
      ap
      hp
      sourceTitle
      getIt
      imageSmall
      imageLarge
    }
  }
`;

export function useCards(activeFilter: CardFilter) {
  const { data, loading, error, refetch } = useQuery<{ cards: Card[] }>(
    CARDS_QUERY,
  );

  const filteredCards = useMemo(() => {
    if (!data?.cards) {
      return [];
    }
    if (activeFilter === 'All') {
      return data.cards;
    }
    if (activeFilter === 'Legendary' || activeFilter === 'Rare') {
      return data.cards.filter((c: Card) => c.rarity === activeFilter);
    }
    return data.cards.filter((c: Card) => c.color === activeFilter);
  }, [data, activeFilter]);

  return { cards: filteredCards, loading, error, refetch };
}
