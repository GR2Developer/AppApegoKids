import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


import * as firebase from 'firebase';
import 'firebase/firestore';


@Injectable()
export class DatabaseProvider {

  private database: firebase.firestore.Firestore;
  private collectionUserProfiles: string = 'UserProfiles';
  private collectionProducts: string = 'Products';
  private collectionCategories: string = 'Categories';


  constructor(public http: HttpClient) {

    this.database = firebase.firestore();
  }

  /** 
  * Cada usuário adicionado deve ser do tipo
  * "user: {uid: 'value', name: 'value', email: 'value'}"
 */
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




  /**
   * Retorna um vetor com dados dos usuários onde uid do usuário = parâmetro uid
   * ex.: ret1 = [user1Data, user2Data]; Para acessar: ret1[0].property
   * @param uid 
   */
  getUserData(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.collection(this.collectionUserProfiles).where('uid', '==', uid).get()
        .then((querySnapshot) => {
          let obj: any = [];

          querySnapshot.forEach(doc => {
            obj.push({
              docId: doc.id,
              name: doc.data().name,
              email: doc.data().email
            });
          });

          resolve(obj);
        })
        .catch((error) => {
          reject(error);
        });


    });


  }

  /**
   * 
   */
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
                name: doc.data().name,
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


  /**
   * 
   * @param collectionObj - String que representa a coleção
   * @param dataObj - Dados a serem adicionados, ex.: {key1: 'value', key2: 'value'}
   * @param docObj - Opcional, nome do documento a ser adicionado (evita que um docId auto-gerado seja alocado)
   */
  addDocument(collectionObj: string, dataObj: any, docObj?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (docObj) {
        this.database.collection(collectionObj).doc(docObj).set(dataObj)
          .then((obj: any) => {
            resolve(obj);
          })
          .catch((error: any) => {
            reject(error);
          });

      }
      else {
        this.database.collection(collectionObj).add(dataObj)
          .then((obj: any) => {
            resolve(obj);
          })
          .catch((error: any) => {
            reject(error);
          });
      }

    });
  }

  updateDocument(collectionObj: string,
    docId: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database
        .collection(collectionObj)
        .doc(docId)
        .update(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  deleteDocument(collectionObj: string,
    docId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database
        .collection(collectionObj)
        .doc(docId)
        .delete()
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

/**
 * Cada produto retornado é do tipo
 * "product: {docId: 'value', name: 'value', description: 'value', price: 'value'}"
 * 
 * @param uid - uid do usuário para identificação
 */
  getUserProducts(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.collection(this.collectionProducts).where('uid', '==', uid).get()
        .then((querySnapshot) => {
          let obj: any = [];

          querySnapshot.forEach(doc => {
            obj.push({
              docId: doc.id,
              name: doc.data().name,
              description: doc.data().description,
              price: doc.data().price
            });
          });

          resolve(obj);
        })
        .catch((error) => {
          reject(error);
        });


    });


  }


/**
 * 
 * @param category - Categoria desejada (documentId no firestore)
 */
  getCategoryData(category: string): Promise<any> {

    return new Promise((resolve, reject) => {
      this.database.collection(this.collectionCategories).where('category', '==', category).get()
        .then((querySnapshot) => {
          let obj: any = [];

          querySnapshot.forEach(doc => {
            obj.push({
              docId: doc.id,
              category: doc.data().category,
              categoryFilters: doc.data().categoryFilters,
            });
          });

          resolve(obj);
        })
        .catch((error) => {
          reject(error);
        });


    });

  }


}
