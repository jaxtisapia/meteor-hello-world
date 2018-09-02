import Helper from '/imports/services/helper';

const comment = {
	FIND: 'find',
	FIND_ONE : 'find_one',
	DELETE_ONE : 'delete_one',
	UPDATE_ONE : 'update_one',
	CREATE: 'create',
};

export default Helper.enumify('comment', comment);