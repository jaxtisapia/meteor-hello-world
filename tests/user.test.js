import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import faker from 'faker';

import User from '/db';
import { UserService } from '../imports/services';

describe('User', function() {
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
	
});