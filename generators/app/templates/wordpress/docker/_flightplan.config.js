/* ========================================
 * Config
 * ======================================== */

export default config = {
  production: {
    host: process.env.PROD_SSH_HOST,
    username: process.env.PROD_SSH_USER,
    port: process.env.PROD_SSH_PORT,
    agent: process.env.SSH_AUTH_SOCK,
    readyTimeout: 999999,
    opts: {
      webRoot: '/var/www/webroot/ROOT/',
    },
  },
  productionDB: {
    host: process.env.PROD_DB_SSH_HOST,
    username: process.env.PROD_DB_SSH_USER,
    port: process.env.PROD_DB_SSH_PORT,
    agent: process.env.SSH_AUTH_SOCK,
    readyTimeout: 999999,
    opts: {
      webRoot: '~/',
      url: '<%= appURL %>',
      dbName: process.env.PROD_DB_NAME,
      dbUser: process.env.PROD_DB_USER,
      dbPw: process.env.PROD_DB_PASSWORD,
    },
  }
}