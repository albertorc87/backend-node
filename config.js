const config = {
    dbUrl: 'mongodb://admin:admin@localhost:27017/admin',
    port: '3000',
    host: 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || '/app'
}

module.exports = config