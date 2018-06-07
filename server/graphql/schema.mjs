import { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema 
} from 'graphql';

import { UserType } from "./UserType";
import { User } from '../models';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => {[{
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
  }]}
});

// module.exports = new GraphQLSchema({
//   query: RootQuery
// });

const schema = new GraphQLSchema({
  query: RootQuery
});

export { schema };
