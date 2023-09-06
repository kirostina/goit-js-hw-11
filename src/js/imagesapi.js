import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39246673-8495b21e621c9930d57ed1c34';

async function searchImagesFrom(query, page) {
  const params = new URLSearchParams({
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
    query: query,
  });

  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&${params}`);
  return response.data;
}

export { searchImagesFrom };