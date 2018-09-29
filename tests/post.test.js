import { assert, expect } from 'chai';

import faker from 'faker';
import { Posts, Users } from '../db';
import { PostService, UserService } from '../imports/services';

describe('Posts', function() {
	
	let post;
	
	const description = faker.internet.email();
	const title = faker.name.findName();
	
	const invalidPostId = 'somewrongids';
	let validPostId = '37PruwNv4c39fZJXk';
	let validUserId = 'someValidUserId';
	
	const PostValidator = Posts.simpleSchema().namedContext();
	
	before(function() {
		
		// Create a random User for the test
		const email = `${faker.internet.email()}@email.com`;
		const password = 'mySecurePassword';
		
		validUserId = UserService.create({ email, password });
		
		// Create a random Post for the test
		post = { title, userId : validUserId };
	});
	
	after(function() {
		// This space runs only in test mode.
		// We are sure, it wouldnt affect any development servers
		
		// Clear the database to avoid bloating.
		// Only Call Clearance of Collections that have been imported
		if ( Meteor.isDevelopment ) {
			Posts.remove({});
			Users.remove({});
		}
	});
	
	describe('Model Validation', function() {
		
		it('should be able to model a Posts object with at least userId and title', function() {
			
			const isValid = PostValidator.validate(post);
			expect(isValid).to.be.true;
		});
		
		it('should be unable to model a Posts object without a title', function() {
			const post = { description, userId : validUserId };
			const isValidPost = PostValidator.validate(post);
			
			expect(isValidPost).to.be.false;
		});
		
		it('should be unable to model a Posts object without a userId', function() {
			const post = { description, title };
			const isValidPost = PostValidator.validate(post);
			
			expect(isValidPost).to.be.false;
		});
		
	});
	
	describe('#create', function() {
		
		it('should be able to create with a user attached', function() {
			const postId = PostService.create(post);
			validPostId = postId;
			
			expect(postId).to.not.equal(null);
			expect(postId).to.be.a('string');
		});
		
	});
	
	describe('#read', function() {
		
		describe('get', function() {
			
			it('should be able to return paginated list of posts, even without being specified', function() {
				const allPostsResult = PostService.get();
				
				expect(allPostsResult).to.be.an('array');
			});
			
			it('should be able to return paginated list of Posts, when page and expected count of result is specified', function() {
				const secondPagePostsResult = PostService.get({ page : 2, count : 50 });
				
				expect(secondPagePostsResult).to.be.an('array');
			})
			
		});
		
		describe('getById', function() {
			
			it('should return an empty object when no Posts Id is specified', function() {
				const postWithEmptyId = PostService.getById();
				expect(postWithEmptyId).to.be.an('object').that.is.empty;
			});
			
			it('should return an empty object when an invalid Id is specified', function() {
				const postWithInvalidId = PostService.getById(invalidPostId);
				expect(postWithInvalidId).to.be.an('object').that.is.empty;
			});
			
			it('should return a valid Posts when a valid Id is specified', function(done) {
				
				const postWithValidId = PostService.getById(validPostId);
				
				expect(postWithValidId._id).to.be.a('string');
				expect(postWithValidId._id).to.equal(validPostId);
				expect(postWithValidId.title).to.be.a('string');
				
				done();
			});
			
		});
		
	});
	
	describe('#update', function() {
		
		it('should throw an error when an update is attempted on no Posts Id', function(done) {
			try {
				PostService.updateByID();
			}
			catch ( e ) {
				done()
			}
		});
		
		it('should throw an error when an invalid Posts Id is specified', function(done) {
			
			const updatedPostWithInvalidId = PostService.updateByID;
			
			try {
				updatedPostWithInvalidId(validUserId, invalidPostId, {});
			}
			catch ( e ) {
				done()
			}
			
		});
		
		it('should update a Posts when valid Id supplied, but only one property specified', function() {
			
			const titleUpdate = { title : 'Updated Title: Here we go' };
			PostService.updateByID(validUserId, validPostId, titleUpdate);
			
			const updatedPost = PostService.getById(validPostId);
			expect(updatedPost.title).to.equal(titleUpdate.title);
		});
		
		it('should update a Posts when valid Id supplied, and more than one properties specified', function() {
			
			const titleAndDescriptionUpdate = {
				title : 'Updated Title: Here we go',
				description : 'Another one! One Hundred'
			};
			
			PostService.updateByID(validUserId, validPostId, titleAndDescriptionUpdate);
			
			const updatedPost = PostService.getById(validPostId);
			
			expect(updatedPost.title).to.equal(titleAndDescriptionUpdate.title);
			expect(updatedPost.description).to.equal(titleAndDescriptionUpdate.description);
		});
		
	});
	
	describe('#delete', function() {
		
		const validID = 'somevalidID';
		const invalidId = 'someinvalidId';
		
		it('should throw an error when a delete is attempted with no Posts Id', function(done) {
			
			try {
				PostService.deleteByID();
			} catch ( e ) {
				done()
			}
			
		});
		
		it('should throw an error when an invalid Posts Id is specified', function(done) {
			
			try {
				PostService.deleteByID(invalidId, {});
			}
			catch ( e ) {
				done();
			}
			
		});
		
		it('should update a Post when valid Id supplied, but only one property specified', function() {
			
			PostService.deleteByID(validUserId, validPostId);
			
			const deletedPost = PostService.getById(validPostId);
			
			expect(deletedPost).to.be.empty;
		});
		
		
	});
	
});