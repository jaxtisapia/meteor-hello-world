import route from './router.js'
import Home from '/imports/ui/Home';
import Login from '/imports/ui/page/user/Login';
import Register from '/imports/ui/page/user/Register';
import PostAdd from '/imports/ui/page/post/PostAdd';
import PostList from '/imports/ui/page/post/PostList';
import PostEdit from '/imports/ui/page/post/PostEdit';
import CommentList from '/imports/ui/page/comment/CommentList';
import CommentAdd from '/imports/ui/page/comment/CommentAdd';
import CommentEdit from '/imports/ui/page/comment/CommentEdit';

route('/', Home);

route('/login', Login);
route('/register', Register);

route('/posts/add', PostAdd);
route('/posts', PostList);
route('/posts/edit/:_id', PostEdit);

route('/posts/:postId/comments', CommentList);
route('/posts/:postId/comments/add', CommentAdd);
route('/posts/:postId/comments/:commentId/edit', CommentEdit);
