import SimpleSchema from 'simpl-schema';
import PostSchema from '../post/schema';

const Schema = new SimpleSchema(
	{ postId : { type : String, optional : false } }
);

Schema.extend(PostSchema);

export default Schema;