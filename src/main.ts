import { bootstrapApplication } from '@angular/platform-browser'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'
import { environment } from './environments/environment'
export let appFirebase: FirebaseApp = {} as FirebaseApp
// Si quieres usar el archivo externo SIEMPRE (recomendado para ocultar claves):
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
    // Opcional: fallback a environment si existe
    if (
      environment.firebaseConfig &&
      Object.keys(environment.firebaseConfig).length > 0
    ) {
      appFirebase = initializeApp(environment.firebaseConfig)
      bootstrapApplication(AppComponent, appConfig).catch(err =>
        console.error(err)
      )
    }
  })
