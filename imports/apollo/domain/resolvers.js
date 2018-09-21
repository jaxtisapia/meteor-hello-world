export default {
	Query : {
		comments(_, args, { db }, ast) {
			console.log(args, db, ast);
			return db.comments.astToQuery(ast).fetch();
		},
		posts(_, args, { db }, ast) {
			return db.posts.astToQuery(ast).fetch();
		},
	}
}