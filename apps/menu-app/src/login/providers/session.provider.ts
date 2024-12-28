import { Injectable } from '@angular/core';
import { VaultKeyProvider } from '@providers/vault-key/vault-key.provider';

@Injectable({ providedIn: 'root' })
export class SessionProvider {
  constructor(
    private readonly vaultKeyProvider: VaultKeyProvider,
  ) { }
}
