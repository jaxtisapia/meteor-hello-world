module.exports = {
	generalComments : `query Comment($postId: String)
														{ comments(postId: $postId)
																	{ _id description title
																				post { _id }
																	}}`,
	
	getComment : `query Comment($commentId: String)
													{ comment (_id: $commentId) { _id description title
																											post { _id } }}`,
	
	createComment : `mutation Comment($title: String, $description: String, $postId: String )
													{ createComment( title: $title, description: $description, postId: $postId ) }`,
	
	
	updateComment : `mutation Comment( $commentId:String, $title:String, $description: String)
													{ updateComment( commentId: $commentId, title: $title, description: $description ) }`
	
};