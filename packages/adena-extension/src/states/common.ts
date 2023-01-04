import { atom } from 'recoil';

interface HistoryPosition {
  position: number;
}

export const historyPosition = atom<HistoryPosition>({
  key: `common/history-position`,
  default: {
    position: 0
  },
});
