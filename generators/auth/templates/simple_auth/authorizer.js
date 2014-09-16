// app/index.html
window.ENV = window.ENV || {};
window.ENV['simple-auth'] = {
  authorizer: 'authorizer:token',
  // crossOriginWhitelist: ['https://api.example.com']
}
window.ENV['simple-auth-token'] = {
  // serverTokenEndpoint: 'https://api.example.com/auth/signin/',
  // authorizationPrefix: 'JWT ',
  // tokenPropertyName: 'authToken',
  // authorizationHeaderName: 'X-Auth'
}