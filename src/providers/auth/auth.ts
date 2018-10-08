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

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  getCurrentUser(): firebase.User{
    let user = firebase.auth().currentUser;
    return user;


  }

 /* getCurrentUser(): Promise<any> {
    firebase.auth().onAuthStateChanged(user => {
      if (user) { //Caso exista algum usuário autenticado, escrever código aqui
        console.log("(auth.ts) entrei no if user");
        console.log("(auth.ts) usuário unsubscribe: " + user.email);
        return user;
        //this.showLogOutInMenu();
      } else {  //Caso NÃO exista algum usuário autenticado, escrever código aqui
        console.log("(auth.ts) entrei no else (no user)");
        return null;
        ///this.hideLogOutInMenu();
      }
    });
  }*/
    


}
