import { COMMENT } from '/imports/constant';

export default class CommentService {
	
	static deleteOne = (commentId, callback) => Meteor.call(COMMENT.DELETE_ONE, commentId, callback);
	
}