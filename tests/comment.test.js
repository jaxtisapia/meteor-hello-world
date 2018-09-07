import { expect } from 'chai';
import { Comments } from '/db';
import { CommentService } from '/imports/services';

describe('Comment', () => {
	
	const title = 'some title';
	const description = 'some description';
	
	const invalidPostId = 'someInvalidPostId';
	const validPostId = 'evPLTSnfAs8mi7nvG';
	
	const validUserId = 'evPLTSnfAs8mi7nvG';
	
	const commenterId = 'ntmevdAJT5XCCJpxw';
	const posterId = 'ntmevdAJT5XCCJpxw';
	
	let createdCommentId;
	
	before(function() {
		
		// create comments for mocking positive behaviour
		createdCommentId = CommentService.create(commenterId, {title, postId: validPostId, description});
		
	});
	
	after(function() {
		// clear the database
		if ( Meteor.isDevelopment ) Comments.remove({});
	});
	
	it('should NOT create a comment only with an invalid Post id', () => {
		
		const comment = { title, description, userId : validUserId };
		const commentId = CommentService.create(invalidPostId, comment);
		
		expect(commentId).to.not.be.a('string');
	});
	
	it('should create a comment only with a valid Post id', () => {
		
		const comment = { title, description, userId : validUserId };
		const commentId = CommentService.create(validPostId, comment);
		
		expect(commentId).to.be.a('string');
	});
	
	
	it('should delete a comment when comment id is that of the commenter', () => {
		
		const commentDelete = CommentService.deleteByCommentId;
		expect(commentDelete(commenterId, createdCommentId)).to.not.throw();
	});
	
	it('should delete a comment when post id is that of the poster', () => {
		
		const commentDelete = CommentService.deleteByCommentId;
		expect(commentDelete(posterId, createdCommentId)).to.not.throw();
	});
	
});