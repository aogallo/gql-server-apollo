export const typeDef = `
	type Cuenta {
		id: Int!
		nombre: String!
		numero_cuenta: String!
		numero_cuenta_para_vista: String
	}
`;

export const revolvers = {
  Cuenta: {
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
