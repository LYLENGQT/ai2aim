// API Configuration
// Base URL for the backend API - can be overridden via environment variable
// For Vercel deployment, ensure the Lambda function has CORS configured to allow your Vercel domain
export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  'https://pwgfmn7vlwj6sz7vcwxh7nrjpy0hfekw.lambda-url.ca-central-1.on.aws/api/v1';

// Helper function to build API URLs
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  // Ensure base URL doesn't end with slash
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  return `${baseUrl}/${cleanEndpoint}`;
};

