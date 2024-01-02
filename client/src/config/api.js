const API_DOMAIN = "https://newsapi.org/v2/top-headlines?country=";
const API_SEARCH_DOMAIN = "https://newsapi.org/v2/everything?q=";
const API_KEY = "71613cbd32304c84987ee18ef6c694ef";
export const endpointPath = (country, category) =>
  `${API_DOMAIN}${country}&lang=en&category=${category}&apikey=${API_KEY}`;
export const endpointSearch = (searchQuery) =>
  `${API_SEARCH_DOMAIN}${searchQuery}&lang=en&apikey=${API_KEY}`;
export const sourcePath = (sources) => 
  `https://newsapi.org/v2/top-headlines?sources=${sources}&apikey=${API_KEY}`;
