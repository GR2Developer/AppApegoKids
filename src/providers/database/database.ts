import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


import Firebase from 'firebase';
import 'firebase/firestore';


@Injectable()
export class DatabaseProvider {

  //private database = Firebase.firestore();
  //private storageRef: Firebase.storage.Reference = Firebase.storage().ref();


  private collectionUserProfiles: string = 'UserProfiles';
  private collectionProducts: string = 'Products';
  private collectionCategories: string = 'Categories';


  constructor() {
    //this.storageRef = Firebase.storage().ref();
  }

  /** 
  * Cada usuário adicionado deve ser do tipo
  * "user: {uid: 'value', name: 'value', email: 'value'}"
 */
  addUser(collectionObj: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      Firebase.firestore().collection(collectionObj).add(dataObj)
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
  * imgUrl: 'value', imgPath: 'value', category: 'value', subcategory: 'value', ownerUid: 'value'}"
  */
  getProductsHot(hotHome?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      if (hotHome) {
        Firebase.firestore().collection(this.collectionProducts).where('flagHotHome', '==', true).get()
          .then((querySnapshot) => {
            let obj: any = [];
            querySnapshot.forEach(doc => {
              console.log("doc flagHotHome");
              console.dir(doc.data());
              obj.push({
                docId: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price,
                category: doc.data().category,
                subcategory: doc.data().subcategory,
                imgUrl: doc.data().imgUrl,
                imgPath: doc.data().imgPath,
                ownerUid: doc.data().imgPath
              });
            });
            resolve(obj);
          })
          .catch((error) => {
            reject(error);
          });
      }
      else {
        Firebase.firestore().collection(this.collectionProducts).where('flagHot', '==', true).get()
          .then((querySnapshot) => {
            let obj: any = [];
            querySnapshot.forEach(doc => {
              console.log("doc flagHot");
              console.dir(doc.data());
              obj.push({
                docId: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price,
                category: doc.data().category,
                subcategory: doc.data().subcategory,
                imgUrl: doc.data().imgUrl,
                imgPath: doc.data().imgPath,
                ownerUid: doc.data().imgPath
              });
            });
            resolve(obj);
          })
          .catch((error) => {
            reject(error);
          });
      }

    });

  }

  /**
  * Cada produto retornado é do tipo
  * "product: {docId: 'value', name: 'value', description: 'value', price: 'value',
  * imgUrl: 'value', imgPath: 'value', category: 'value', subcategory: 'value', ownerUid: 'value'}"
  */
  getProductsSpotlight(spotlightHome?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      if (spotlightHome) {
        Firebase.firestore().collection(this.collectionProducts).where('flagSpotlightHome', '==', true).get()
          .then((querySnapshot) => {
            let obj: any = [];
            querySnapshot.forEach(doc => {
              console.log("doc flagSpotlightHome");
              console.dir(doc.data());
              obj.push({
                docId: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price,
                category: doc.data().category,
                subcategory: doc.data().subcategory,
                imgUrl: doc.data().imgUrl,
                imgPath: doc.data().imgPath,
                ownerUid: doc.data().imgPath
              });
            });
            resolve(obj);
          })
          .catch((error) => {
            reject(error);
          });
      }
      else {
        Firebase.firestore().collection(this.collectionProducts).where('flagSpotlight', '==', true).get()
          .then((querySnapshot) => {
            let obj: any = [];
            querySnapshot.forEach(doc => {
              console.log("doc flagSpotlight");
              console.dir(doc.data());
              obj.push({
                docId: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price,
                category: doc.data().category,
                subcategory: doc.data().subcategory,
                imgUrl: doc.data().imgUrl,
                imgPath: doc.data().imgPath,
                ownerUid: doc.data().imgPath
              });
            });
            resolve(obj);
          })
          .catch((error) => {
            reject(error);
          });
      }

    });


  }

  /**
  * Cada produto retornado é do tipo
  * "product: {docId: 'value', name: 'value', description: 'value', price: 'value',
  * imgUrl: 'value', imgPath: 'value', category: 'value', subcategory: 'value', ownerUid: 'value'}"
  */
  getCategoryProducts(category: string, subcategory?: string): Promise<any> {
    if (subcategory) {
      return new Promise((resolve, reject) => {
        Firebase.firestore().collection(this.collectionProducts)
          .where('category', '==', category).where('subcategory', '==', subcategory).get()
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
                category: doc.data().category,
                subcategory: doc.data().subcategory,
                imgUrl: doc.data().imgUrl,
                imgPath: doc.data().imgPath,
                ownerUid: doc.data().ownerUid
              });
            });
            resolve(obj);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    else {
      return new Promise((resolve, reject) => {
        Firebase.firestore().collection(this.collectionProducts).where('category', '==', category).get()
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
                category: doc.data().category,
                subcategory: doc.data().subcategory,
                imgUrl: doc.data().imgUrl,
                imgPath: doc.data().imgPath,
                ownerUid: doc.data().ownerUid
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


  /**
   * Retorna um vetor com dados dos usuários onde uid do usuário = parâmetro uid
   * ex.: ret1 = [user1Data, user2Data]; Para acessar: ret1[0].property
   * @param uid 
   */
  getUserData(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Firebase.firestore().collection(this.collectionUserProfiles).where('uid', '==', uid).get()
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
      Firebase.firestore().collection(this.collectionUserProfiles)
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
        Firebase.firestore().collection(collectionObj).doc(docObj).set(dataObj)
          .then(() => {
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });

      }
      else {
        Firebase.firestore().collection(collectionObj).add(dataObj)
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
      Firebase.firestore()
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

  deleteDocument(collectionObj: string, docId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Firebase.firestore()
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
   * imgUrl: 'value', imgPath: 'value', category: 'value', subcategory: 'value', ownerUid: 'value'}"
   * 
   * @param uid - uid do usuário para identificação
   */
  getUserProducts(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Firebase.firestore().collection(this.collectionProducts).where('ownerUid', '==', uid).get()
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
              category: doc.data().category,
              subcategory: doc.data().subcategory,
              imgUrl: doc.data().imgUrl,
              imgPath: doc.data().imgPath,
              ownerUid: doc.data().uid
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
   * Retorna um vetor result, result[0] = {id: docID(string), category: string, categoryFilters: string[], subcategories: string[]}
   * Caso não receba parâmetros, result tem todas as categorias, ex.: resul[0], result[1], etc.
   * @param category - Categoria desejada (documentId no firestore)
   */
  getCategoryData(category?: string): Promise<any> {
    if (category) {
      return new Promise((resolve, reject) => {
        Firebase.firestore().collection(this.collectionCategories).where('category', '==', category).get()
          .then(querySnapshot => {
            let obj: any = [];

            querySnapshot.forEach(doc => {
              obj.push({
                docId: doc.id,
                category: doc.data().category,
                categoryFilters: doc.data().categoryFilters,
                subcategories: doc.data().subcategories
              });
            });

            resolve(obj);
          }).catch(error => {
            reject(error);
          });
      });
    }
    else {
      return new Promise((resolve, reject) => {
        Firebase.firestore().collection(this.collectionCategories).get()
          .then(querySnapshot => {
            let obj: any = [];

            querySnapshot.forEach(doc => {
              obj.push({
                docId: doc.id,
                category: doc.data().category,
                subcategories: doc.data().subcategories,
                categoryFilters: doc.data().categoryFilters
              });
            });
            console.log("database get all categories: ", obj);
            // console.dir

            resolve(obj);
          }).catch(error => {
            reject(error);
          });
      });
    }
  }

  /**
   * Faz o upload a imagem e retorna um array no formato [downloadUrl: string, path: string]
   * @param data_url - Imagem no formato base64 do tipo data_url: "data:image/jpeg;base64, <base64String>"
   * @param userId - Uid do usuário autenticado
   */
  uploadImageAndReturnUrlAndPath(data_url: string, userId: string): Promise<any> {
    console.log("entrei no database uploadImage");
    let imageName = this.generateUUID();
    console.log("image name UUID: ", imageName);
    let imageRef = Firebase.storage().ref().child(`productsPictures/${userId}/${imageName}.jpg`);
    console.log("image ref: ", imageRef);
    let uploadTask = imageRef.putString(data_url, 'data_url');
    console.log("databaseProvider, antes de fazer o upload, com uploadTask: ");
    console.dir(uploadTask);
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
      Firebase.storage().ref().child(imgPath).delete().then(
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
