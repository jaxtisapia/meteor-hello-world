import route from '/imports/routing/router';

export default class RedirectService {
	
	/***
	 * /posts
	 */
	static toPosts = () => route.go('/posts');
	
	/***
	 * /posts/:postId/comments/:commentId/edit
	 */
	static toEditComment = (postId, commentId) => route.go(`/posts/${postId}/comments/${commentId}/edit`);
	
	/***
	 * /posts/:postId/comments/
	 */
	static toComments = (postId) => route.go(`/posts/${postId}/comments`);
	
	/***
	 * /posts/:postId/comments/add
	 */
	static toAddComment = (postId) => route.go(`/posts/${postId}/comments/add`);
	
	/***
	 * /posts/:postId/edit
	 */
	static toEditPost = (postId) => route.go(`/posts/${postId}/edit`);
	
};