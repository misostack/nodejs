// firebase-admin
import * as admin from 'firebase-admin';
import { EnvironmentService, LogService } from './index';

class FireBaseService {
	// app
	constructor() {
		
		// this.app = admin.initializeApp({
  	// 	credential: admin.credential.applicationDefault(),
		//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
		// });
	}

	static initializeApp() {
		// const serviceAccount = require("path/to/serviceAccountKey.json");
		
		LogService.logDebug(EnvironmentService.get('GOOGLE_APPLICATION_CREDENTIALS'))
		LogService.logDebug(EnvironmentService.get('FIREBASE_DATABASE_NAME'))
		admin.initializeApp({
  		credential: admin.credential.applicationDefault(),
		  databaseURL: EnvironmentService.get('FIREBASE_DATABASE_NAME')
		});
		return admin;
	}

	static listAllUsers() {
		const fetchUser = ({nextPageToken, limit = 1000, payload = [], resolver = null}) => {
			return new Promise((resolve, reject) => {
				admin.auth().listUsers(limit, nextPageToken)
				.then( res => {
					const users = res.users
					const updatedPayload = [...payload, ...users]					
					if(res.pageToken) {
						fetchUser({
							nextPageToken: res.pageToken,
							limit: limit,
							payload: updatedPayload,
							resolver: resolver || resolve
						})
					}else {
						if(resolver) resolver(updatedPayload);
						resolve(updatedPayload)
					}
				})	
			}).catch(error => {
				reject(error)
			})
		};
		return new Promise((resolve, reject) => {
			fetchUser({limit: 100})
			.then(users => resolve(users))
			.catch(err => reject(err))
		})
	}
}

export default FireBaseService