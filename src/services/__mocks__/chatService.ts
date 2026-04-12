import type { ConversationPayload } from '../../types/chat';

const MOCK_RESPONSE =
  "The Aerial's Permet score allows her to access Vanadis information. " +
  "In battle, the GUND-ARM system converts physical damage into data. " +
  "Her AP stat reflects strike power while HP represents unit endurance. " +
  "Pair her with a Command card to boost her Zone coverage on your next turn.";

export function createChatStream(
  _history: ConversationPayload,
  onToken: (token: string) => void,
  _onError: (message: string) => void,
  onDone: () => void,
) {
  const words = MOCK_RESPONSE.split(' ');
  let index = 0;
  let closed = false;
  let intervalHandle: ReturnType<typeof setInterval> | number;

  const startTimer = setTimeout(() => {
    if (closed) { return; }
    intervalHandle = setInterval(() => {
      if (closed) { clearInterval(intervalHandle); return; }
      if (index < words.length) {
        onToken(index === 0 ? words[index] : ' ' + words[index]);
        index++;
      } else {
        clearInterval(intervalHandle);
        onDone();
      }
    }, 80);
  }, 2000);

  return {
    close() {
      closed = true;
      clearTimeout(startTimer);
      if (intervalHandle) { clearInterval(intervalHandle); }
    },
  };
}
