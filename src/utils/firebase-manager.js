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

	logout() {
		return this.firebaseConnection.auth().signOut();
	}

	db() {
		return this.firebaseConnection.database();
	}

	query(path) {
		return new QueryRequest(this.db(), path);
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

class QueryRequest {

	constructor(db, path) {
		this.db = db;
		this.path = path;
	}

	_query(refPath) {
		return this.db.ref(refPath).once('value');
	}

	asList() {
		return this._query(this.path).then((snapshot) => {
			const list = [];
			snapshot.forEach(childSnapshot => { 
				list.push({ $id: childSnapshot.key, ...childSnapshot.val() }) 
			});
			return list;
		});
	}

	byId(id) {
		return this._query(`${this.path}/${id}`).then((snapshot) => snapshot.val());
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
