# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # Start Metro bundler
npm run ios            # Build and run on iOS simulator
npm run android        # Build and run on Android emulator
npm run lint           # Run ESLint
npm test               # Run Jest tests
npm test -- --testPathPattern=<file>  # Run a single test file
```

Before running iOS for the first time or after adding native dependencies:
```bash
cd ios && bundle exec pod install
```

Node >= 22.11.0 is required.

## Architecture

This is a React Native (v0.84) / React 19 TypeScript app — a Gundam card game companion with card browsing, deck management, and an AI chat assistant ("The Conduit").

### Navigation
Bottom tab navigator (React Navigation v7) with three screens: **Cards** (CardBrowserScreen), **Decks** (DeckListScreen / "Command Center"), **Chat** (ChatScreen / "The Conduit").

### Data Layer
- **GraphQL via Apollo Client** (`src/services/apolloClient.ts`) — fetches card data from `http://localhost:8082/graphql` (Android uses `10.0.2.2`)
- **SSE streaming via `react-native-sse`** (`src/services/chatService.ts`, `src/services/sseClient.ts`) — POST to `http://localhost:8080/ask`, streams tokens via Server-Sent Events
- API URLs are centralized in `src/constants/api.ts`

### State Management
No Redux or global Context. Each screen uses a dedicated hook:
- `src/hooks/useCards.ts` — Apollo query + client-side filtering by rarity/color/name
- `src/hooks/useChat.ts` — Chat message state, streaming status, and SSE lifecycle

### Theme
Dark cyberpunk aesthetic. Colors in `src/theme/colors.ts`, typography (SpaceGrotesk + Manrope fonts) in `src/theme/typography.ts`. Use these constants rather than inline styles.

### Types
Core interfaces live in `src/types/`:
- `card.ts` — `Card` interface, `CardFilter` type, `CARD_FILTERS` array
- `chat.ts` — `ChatMessage`, `MessageRole`, `Status` enum (Idle/Loading/Streaming/Error), `ConversationPayload`, `AimuroResponse`
- `deck.ts` — `Deck` interface + `MOCK_DECKS`

### Key Patterns
- Reusable UI primitives in `src/components/`: `GlassPanel`, `FilterTab`, `RarityBadge`, `CardItem`, `DeckCard`, `MessageBubble`
- Screen-level logic stays in hooks; screens handle layout/rendering only
- Deck creation is a stub — `DeckListScreen` shows mock data from `MOCK_DECKS`
- Chat streams tokens into a placeholder assistant message; `Status` enum drives UI state
