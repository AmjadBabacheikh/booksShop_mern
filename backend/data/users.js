import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Amjad Babacheikh',
    email: 'amjad@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Saad Babacheikh',
    email: 'saad@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
];

export default users;
