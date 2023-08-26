import bcrypt from "bcryptjs";

const users = [
{
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
},
{
    name: 'Tony Stark',
    email: 'tony@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
},
{
    name: 'Bruno Fernandes',
    email: 'bruno@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
},
]


export default users