import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {
  constructor() { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
    });
    
  }

  signupUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((data: any) => {
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
