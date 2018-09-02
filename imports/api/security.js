import { Roles } from 'meteor/alanning:roles';

class Security {
	
	static checkRole(userId, role){
		if (!this.hasRole(userId, role)) throw new Meteor.Error('not authorized');
		else return true;
	}

	static hasRole(userId, role) {
		return Roles.userIsInRole(userId, role);
	}
	
	static isLoggedIn(userId){
		if (!userId) throw new Meteor.Error('not authrorized', 'you are not authorized');
	}
}

export default Security;
