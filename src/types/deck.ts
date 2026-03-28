export interface Deck {
  id: string;
  name: string;
  archetype: string;
  thumbnailUri: string | null;
  wins: number;
  losses: number;
  winRate: number;
}

export const MOCK_DECKS: Deck[] = [
  {
    id: '1',
    name: 'Zeon Rush',
    archetype: 'Aggro',
    thumbnailUri: null,
    wins: 34,
    losses: 12,
    winRate: 0.739,
  },
  {
    id: '2',
    name: 'Federation Control',
    archetype: 'Control',
    thumbnailUri: null,
    wins: 28,
    losses: 18,
    winRate: 0.609,
  },
  {
    id: '3',
    name: 'Newtype Combo',
    archetype: 'Combo',
    thumbnailUri: null,
    wins: 41,
    losses: 9,
    winRate: 0.82,
  },
];
