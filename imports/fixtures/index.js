import createUsers from './createUsers';
import createPostsForUsers from './createPostsForUsers';
const runFixtures = function () {
	const shouldRun = Meteor.users.find().count() === 0;
	
	if (shouldRun) {
		createUsers();
		createPostsForUsers();
	}
};

if (!Meteor.isDevelopment) {
	runFixtures();
}