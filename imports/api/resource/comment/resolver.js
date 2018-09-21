import CommentService from '/imports/api/resource/comment/service';
import Security from '/imports/api/security';


export default {
	Query : {
		comments(_, args, { db }, ast) {
			console.log(args, db, ast);
			return db.comments.astToQuery(ast).fetch();
		}
	},
	
	Mutation : {
		createComment(_, comment, { userId }) {
			Security.isLoggedIn(userId);
			
			const { postId } = comment;
			return CommentService.create(postId, comment);
		},
		
		updateComment(_, { commentId, updateDocument }, { userId }) {
			Security.isLoggedIn(userId);
			return CommentService.updateByCommentId(userId, commentId, updateDocument);
		},
		
		deleteComment(_, commentId, { userId }) {
			Security.isLoggedIn(userId);
			return CommentService.deleteByCommentId(userId, commentId);
		}
		
	}
}