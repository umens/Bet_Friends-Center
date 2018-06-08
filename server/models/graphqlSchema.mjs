import { UserRootQuery, UserRootMutation } from './user.model.mjs';
import schemaComposer from 'graphql-compose';

const rootQuery = {};
const rootMutation = {};

Object.assign(rootQuery, UserRootQuery);
Object.assign(rootMutation, UserRootMutation);

schemaComposer.schemaComposer.rootQuery().addFields(rootQuery);
schemaComposer.schemaComposer.rootMutation().addFields(rootMutation);

const graphqlSchema = schemaComposer.schemaComposer.buildSchema();
export { graphqlSchema };
