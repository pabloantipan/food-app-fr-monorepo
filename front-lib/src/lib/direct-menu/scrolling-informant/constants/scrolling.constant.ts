import { WindowScrollingSettings } from "../interfaces/scrolling.interfaces";

export type WindowScrollingDirection = 'none' | 'up' | 'down';

export const SCROLLING_DEBOUNCE_DEFAULT_DELAY = 80;

export const SCROLLING_SETTINGS: WindowScrollingSettings = {
  ios: {
    debounceDelayMs: 80,
    downDirectionThresholdPx: 25,
    upDirectionThresholdPx: 25,
    bottomTriggerDisplacementPx: 80,
    topTriggerDisplacementPx: 80,
  },
  android: {
    debounceDelayMs: 80,
    downDirectionThresholdPx: 25,
    upDirectionThresholdPx: 25,
    bottomTriggerDisplacementPx: 80,
    topTriggerDisplacementPx: 80,
  },
  web: {
    debounceDelayMs: 100,
    downDirectionThresholdPx: 10,
    upDirectionThresholdPx: 10,
    bottomTriggerDisplacementPx: 40,
    topTriggerDisplacementPx: 40,
  }
};
