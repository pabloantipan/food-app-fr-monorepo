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
import { AuthException, InvalidCredentialsException, UnconfirmedEmailException } from 'login/exceptions/exceptions';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth: Auth = inject(Auth);

  constructor() { }

  public async signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      console.log('userCredential', userCredential);
      if (!userCredential.user.emailVerified) {
        throw new UnconfirmedEmailException('Please confirm your email');
      }
      return userCredential;
    })
      .catch((error) => {
        if (error instanceof AuthException) {
          throw error;
        }
        console.log('error', error.message,);
        throw new InvalidCredentialsException('Invalid credentials');
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
