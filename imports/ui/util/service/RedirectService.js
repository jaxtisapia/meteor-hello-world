import route from '/imports/routing/router';

export default class RedirectService {
	
	static toPosts() {
		route.go('/posts')
	}
	
	static toEditComment(postId, commentId) {
		route.go(`/posts/${postId}/comments/${commentId}/edit`)
	}
	
	static toComments(postId) {
		route.go(`/posts/${postId}/comments`)
	}
	
	static toAddComment(postId) {
		route.go(`/posts/${postId}/comments/add`)
	}
	
	static toEditPost(postId) {
		route.go(`/posts/edit/${postId}`)
	}
};