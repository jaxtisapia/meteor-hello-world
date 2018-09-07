import { expect, assert } from 'chai';
import Post from '../imports/api/resource/post/collection';
import { PostService } from '../imports/services';

import faker from 'faker';

describe('Post', function() {
	
	let post;
	
	const userId = 'defaultUser';
	const description = faker.internet.email();
	const title = faker.name.findName();
	
	const invalidPostId = 'somewrongids';
	const validPostId = '37PruwNv4c39fZJXk';
	
	const PostValidator = Post.simpleSchema().namedContext();
	
	before(function() {
		
		// create a user
		
		post = { title, userId };
	});
	
	after(function() {
		// clear the database
		if (Meteor.isDevelopment) Post.remove({});
	});
	
	describe('Model Validation', function() {
		
		it('should be able to model a Post object with at least userId and title', function() {
			
			const isValid = PostValidator.validate(post);
			expect(isValid).to.be.true;
		});
		
		it('should be unable to model a Post object without a title', function() {
			const post = { description, userId };
			const isValidPost = PostValidator.validate(post);
			
			expect(isValidPost).to.be.false;
		});
		
		it('should be unable to model a Post object without a userId', function() {
			const post = { description, title };
			const isValidPost = PostValidator.validate(post);
			
			expect(isValidPost).to.be.false;
		});
		
	});
	
	describe('#create', function() {
		
		it('should be create with a user attached', function() {
			const postId = PostService.create(post);
			
			expect(postId).to.not.equal(null);
			expect(postId).to.be.a('string');
		});
		
	});
	
	describe('#read', function()  {
		
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
			
			it('should return an empty object when no Post Id is specified', function() {
				const postWithEmptyId = PostService.getById();
				expect(postWithEmptyId).to.be.an('object').that.is.empty;
			});
			
			it('should return an empty object when an invalid Id is specified', function() {
				const postWithInvalidId = PostService.getById(invalidPostId);
				expect(postWithInvalidId).to.be.an('object').that.is.empty;
			});
			
			it('should return a valid Post when a valid Id is specified', function() {
				
				const postWithValidId = PostService.getById(validPostId);
				
				expect(postWithValidId._id).to.be.a('string');
				expect(postWithValidId._id).to.equal(validPostId);
				expect(postWithValidId.title).to.be.a('string');
			});
			
		});
		
	});
	
	describe('#update', function()  {
		
		it('should throw an error when an update is attempted on no Post Id', function() {
			expect(PostService.updateByID()).to.throw();
		});
		
		it('should throw an error when an invalid Post Id is specified', function() {
			
			const updatedPostWithInvalidId = PostService.updateByID;
			assert.throws(updatedPostWithInvalidId(userId, invalidPostId, {}));
		});
		
		it('should update a Post when valid Id supplied, but only one property specified', function() {
			
			const titleUpdate = { title : 'Updated Title: Here we go' };
			const updatedPost = PostService.updateByID(userId, validPostId, titleUpdate);
			
			console.log(updatedPost);
			
			expect(updatedPost.title).to.equal(titleUpdate.title);
		});
		
		it('should update a Post when valid Id supplied, and more than one properties specified', function() {
			
			const titleAndDescriptionUpdate = {
				title : 'Updated Title: Here we go',
				description : 'Another one! One Hundred'
			};
			
			const updatedPost = PostService.updateByID(userId, validPostId, titleAndDescriptionUpdate);
			
			console.log(updatedPost);
			
			expect(updatedPost.title).to.equal(titleAndDescriptionUpdate.title);
			expect(updatedPost.description).to.equal(titleAndDescriptionUpdate.description);
			
		});
		
	});
	
	describe('#delete', function() {
		
		const validID = 'somevalidID';
		const invalidId = 'someinvalidId';
		
		it('should throw an error when a delete is attempted with no Post Id', function() {
			
			const deletedPostWithNoId = PostService.deleteByID();
			
			expect(deletedPostWithNoId).to.throw();
		});
		
		it('should throw an error when an invalid Post Id is specified', function() {
			
			const deletedPostWithInvalidId = PostService.deleteByID(invalidId, {});
			
			expect(deletedPostWithInvalidId).to.throw();
		});
		
		it('should update a Post when valid Id supplied, but only one property specified', function() {
			
			PostService.deleteByID(userId, validID);
			
			const deletedPost = PostService.getById(validID);
			
			expect(deletedPost._id).to.not.exist();
		});
		
		
	});
	
});