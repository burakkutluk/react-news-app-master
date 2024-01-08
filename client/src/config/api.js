const API_DOMAIN = "https://newsapi.org/v2/top-headlines?country=";
const API_SEARCH_DOMAIN = "https://newsapi.org/v2/everything?q=";
const apiKey = process.env.REACT_APP_API_KEY; 
export const endpointPath = (country, category) =>
  `${API_DOMAIN}${country}&lang=en&category=${category}&apikey=${apiKey}`;
export const endpointSearch = (searchQuery) =>
  `${API_SEARCH_DOMAIN}${searchQuery}&lang=en&apikey=${apiKey}`;
export const sourcePath = (sources) => 
  `https://newsapi.org/v2/top-headlines?sources=${sources}&apikey=${apiKey}`;
