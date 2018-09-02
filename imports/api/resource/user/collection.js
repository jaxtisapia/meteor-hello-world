import { Mongo } from 'meteor/mongo';
import UserSchema from './schema';

const Users = new Mongo.Collection('accounts');

Users.attachSchema(UserSchema);

export default Users;