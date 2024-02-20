const zod = require('zod');
const { ObjectId } = require('mongodb');

const createUser = zod.object({
    name: zod.string(),
    phone: zod.string(),
    email: zod.string(),
    password: zod.string(),
})

module.exports = { 
    createUser: createUser }