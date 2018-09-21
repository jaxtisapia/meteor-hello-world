export default {
	Query : {
		posts(_, args, { db }, ast) {
			return db.posts.astToQuery(ast).fetch();
		}
	}
}