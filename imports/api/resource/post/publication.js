import { Posts } from '/db';
import POST_CONSTANT from '/imports/constant/post'

Meteor.publish(POST_CONSTANT.COUNT_ALL, () => {
	return Posts.find();
});