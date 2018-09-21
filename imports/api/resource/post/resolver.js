import PostService from '/imports/api/resource/post/service';
import Security from '/imports/api/security';

export default {
	Query : {
		posts(_, args, { db }, ast) {
			console.log(args);
			return db.posts.astToQuery(ast, args).fetch();
		}
	},
	
	Mutation : {
		
		createPost(_, post, { userId }) {
			Security.isLoggedIn(userId);
			post.userId = this.userId;
			
			return PostService.create(post);
		},
		
		updatePost(_, { postId, updateDocument }, { userId }) {
			Security.isLoggedIn(userId);
			return PostService.updateByID(userId, postId, updateDocument);
		},
		
		deletePost(_, postId, { userId }) {
			Security.isLoggedIn(userId);
			return PostService.deleteByID(userId, postId);
		}
		
	}
}