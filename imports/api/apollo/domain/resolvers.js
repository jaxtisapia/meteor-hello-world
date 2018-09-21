export default {
	Query : {
		comments(_, args, { db }, ast) {
			console.log(args, db, ast);
			return db.comments.astToQuery(ast).fetch();
		},
		
		posts(_, args, { db }, ast) {
			return db.posts.astToQuery(ast).fetch();
		},
		
		users(_, args, { db }, ast) {
			return db.users.astToQuery(ast).fetch();
		}
	},
	
	
	Mutation : {
		addPost(_, { title, description }, { db, user }) {
			console.log(user);
			return db.posts.insert({ title, description, userId : 'bongo' })
		},
		
		// addCommentToPost(_, { postId, title, description }, { db }) {
		// 	const comment = { text, postId };
		// 	return db.comments.insert(comment);
		// }
	}
}