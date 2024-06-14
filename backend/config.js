module.exports = {
  keycloak: {
    clientID: 'your-client-id',
    clientSecret: 'your-client-secret',
    realm: 'your-realm',
    serverUrl: 'http://keycloak:8080/auth'
  },
  database: {
    uri: 'mysql://user:password@maxscale/dbname'
  }
};
