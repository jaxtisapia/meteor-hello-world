import {expect} from 'chai';
import faker from 'faker';

import User from '../imports/api/resource/user/collection';
import { UserService } from '../imports/services';

describe("User", function() {
	const user = {};
	let createdUserId;
	
	beforeEach(function() {
		user.email = faker.internet.email();
		user.password = 'somePassword';
	});
	
	it('should be able register', function() {
		
		createdUserId = UserService.create(user);
		
		expect(createdUserId).to.be.a('string');
	});
	
	it('should be able to login', function() {
		
		const loggedInUser = UserService.login(user.email, user.password);
		
		console.log(loggedInUser);
		
	})
	
});