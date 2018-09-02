import Post from '/imports/api/resource/post/collection';
import DEFAULT_CONSTANT from '/imports/constant/default'
import ERRORS from '/imports/constant/error'

class PostService {
	
	/**
	 * Create a new Post Item
	 */
	static create(post) {
		return Post.insert(post);
	};
	
	/**
	 * Get a list of Post Items, limited by pages and limits of results
	 * @return {{posts: Array, meta: {page: number, count: number}}}
	 */
	static get({ page, count } = { page : DEFAULT_CONSTANT.PAGE_NUMBER, count : DEFAULT_CONSTANT.PAGE_LIMIT }) {
		
		const meta = { page, count };
		const skip = (page - 1) * count;
		
		const posts = Post.find({}, { skip, limit : count }).fetch();
		
		return { posts, meta };
	};
	
	/**
	 * Get a Post Item by Id
	 *
	 * When no Post Id is supplied, it returns an empty object {}
	 * When no Post is found with that Post Id, it returns an empty object {}
	 * When valid Post Id is supplied, it successfully returns a valid Post Item
	 */
	static getById(postId) {
		// Check for an empty, undefined or non-supplied postId
		if ( ! postId ) return {};
		
		const post = Post.findOne({ _id : postId });
		
		// Return a n empty object when no post with that Id found, else return the Post Item
		return (! post) ? {} : post;
	};
	
	/**
	 * Update a Post Item by supplying a post Id
	 *
	 * @throws {Meteor.Error} When no userId supplied
	 * @throws {Meteor.Error} When no postId supplied
	 * @throws {Meteor.Error} When no update paramters are supplied
	 * @throws {Meteor.Error} When no post is found with supplied Post Id
	 * @throws {Meteor.Error} When userId is not the author of the Post, and not an Admin as well
	 */
	static updateByID(userId, postId, updateDocument) {
		
		if ( ! userId ) throw new Meteor.Error(ERRORS.USER.ID_UNSPECIFIED);
		if ( ! postId ) throw new Meteor.Error(ERRORS.POST.ID_UNSPECIFIED);
		if ( ! updateDocument ) throw Meteor.Error(ERRORS.UPDATED_DOCUMENT.NOT_SPECIFIED);
		
		let post = Post.findOne({ _id : postId });
		
		if ( ! post ) throw new Meteor.Error(ERRORS.POST.NOT_FOUND);
		if ( post.userId !== userId ) throw new Meteor.Error(ERRORS.POST.CANNOT_EDIT);
		
		const result = Post.update({ _id : postId }, {
			$set : { title : updateDocument.title, description : updateDocument.description }
		});
		
		return (result === 1 ) ? this.getById(postId) : post;
	};
	
	/**
	 * Delete a Post Item by a supplied Post Id
	 *
	 * @throws {Meteor.Error} When no userId supplied
	 * @throws {Meteor.Error} When no postId supplied
	 * @throws {Meteor.Error} When no post is found with supplied Post Id
	 * @throws {Meteor.Error} When userId is not the author of the Post, and not an Admin as well
	 */
	static deleteByID(userId, postId) {
		
		if ( ! userId ) throw new Meteor.Error(ERRORS.USER.ID_UNSPECIFIED);
		if ( ! postId ) throw new Meteor.Error(ERRORS.POST.ID_UNSPECIFIED);
		
		let post = Post.findOne({ _id : postId, userId });
		
		if ( ! post ) throw new Meteor.Error(ERRORS.POST.NOT_FOUND);
		if ( post.userId !== this.userId ) throw new Meteor.Error(ERRORS.POST.CANNOT_EDIT);
		
		return Post.remove({ _id : postId });
	};
	
}

export default PostService