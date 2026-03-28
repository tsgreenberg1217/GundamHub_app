export interface Card {
  id: string;
  code: string;
  rarity: string;
  name: string;
  effect: string | null;
  level: number | null;
  cost: number | null;
  color: string | null;
  cardType: string | null;
  zone: string | null;
  trait: string | null;
  link: string | null;
  ap: number | null;
  hp: number | null;
  sourceTitle: string | null;
  getIt: string | null;
  imageSmall: string | null;
  imageLarge: string | null;
}

export type CardFilter = 'All' | 'Legendary' | 'Void' | 'Electric' | 'Rare';

export const CARD_FILTERS: CardFilter[] = [
  'All',
  'Legendary',
  'Void',
  'Electric',
  'Rare',
];
