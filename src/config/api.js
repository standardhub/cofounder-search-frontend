// API Configuration
export const API_CONFIG = {
  GRAPHQL_URI: process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:4000/graphql',
  
  // Add other API-related configurations here
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  
  // Environment checks
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Koyeb specific settings
  isKoyebDeployment: process.env.REACT_APP_GRAPHQL_URI?.includes('koyeb.app')
};

export default API_CONFIG;