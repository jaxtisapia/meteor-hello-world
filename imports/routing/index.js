import { CommentAdd, CommentEdit, CommentList } from '/imports/ui/page/comment';
import { PostAdd, PostEdit, PostList } from '/imports/ui/page/post';

import { Login, Register } from '/imports/ui/page/user';
import route from './router'

route('/', Login);

route('/login', Login);
route('/register', Register);

route('/posts/add', PostAdd);
route('/posts', PostList);
route('/posts/:postId/edit/', PostEdit);

route('/posts/:postId/comments', CommentList);
route('/posts/:postId/comments/add', CommentAdd);
route('/posts/:postId/comments/:commentId/edit', CommentEdit);
