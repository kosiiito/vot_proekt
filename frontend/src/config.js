const config = {
  backendUrl: process.env.BACKEND_URL || 'http://localhost:8080',
  keycloak: {
    url: process.env.KEYCLOAK_URL || 'http://localhost:8080/auth',
    realm: 'your-realm',
    clientId: 'your-client-id'
  }
};

export default config;
