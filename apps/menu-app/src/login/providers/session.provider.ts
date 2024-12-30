import { Injectable } from '@angular/core';
import { VaultKeyProvider } from '@providers/vault-key/vault-key.provider';

export interface Session {
  uid: string;
  email: string;
  displayName: string,
  token: string;
  idToken?: string;
  vertexSessionId: string;
}

@Injectable({ providedIn: 'root' })
export class SessionProvider {
  constructor(
    private readonly vaultKeyProvider: VaultKeyProvider,
  ) { }

}
