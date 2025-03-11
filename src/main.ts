import { bootstrapApplication } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
// Initialize Firebase

export const appFirebase = initializeApp(
  JSON.parse(environment.firebaseConfig)
);
