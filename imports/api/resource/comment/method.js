import COMMENT from '/imports/constant/comment';
import Security from '/imports/api/security';
import CommentService from '/imports/api/resource/comment/service';

Meteor
	.methods(
		{
			/**
			 * RPC Call to create a new Comment
			 * @param {object} comment - An object describing your comment. Ex, {title: 'Some Title', description: 'Some
			 *   Description'}
			 * @return {string} The Unique Id of the Comment created. Ex, ud7dCXssadas8ysn
			 */
			[COMMENT.CREATE](comment) {
				Security.isLoggedIn(this.userId);
				return CommentService.create(comment);
			},
			
			/**
			 * RPC Call to get Comments
			 * @param {int} page - Page Number of expectant result
			 * @param {int} count - Number of comment items per page
			 * @return {{comments, meta}} A list of comments in 'comments' object && Page details in 'meta' object
			 *
			 * Example { comments: [...someComments], meta: { page: 2, count: 20} }
			 */
			[COMMENT.FIND] (page, count) {
				if ( ! page ) page = DEFAULT_CONSTANT.PAGE_NUMBER;
				if ( ! count ) count = DEFAULT_CONSTANT.PAGE_LIMIT;
				return CommentService.get({ page, count })
			},
			
			/**
			 * RPC Call to get single Comment By Id
			 * @param {string} commentId - Unique Comment Id
			 * @return {object} A Comment Item. Ex, { _id, title, description, userId }
			 */
			[COMMENT.FIND_ONE] (commentId) {
				return CommentService.getById(commentId)
			},
			
			/**
			 * RPC Call to update a single Comment By Id
			 * @param {string} commentId - Unique Comment Id, Id of Comment to be updated.
			 * @param {object} updateDocument - Details of parameters to update the existing Comment. Ex, {title, description}
			 * @return {object} Updated Comment Object if updated, otherwise unupdated Comment if no change was made
			 */
			[COMMENT.UPDATE_ONE] (commentId, updateDocument) {
				Security.isLoggedIn(this.userId);
				return CommentService.updateByID(this.userId, commentId, updateDocument);
			},
			
			/**
			 * RPC Call to delete a single Comment By Id
			 * @param {string} commentId - Unique Comment Id, Id of Comment to be updated.
			 */
			[COMMENT.DELETE_ONE](commentId) {
				Security.isLoggedIn(this.userId);
				return CommentService.deleteByID(this.userId, commentId);
			}
			
		});
