import { DataSource } from "typeorm";

const serverConfig = {
  port: +process.env.PORT || 3001,

  routes: {
    games: '/games',
    scores: '/scores',
    authenticate: '/authenticate'
  },

  token: {
    clientId: process.env.SERVER_CLIENT_ID,
    clientSecret: process.env.SERVER_CLIENT_SECRET,
    redirectUri: process.env.SERVER_REDIRECT_URI
  },

  dbSource: new DataSource({
    type: "postgres",
    host: process.env.POSTGRESQL_HOST,
    port: +process.env.POSTGRESQL_PORT,
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    entities: [
      "**/src/entities/**/*{.ts,.js}"
    ],
    synchronize: true,
    logging: false,
  })
};

export default serverConfig;
