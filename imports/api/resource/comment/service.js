import Comment from '/imports/api/resource/comment/collection';
import PostService from '/imports/api/resource/post/service';
import ERRORS from '/imports/constant/error'

class CommentService {
	
	/**
	 * Create a new comment for a Post
	 * @param {string} postId - Unique Post Id
	 * @param {object} comment - Comment Document to be attached/linked to a Post
	 * @return {string} Comment Id of the create Comment Document
	 */
	static create(postId, comment) {
		
		const post = PostService.getById(postId);
		
		if ( ! post ) throw new Meteor.Error(ERRORS.POST.NOT_FOUND);
		
		return Comment.insert(comment)
	}
	
	static updateByCommentId(userId, commentId, updateDocument) {
		
		const comment = CommentService.getByCommentId(commentId);
		
		if ( ! comment ) throw new Meteor.Error(ERRORS.COMMENT.NOT_FOUND);
		
		const isOwnerOfComment = (comment.userId === userId);
		if ( ! isOwnerOfComment ) throw new Meteor.Error(ERRORS.COMMENT.CANNOT_EDIT);
		
		return Comment.update({ _id : commentId }, {
			$set : { title : updateDocument.title, description : updateDocument.description }
		});
		
	}
	
	static getByCommentId(commentId) {
		return Comment.findOne({ _id : commentId })
	}
	
	static get({ postId, page, count }) {
		const meta = { page, count };
		const skip = (page - 1) * count;
		
		const comments = Comment.find({ postId }, { skip, limit : count }).fetch();
		
		return { comments, meta };
	}
	
	static deleteByCommentId(userId, commentId) {
		
		if ( ! userId ) throw new Meteor.Error(ERRORS.USER.ID_UNSPECIFIED);
		if ( ! commentId ) throw new Meteor.Error(ERRORS.COMMENT.ID_UNSPECIFIED);
		
		let comment = CommentService.getByCommentId(commentId);
		
		let postId = (! comment) ? '' : comment.postId;
		let post = PostService.getById(postId);
		
		const isOwnerOfComment = (comment.userId === userId);
		const isOwnerOfPost = (post.userId === userId);
		
		const isEligibleToDeleteComment = (isOwnerOfComment || isOwnerOfPost);
		
		if ( ! comment ) throw new Meteor.Error(ERRORS.COMMENT.NOT_FOUND);
		if ( ! isEligibleToDeleteComment ) throw new Meteor.Error(ERRORS.COMMENT.CANNOT_DELETE);
		
		return CommentService._delete(commentId);
		
	}
	
	
	static deleteCommentsByPostId(userId, postId) {
		
		let post = PostService.getById(postId);
		
		if ( ! post ) throw new Meteor.Error(ERRORS.POST.NOT_FOUND);
		
		const isOwnerOfPost = (post.userId === userId);
		if ( ! isOwnerOfPost ) throw (ERRORS.COMMENT.CANNOT_DELETE_MANY);
		
		return this._deleteMany(postId)
	}
	
	static _deleteMany(postId) {
		return Comment.remove({ postId });
	}
	
	static _delete(commentId) {
		return Comment.remove({ _id : commentId })
	}
}

export default CommentService