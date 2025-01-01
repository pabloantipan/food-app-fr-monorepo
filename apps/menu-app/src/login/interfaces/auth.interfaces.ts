export interface FirebaseAuthError {
  code: number;
  message: string;
  sessionStatus?: SessionStatus;
}

export type SessionStatus = 'never' | 'alive' | 'terminated';

export interface Session {
  uid: string;
  email: string;
  displayName: string,
  token: string;
  idToken?: string;
  status: SessionStatus;
}

export const DEFAULT_SESSION: Session = {
  uid: '',
  email: '',
  displayName: '',
  token: '',
  idToken: '',
  status: 'never',
};
