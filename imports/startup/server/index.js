import { definitions as DomainDef, resolvers as DomainResolver } from '/imports/api/apollo/domain'
import '/imports/api/methods';
import '/imports/api/publications';
// import { definitions as UserDef, resolvers as UserResolver } from '/imports/apollo/user'
import { load } from 'graphql-load';

import { initialize } from 'meteor/cultofcoders:apollo';

const localQuery = {
	Query : { sayHello : () => 'Hello world!', sayMasa : () => 'Hello masa!' },
	Mutation : {
		addMe(root, args, context) {
			console.log(context)
			return args.name
		}
	}
};

const logger = { log : e => console.error(e.stack) };

load({
	     typeDefs : [`type Query { sayHello: String }`,
		     `type Query { sayMasa: String }`,
		     `type Mutation { addMe(name:String):String }`,
		     DomainDef],
	
	     resolvers : [localQuery, DomainResolver],
	
	     logger
     });

initialize();