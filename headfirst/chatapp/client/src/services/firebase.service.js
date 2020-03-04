import * as firebase from "firebase/app";
import { firebaseConfig } from '../environment'

class FirebaseService {
	static initializeApp(){		
		firebase.initializeApp(firebaseConfig)
	}

	static auth(email, password, errorCallback) {	
		firebase.auth()
		.signInWithEmailAndPassword(email, password)
		.catch(err => {		 
		  errorCallback(err)
		});	
	}

	static onAuthStateChanged(user, callback){
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    callback(user)
		  }
		});		
	}
}

export default FirebaseService
