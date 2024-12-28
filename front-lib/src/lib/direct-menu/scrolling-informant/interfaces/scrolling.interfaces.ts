import { WindowScrollingDirection } from "../constants/scrolling.constant";

export interface WindowScrollingInterface {
  actualValue: number;
  previousValue: number;
  direction: WindowScrollingDirection;
  variation: number;
  distanceToBottom: number;
  distanceToTop: number;
  isAtBottom: boolean;
  isAtTop: boolean;
}

export interface WindowScrollingSetting {
  debounceDelayMs: number;
  downDirectionThresholdPx: number;
  bottomTriggerDisplacementPx: number;
  upDirectionThresholdPx: number;
  topTriggerDisplacementPx: number;
}


export interface WindowScrollingSettings {
  ios: WindowScrollingSetting;
  android: WindowScrollingSetting;
  web: WindowScrollingSetting;
}
