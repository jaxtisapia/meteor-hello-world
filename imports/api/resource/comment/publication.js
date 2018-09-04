import { Comments } from '/db';
import COMMENT_CONSTANT from '/imports/constant/comment'

Meteor.publish(COMMENT_CONSTANT.FIND, () => {
	return Comments.find();
});