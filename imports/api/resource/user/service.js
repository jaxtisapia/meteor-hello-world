import {Meteor} from 'meteor/meteor';
class UserService {
	
	/**
	 * @param {{ email, password }} user - Account essentials needed to create an account
	 * @throws {Meteor.Error} When Email is already registered in the system
	 */
	static create(user) {
		if ( Accounts.findUserByEmail(user.email) ) throw new Meteor.Error('Email is invalid', 'User with such an email already exists');
		return Accounts.createUser({ email : user.email, password : user.password });
	}
	
}

export default UserService