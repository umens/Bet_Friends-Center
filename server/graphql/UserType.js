const GraphQL = require('graphql');

const { GraphQLObjectType, GraphQLString } = GraphQL;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    picture: {
      type: GraphQLString
    }
  })
});

module.exports = UserType;
