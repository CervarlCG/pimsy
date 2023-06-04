export default () => ({
  port: process.env.PORT || 3000,
  database: {
    asd: console.log(process.env),
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
  },
});
