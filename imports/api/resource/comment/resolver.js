import CommentService from '/imports/api/resource/comment/service';
import Security from '/imports/api/security';


export default {
	Query : {
		comments(_, args, { db }, ast) {
			return db.comments.astToQuery(ast, { $filters : args }).fetch();
		},
		
		comment(_, args, { db }, ast) {
			return db.comments.astToQuery(ast, { $filters : args }).fetchOne();
		}
	},
	
	Mutation : {
		createComment(_, comment, { userId }) {
			Security.isLoggedIn(userId);
			
			const { postId } = comment;
			comment.userId = userId;
			
			return CommentService.create(postId, comment);
		},
		
		updateComment(_, { commentId, title, description }, { userId }) {
			Security.isLoggedIn(userId);
			return CommentService.updateByCommentId(userId, commentId, { title, description });
		},
		
		deleteComment(_, { commentId }, { userId }) {
			Security.isLoggedIn(userId);
			return CommentService.deleteByCommentId(userId, commentId);
		}
		
	}
}