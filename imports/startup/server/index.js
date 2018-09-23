import { CommentDefinition, PostDefinition, UserDefinition } from '/imports/api/definitions.graphql'
import '/imports/api/methods';
import '/imports/api/publications';
import { CommentResolver, PostResolver, UserResolver } from '/imports/api/resolvers.graphql'
import { load } from 'graphql-load';
import { initialize } from 'meteor/cultofcoders:apollo';


load({
	     typeDefs : [CommentDefinition, PostDefinition, UserDefinition],
	     resolvers : [CommentResolver, PostResolver, UserResolver]
     });

initialize();