const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: Bun.password.hashSync('123456', {
        algorithm: "bcrypt",
        cost: 10
    }),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password:  Bun.password.hashSync('123456', {
        algorithm: "bcrypt",
        cost: 10
    }),
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    password:  Bun.password.hashSync('123456', {
        algorithm: "bcrypt",
        cost: 10
    }),
  },
];

export default users;