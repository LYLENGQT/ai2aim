// API Configuration
export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  'https://pwgfmn7vlwj6sz7vcwxh7nrjpy0hfekw.lambda-url.ca-central-1.on.aws/api/v1';

export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  return `${baseUrl}/${cleanEndpoint}`;
};

