import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


let firebaseConfig = {
    apiKey: "AIzaSyDnm_8WQshg1aZ6fJYAegEgHkaFt5xI1jM",
    authDomain: "reactapp-fe2dd.firebaseapp.com",
    databaseURL: "https://reactapp-fe2dd.firebaseio.com",
    projectId: "reactapp-fe2dd",
    storageBucket: "reactapp-fe2dd.appspot.com",
    messagingSenderId: "328392110700",
    appId: "1:328392110700:web:d4d3e1b97b9c9e3edc5e49",
    measurementId: "G-8MGDQTX8ND"
  };
 
class Firebase{

    constructor(){
     app.initializeApp(firebaseConfig);
    
     //Referenciando a database para acessar em outros locais
     this.app = app.database();

     this.storage = app.storage();

    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut();
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback);
    }

}

export default new Firebase();