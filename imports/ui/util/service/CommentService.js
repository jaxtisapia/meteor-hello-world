import { COMMENT } from '/imports/constant';

export default class CommentService {
	
	static add = (comment, callback) => Meteor.call(COMMENT.CREATE, comment, callback);
	
	static get = (postId, callback) => Meteor.call(COMMENT.FIND, postId, callback);
	
	static getOne = (commentId, callback) => Meteor.call(COMMENT.FIND_ONE, commentId, callback);
	
	static update = (commentId, updateDocument, callback) => Meteor.call(COMMENT.UPDATE_ONE, commentId, updateDocument, callback);
	
	static deleteOne = (commentId, callback) => Meteor.call(COMMENT.DELETE_ONE, commentId, callback);
	
}