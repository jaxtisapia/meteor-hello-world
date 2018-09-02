import POST from '/imports/constant/post';
import DEFAULT_CONSTANT from '/imports/constant/default';
import Security from '/imports/api/security';
import PostService from '/imports/api/resource/post/service';

Meteor
	.methods(
		{
			/**
			 * RPC Call to create a new Post
			 * @param {object} post - An object describing your post. Ex, {title: 'Some Title', description: 'Some
			 *   Description'}
			 * @return {string} The Unique Id of the Post created. Ex, ud7dCXssadas8ysn
			 */
			[POST.CREATE](post) {
				Security.isLoggedIn(this.userId);
				
				post.userId = this.userId;
				return PostService.create(post);
			},
			
			/**
			 * RPC Call to get Posts
			 * @param {int} page - Page Number of expectant result
			 * @param {int} count - Number of post items per page
			 * @return {{posts, meta}} A list of posts in 'posts' object && Page details in 'meta' object
			 *
			 * Example { posts: [...somePosts], meta: { page: 2, count: 20} }
			 */
			[POST.FIND](page, count) {
				if ( ! page ) page = DEFAULT_CONSTANT.PAGE_NUMBER;
				if ( ! count ) count = DEFAULT_CONSTANT.PAGE_LIMIT;
				return PostService.get({ page, count })
			},
			
			/**
			 * RPC Call to get single Post By Id
			 * @param {string} postId - Unique Post Id
			 * @return {object} A Post Item. Ex, { _id, title, description, userId }
			 */
			[POST.FIND_ONE](postId) {
				return PostService.getById(postId)
			},
			
			/**
			 * RPC Call to update a single Post By Id
			 * @param {string} postId - Unique Post Id, Id of Post to be updated.
			 * @param {object} updateDocument - Details of parameters to update the existing Post. Ex, {title, description}
			 * @return {object} Updated Post Object if updated, otherwise unupdated Post if no change was made
			 */
			[POST.UPDATE_ONE](postId, updateDocument) {
				Security.isLoggedIn(this.userId);
				return PostService.updateByID(this.userId, postId, updateDocument);
			},
			
			/**
			 * RPC Call to delete a single Post By Id
			 * @param {string} postId - Unique Post Id, Id of Post to be updated.
			 */
			[POST.DELETE_ONE](postId) {
				Security.isLoggedIn(this.userId);
				return PostService.deleteByID(this.userId, postId);
			}
			
		});
