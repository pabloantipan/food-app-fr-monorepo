import { FirebaseAuthError, SessionStatus } from "login/interfaces/auth.interfaces";


export const SIGN_UP_ERRORS: { [key: string]: FirebaseAuthError } = {
  'auth/email-already-in-use': {
    code: 4001,
    message: 'Este correo ya esta registrado.'
  },
  'auth/invalid-email': {
    code: 4002,
    message: 'Correo no valido.',
  },
  'auth/operation-not-allowed': {
    code: 4003,
    message: 'Correo no puede ser registrado.',
  },
  'auth/weak-password': {
    code: 4004,
    message: 'Password demasiado debil.',
  },
};

export const SIGN_IN_ERRORS: { [key: string]: FirebaseAuthError } = {
  'auth/invalid-credential': {
    code: 4005,
    message: 'Correo o contraseña incorrectos.',
  },
  'auth/too-many-requests': {
    code: 4006,
    message: 'Demasiados intentos, intenta mas tarde o resetea password.',
    sessionStatus: 'terminated ' as SessionStatus,
  },
};
