const GraphQL = require('graphql');

const UserType = require('./UserType');
const User = require('./../models/user.model');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = GraphQL;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
