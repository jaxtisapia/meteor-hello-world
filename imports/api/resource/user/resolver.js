export default {
	Query : {
		users(_, args, { db }, ast) {
			return db.users.astToQuery(ast).fetch();
		}
	}
}