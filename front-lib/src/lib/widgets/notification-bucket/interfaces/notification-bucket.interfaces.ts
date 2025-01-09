export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  liveSpanSec?: number;
  permanent?: boolean;
}

export interface NotificationPayload {
  id: string;
  message: string;
  type: NotificationType;
  selfDestructionCallback: void | null;
  // selfRenderingCallback: (variableToUpdate: any) => Promise<boolean>;
}
