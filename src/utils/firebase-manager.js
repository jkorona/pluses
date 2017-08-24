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

	query(path, key) {
		return this.db().ref(`${path}/${key}`).once('value').then(snapshot => snapshot.val());
	}

	add(path, value) {
		return this.db().ref(path).push(value);
	}

	save(path, key, value) {
		return this.db().ref(`${path}/${key}`).set(value);
	}

	update(path, key, value) {
		return this.db().ref(path).update({ [key]: value });
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
