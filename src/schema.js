import { merge } from 'lodash';
import { makeExecutableSchema } from 'apollo-server';
import { typeDef as Cuenta, resolvers as cuentaResolvers } from './cuenta';

const Query = `
	type Query {
		cuenta(): Cuenta
	}
`;

const resolvers = {
  Query: {
    cuenta: () => [
      {
        id: 1,
        nombre: 'cuenta 1',
        numero_cuenta: '111111',
        numero_cuenta_para_vista: '1-1-1-1-1-1-1-1',
      },
    ],
  },
};
makeExecutableSchema({
  typeDefs: [Query, Cuenta],
  resolvers: merge(resolvers, cuentaResolvers),
});
