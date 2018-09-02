class Helper {
	
	static enumify(label, object) {
		
		Object.keys(object).forEach((key) => {
			const newValue = this._appendPrefix(label, object[key]);
			object[key] = newValue
		});
		
		return object;
	}
	
	static _appendPrefix(prefix, message) {
		return `${prefix}.${message}`
	}
	
}

export default Helper;