db.createUser({
  user: "bantads",
  pwd: "bantads",
  roles: [
    {
      role: "dbOwner",
      db: "bantads",
    },
  ],
});

db.createCollection('usuarios');

db.usuarios.insertMany([
  {
    nome: 'Admin',
    email: 'admin@email.com',
    password: 'admin',
    role: 'ADMIN',
  },
  {
    nome: 'Gerente Luis',
    email: 'luis@gerente.com',
    password: 'gerente',
    role: 'GERENTE',
  },
])
