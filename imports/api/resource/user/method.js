import USER from '/imports/constant/user';
import Security from '/imports/api/security';
import UserService from '/imports/api/resource/user/service';

Meteor
	.methods(
		{
			
			/**
			 * RPC Call to create a User
			 * @param {string} email - Email of new User to be created
			 * @param {string} password - Password of new User to be created
			 * @return {string} User Id of created user
			 */
			[USER.CREATE]({ email, password }) {
				return UserService.create({ email, password });
			}
			
		});