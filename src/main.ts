import { bootstrapApplication } from '@angular/platform-browser'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'
export let appFirebase: FirebaseApp = {} as FirebaseApp
fetch('/assets/firebase-config.json')
  .then(res => res.json())
  .then(firebaseConfig => {
    appFirebase = initializeApp(firebaseConfig)
    bootstrapApplication(AppComponent, appConfig).catch(err =>
      console.error(err)
    )
  })
  .catch(err => {
    console.error('No se pudo cargar la configuración de Firebase:', err)
  })
