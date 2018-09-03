import { POST } from '/imports/constant';

export default class PostService {
	
	static add = (post, callback) => Meteor.call(POST.CREATE, post, callback);
	
	static get = (page, limit, callback) => Meteor.call(POST.FIND, callback);
	
	static getOne = (postId, callback) => Meteor.call(POST.FIND_ONE, postId, callback);
	
	static update = (postId, updateDocument, callback) => Meteor.call(POST.UPDATE_ONE, postId, updateDocument, callback);
	
	static deleteOne = (postId, callback) => Meteor.call(POST.DELETE_ONE, postId, callback);
}