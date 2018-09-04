import POST from '/imports/constant/post';
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
			 * @return [] A list of posts
			 *
			 * Example [{..postItems},{...postItems},{...postItems}]
			 */
			[POST.FIND]() {
				return PostService.get()
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
