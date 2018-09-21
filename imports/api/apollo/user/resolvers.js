const resolve = {
	User : {
		fullName(user) {
			return `${user.firstName} and ${user.lastName} `
		}
	}
};

const query = {
	Query : {
		users() {
			return [
				{ firstName : 'Theodor', lastName : 'Diaconu' },
				{ firstName : 'Claudiu', lastName : 'Roman' },
			]
		}
	}
};

const resolvers = { ... resolve, ... query };

export default resolvers;