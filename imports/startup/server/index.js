import '/imports/api/methods';
import '/imports/api/publications';

import { definitions as UserDef, resolvers as UserResolver } from '/imports/apollo/user'
import { load } from 'graphql-load';

import { initialize } from 'meteor/cultofcoders:apollo';

const localQuery = {
	Query : { sayHello : () => 'Hello world!', sayMasa : () => 'Hello masa!' }
};

load({
	     typeDefs : [`type Query { sayHello: String }`, `type Query { sayMasa: String }`, UserDef],
	     resolvers : [localQuery, UserResolver],
     });

initialize();