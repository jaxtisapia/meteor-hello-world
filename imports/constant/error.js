const error = {
	// user related errors
	USER: {
		ID_UNSPECIFIED: 'User Id not Specified',
		NOT_FOUND: 'User does not exist',
		CANNOT_EDIT: 'Cannot edit this User. You must be an Administrator, or an Owner of this account'
	},
	
	// post related errors
	POST: {
		ID_UNSPECIFIED: 'Post Id not Specified',
		NOT_FOUND: 'Post does not exist',
		CANNOT_EDIT: 'Cannot edit this Post. You must be an Administrator, or an Owner of this Post'
	},
	
	// comment related errors
	COMMENT: {
		ID_UNSPECIFIED: 'Comment Id not Specified',
		NOT_FOUND: 'Comment does not exist',
		CANNOT_EDIT: 'Cannot edit this Comment. You must be an Administrator, or an Owner of this Comment, or an Owner of the Post'
	},
	
	// update document
	UPDATED_DOCUMENT: {
		NOT_SPECIFIED: 'Nothing to update the document with'
	}
};

export default error;