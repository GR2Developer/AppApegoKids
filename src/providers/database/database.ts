import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


import * as firebase from 'firebase';
import 'firebase/firestore';


@Injectable()
export class DatabaseProvider {

  private database: any;
  private collectionUserProfiles: string = 'UserProfiles';


  constructor(public http: HttpClient) {

    this.database = firebase.firestore();
  }

  addUser(collectionObj: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.collection(collectionObj).add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getUser(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      //this.database.collection
    });
  }

  getAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.collection(this.collectionUserProfiles)
        .get()
        .then((querySnapshot) => {


          let obj: any = [];


          querySnapshot
            .forEach((doc: any) => {
              obj.push({
                id: doc.id,
                name: doc.data().nome,
                email: doc.data().email,
                uid: doc.data().uid
              });
            });


          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  addDocument(collectionObj: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.collection(collectionObj).add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }




}
