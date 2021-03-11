const isProduction = process.env.NODE_ENV == 'production';

// TODO: Set better variables, works in dev environment

export const websocketBaseUrl = isProduction
  ? 'http://localhost:8080'
  : 'http://localhost:8080';

export const apiBaseUrl = isProduction
  ? 'http://localhost:8080'
  : 'http://localhost:8080/api/v1';
