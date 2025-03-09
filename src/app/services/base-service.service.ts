import { Injectable } from '@angular/core'
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { Nullable } from 'primeng/ts-helpers'
import { appFirebase } from '../../main'
import { LocalUser } from '../models/auth/local-user.interface'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  db: Firestore
  collectionName = ''
  user: Nullable<LocalUser> = null
  constructor (private authService: AuthService) {
    this.db = getFirestore(appFirebase)
  }

  async getFirst (): Promise<Nullable<T>> {
    const user: Nullable<LocalUser> = this.authService.getCurrentUser()

    if (user) {
      const q = query(
        collection(this.db, this.collectionName),
        // where('userId', '==', user.uid)
      )
      const querySnapshot = await getDocs(q)
      const data: T[] = querySnapshot.docs.map(d => ({
        ...(d.data() as T),
        id: d.id
      }))
      return data[0]
    }
    return undefined
  }
  async getAll (): Promise<T[]> {
    const user: Nullable<LocalUser> = this.authService.getCurrentUser()

    if (user) {
      const q = query(
        collection(this.db, this.collectionName),
        // where('userId', '==', user.uid)
      )
      const querySnapshot = await getDocs(q)
      const data: T[] = querySnapshot.docs.map(d => ({
        ...(d.data() as T),
        id: d.id
      }))
      return data
    }
    return []
  }

  async getAllMapped (): Promise<Map<string, T>> {
    const user: Nullable<LocalUser> = this.authService.getCurrentUser()
    const data = new Map<string, T>()

    if (user) {
      const q = query(
        collection(this.db, this.collectionName),
        // where('userId', '==', user.uid)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.docs.forEach(d => {
        data.set(d.id, d.data() as T)
      })
    }
    return data
  }

  async getById (id: string): Promise<Nullable<T>> {
    const docRef = doc(this.db, this.collectionName, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        ...(docSnap.data() as T),
        id: docSnap.id
      }
    } else {
      return undefined
    }
  }

  async addDoc (encargo: T): Promise<T | undefined> {
    try {
      const docRef = await addDoc(
        collection(this.db, this.collectionName),
        encargo as DocumentData
      )

      console.log('Document written with ID: ', docRef.id)
      return {
        ...(docRef as T),
        id: docRef.id
      }
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    return undefined
  }

  async updateDoc (documentId: string, document: T) {
    try {
      const ref = doc(this.db, this.collectionName, documentId)

      if (ref) {
        await updateDoc(ref, document as DocumentData)
      }
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  async deleteDoc (documentId: string) {
    try {
      const ref = doc(this.db, this.collectionName, documentId)

      if (ref) {
        await deleteDoc(ref)
      }
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
}
