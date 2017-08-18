import * as firebase from 'firebase';
import CONFIG from '../config';

class FirebaseManager {

	constructor() {
		this.firebaseConnection = firebase.initializeApp(CONFIG.firebase, 'pluses');
	}

	authenticate(token) {
		const credential = firebase.auth.GoogleAuthProvider.credential(token);
		return this.firebaseConnection.auth().signInWithCredential(credential);
	}

	db() {
		return this.firebaseConnection.database();
	}

}

export default {
	_instance: null,
	instance() {
		if (!this._instance) {
			this._instance = new FirebaseManager();
		}
		return this._instance;
	}
};
