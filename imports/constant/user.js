import Helper from '/imports/services/helper';

const user = {
	FIND: 'find',
	DELETE_BY_ID: 'delete_by_id',
	CREATE: 'create',
	UPDATE: 'update',
};

export default Helper.enumify('user', user);