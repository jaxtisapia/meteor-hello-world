module.exports = {
	generalComments : `query Comment($postId: String)
														{ comments(postId: $postId)
																	{ _id description title
																				post { _id }
																	}}`,
	
	createComment : `mutation Comment($title: String, $description: String, $postId: String )
													{ createComment( title: $title, description: $description, postId: $postId ) }`
	
};