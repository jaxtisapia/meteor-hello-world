class Helper {
	
	/***
	 * Create a unique enum object with a label and an object
	 * Prepends provided label to all object elements to achieve uniqueness
	 *
	 * Example:
	 * object = { FIND_ONE: 'find_one', SEARCH: 'search'}
	 * label = 'comments'
	 * enumify(label, object) => { FIND_ONE: 'comments.find_one', SEARCH: 'comments.search'}
	 *
	 * @param label String to append to each object's key value
	 * @param object Object with different keys
	 * @return The input object, with each value, prepended by the provided label
	 */
	static enumify(label, object) {
		
		Object.keys(object).forEach((key) => {
			object[key] = this._appendPrefix(label, object[key])
		});
		
		return object;
	}
	
	/***
	 * Appends prefix to a message, separated by a dot
	 *
	 * Example:
	 * prefix = 'someprefix'
	 * message = 'somemessage'
	 * _appendPrefix(prefix, message) => 'someprefix.somemessage'
	 *
	 * @private
	 */
	static _appendPrefix(prefix, message) {
		return `${prefix}.${message}`
	}
	
}

export default Helper;