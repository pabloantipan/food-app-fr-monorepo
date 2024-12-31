import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from '@angular/fire/auth';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth: Auth = inject(Auth);

  constructor() { }

  public async signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      console.log('userCredential', userCredential);
      return userCredential;
    });
  }

  public async signOut() {
    return signOut(this.auth);
  }

  public async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
        sendEmailVerification(userCredential.user);
        return userCredential;
      })
  }

  public async resetPassword(email: string) {
    sendPasswordResetEmail(this.auth, email);
  }

}
