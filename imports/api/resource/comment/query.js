module.exports = {
	generalComments : `query Comment($postId: String)
														{ comments(postId: $postId)
																	{ _id description title
																				post { _id }
																	}}`,
};