import { USER } from '/imports/constant'

export default class UserService {
	
	static register = (email, password, callback) => Meteor.call(USER.CREATE, email, password, callback);
	
	static login = (email, password, callback) => Meteor.loginWithPassword(email, password, callback);
	
	static logout = () => Meteor.logout();
	
}