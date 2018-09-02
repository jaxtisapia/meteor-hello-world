class Helper {
	
	static enumify(label, object) {
		
		Object.keys(object).forEach((key) => {
			object[key] = this._appendPrefix(label, object[key])
		});
		
		return object;
	}
	
	static _appendPrefix(prefix, message) {
		return `${prefix}.${message}`
	}
	
}

export default Helper;