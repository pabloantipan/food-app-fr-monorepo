import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { environment } from 'environments/environment.dev';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { appRoutes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    // NotificationBucketProvider,
    // NotificationBucketModule,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    importProvidersFrom([BrowserAnimationsModule]),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
