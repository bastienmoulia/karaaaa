import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'karaaaa-59d6c',
        appId: '1:111958835707:web:7a7439cbb561926a150b5e',
        storageBucket: 'karaaaa-59d6c.appspot.com',
        apiKey: 'AIzaSyCCb_PvVtrxOMpDacg9RlZsquqSobl9h3A',
        authDomain: 'karaaaa-59d6c.firebaseapp.com',
        messagingSenderId: '111958835707',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};
