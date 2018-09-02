import route from './router.js'
import Home from '/imports/ui/Home';
import Login from '/imports/ui/page/user/Login';
import Register from '/imports/ui/page/user/Register';
import PostAdd from '/imports/ui/page/post/PostAdd';
import PostList from '/imports/ui/page/post/PostList';
import PostEdit from '/imports/ui/page/post/PostEdit';

route('/', Home);

route('/login', Login);
route('/register', Register);

route('/posts/add', PostAdd);
route('/posts', PostList);
route('/posts/edit/:_id', PostEdit);