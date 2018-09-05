import Helper from '/imports/services/helper';

const post = {
	FIND: 'find',
	FIND_ONE: 'find_one',
	DELETE_ONE: 'delete_one',
	CREATE: 'create',
	COUNT_ALL: 'count_all',
	UPDATE_ONE: 'update_one',
};

export default Helper.enumify('post', post);