const { PrismaClient } = require('@prisma/client');

let prisma;

//Ensures only one instance of PrismaClient is created
if (!global._prisma) {
    global._prisma = new PrismaClient();
}

prisma = global._prisma;

module.exports = prisma;

