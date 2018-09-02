import PostService from 'imports/api/resource/post/service';
import Comment from '/imports/api/resource/comment/collection';
import ERRORS from '/imports/constant/error'

class CommentService {
	
	static create(postId, comment) {
		
		const post = PostService.getById(postId);
		
		if ( ! post ) throw new Meteor.Error(ERRORS.POST.NOT_FOUND);
		
		Comment.insert(comment)
	}
	
	static updateByCommentId(userId, commentId, updateDocument) {
		
		const comment = this.getCommentById(commentId);
		
		if ( ! comment ) throw new Meteor.Error(ERRORS.COMMENT.NOT_FOUND);
		if ( comment.userId !== userId ) throw new Meteor.Error(ERRORS.COMMENT.CANNOT_EDIT);
		
		return Comment.update({ _id : commentId }, {
			$set : { title : updateDocument.title, description : updateDocument.description }
		});
		
	}
	
	static getByCommentId(commentId) {
		return Comment.find({ _id : commentId })
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
		
		let comment = this.getCommentById(commentId);
		
		let postId = (! comment) ? '' : comment.postId;
		let post = PostService.getById(postId);
		
		if ( ! comment ) throw new Meteor.Error(ERRORS.COMMENT.NOT_FOUND);
		if ( comment.userId !== userId || post.userId !== userId ) throw new Meteor.Error(ERRORS.COMMENT.CANNOT_DELETE);
		
		return this._delete(commentId);
		
	}
	
	
	static deleteCommentsByPostId(userId, postId) {
		
		let post = PostService.getById(postId);
		
		if ( ! post ) throw new Meteor.Error(ERRORS.POST.NOT_FOUND);
		if ( post.userId !== userId ) throw (ERRORS.COMMENT.CANNOT_DELETE_MANY);
		
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