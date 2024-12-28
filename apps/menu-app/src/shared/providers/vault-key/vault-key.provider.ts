import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VaultKeyProvider {
  private _vaultKey: string | null = null;
  private _vaultKeyBehaviorSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    this.callForKey();
  }

  private callForKey() {
    this._vaultKey = 'vault-key';
    this._vaultKeyBehaviorSubject.next(this._vaultKey);
  }

  getVaultKey() {
    return this._vaultKey;
  }

  public encrypt(key: string, data: string) {
    return `${key}-${data}`;
  }

  public decrypt(key: string, data: string) {
    return { key, data };
  }
}
