import { inject, Injectable } from '@angular/core';
import { Auth, authState, idToken } from '@angular/fire/auth';
import { VaultKeyProvider } from '@providers/vault-key/vault-key.provider';
import { AuthService } from 'login/services/auth.service';
import { BehaviorSubject } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class SessionProvider {
  private auth: Auth = inject(Auth);
  private _authState$ = authState(this.auth);
  private _idToken$ = idToken(this.auth);
  private _sessionSubject = new BehaviorSubject<Session>(DEFAULT_SESSION);

  constructor(
    private readonly vaultKeyProvider: VaultKeyProvider,
    private readonly authService: AuthService,
  ) { }

  public async signUp(email: string, password: string): Promise<Session> {
    return this.authService.signUp(email, password).then(async (userCredential) => {
      const token = await userCredential.user.getIdToken();

      const session = {
        uid: userCredential.user.uid,
        email: userCredential.user.email ?? 'empty',
        displayName: userCredential.user.displayName ?? 'empty',
        token,
        status: 'alive' as SessionStatus,
      };

      this._sessionSubject.next(session);
      return session;
    });
  }

  public async signIn(email: string, password: string): Promise<Session> {
    return this.authService.signIn(email, password).then(async (userCredential) => {
      const token = await userCredential.user.getIdToken();

      const session = {
        uid: userCredential.user.uid,
        email: userCredential.user.email ?? 'empty',
        displayName: userCredential.user.displayName ?? 'empty',
        token,
        status: 'alive' as SessionStatus,
      };

      this._sessionSubject.next(session);
      return session;
    });
  }

  public async signOut(): Promise<void> {
    await this.authService.signOut();
    this._sessionSubject.next({ ...DEFAULT_SESSION, status: 'terminated' });
  }
}
