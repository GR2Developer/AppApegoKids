import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


import Firebase from 'firebase';
import 'firebase/firestore';


@Injectable()
export class DatabaseProvider {

  private database = Firebase.firestore();
  private storageRef: Firebase.storage.Reference;


  private collectionUserProfiles: string = 'UserProfiles';
  private collectionProducts: string = 'Products';
  private collectionCategories: string = 'Categories';


  constructor() {
    this.storageRef = Firebase.storage().ref();
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
   * Adiciona um novo documento com os campos especificados em dataObj
   * @param collectionObj - String que representa a coleção
   * @param dataObj - Dados a serem adicionados, ex.: {key1: 'value', key2: 'value'}
   * @param docObj - Opcional, nome do documento a ser adicionado (evita que um docId auto-gerado seja alocado)
   */
  addDocument(collectionObj: string, dataObj: any, docObj?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (docObj) {
        this.database.collection(collectionObj).doc(docObj).set(dataObj)
          .then(() => {
            resolve();
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
        .then(() => {
          resolve();
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
   * "product: {docId: 'value', name: 'value', description: 'value', price: 'value',
   * imgUrl: 'value', imgPath: 'value'}"
   * 
   * @param uid - uid do usuário para identificação
   */
  getUserProducts(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.collection(this.collectionProducts).where('uid', '==', uid).get()
        .then((querySnapshot) => {
          let obj: any = [];

          querySnapshot.forEach(doc => {
            console.log("doc database");
            console.dir(doc.data());
            obj.push({
              docId: doc.id,
              name: doc.data().name,
              description: doc.data().description,
              price: doc.data().price,
              imgUrl: doc.data().imgUrl,
              imgPath: doc.data().imgPath
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
   * Retorna um vetor com {id: docID(string), category: string, categoryFilters: string[]}
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

  /**
   * Faz o upload a imagem e retorna um array no formato [downloadUrl: string, path: string]
   * @param image - Imagem no formato base64
   * @param userId - Uid do usuário autenticado
   */
  uploadImageAndReturnUrlAndPath(image: string, userId: string): Promise<any> {
    let imageName = this.generateUUID();
    let imageRef = this.storageRef.child(`productsPictures/${userId}/${imageName}.jpg`);
    let uploadTask = imageRef.putString(image, 'data_url');
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case Firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case Firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, (error) => {
        // Handle unsuccessful uploads
        console.log("error, oh no!");
        console.dir(error);
        reject(error);
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        let returnArr = { downloadUrl: '', path: '' };
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          returnArr.downloadUrl = downloadURL;
          returnArr.path = uploadTask.snapshot.ref.fullPath;
          console.log('File available at', returnArr.downloadUrl);
          console.log('file.fullPath: ' + returnArr.path);
          resolve(returnArr);
        });
      });

    });
  }



  /**
   * Gera um nome aleatório no formato 6f1as6f-adnasf87-5fsdaf6s4f
   */
  private generateUUID(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  /**
   * 
   * @param imgPath - Path para a imagem no firebase storage
   */
  deleteImageInStorage(imgPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storageRef.child(imgPath).delete().then(
        () => {
          resolve();
          console.log("deleted image from storage");
        }, (error) => {
          reject(error);
        }
      );
    });
  }


}
