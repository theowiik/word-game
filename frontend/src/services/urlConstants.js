const isProduction = process.env.NODE_ENV == 'production';

export const websocketBaseUrl = isProduction
  ? ''
  : 'http://localhost:8080';

export const apiBaseUrl = isProduction
  ? '/api/v1'
  : 'http://localhost:8080/api/v1';
