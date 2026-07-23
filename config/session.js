const expressSession = require("express-session");
require("dotenv/config");
const { PrismaPg } = require("@prisma/adapter-pg"); // For other db adapters, see Prisma docs
const { PrismaClient } = require("../generated/prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

// DATABASE_URL defined in env file included in prisma.config.js; see Prisma docs
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const sessionConfig = expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
  },
  secret: "a santa at nasa",
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});

module.exports = sessionConfig;
