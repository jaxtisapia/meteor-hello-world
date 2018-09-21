module.exports = {
	generalGet : `query { posts { _id description title
											comments { title }
                  }}`,
	
	createPost : `mutation Post($title: String, $description: String )
													{ createPost( title: $title, description: $description ) }`
};