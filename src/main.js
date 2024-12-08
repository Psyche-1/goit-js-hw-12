import searching from './js/pixabay-api';
import { searchingMore } from './js/pixabay-api';

const searchBtn = document.querySelector('.form');
const loadMore = document.querySelector('.load-more');

searchBtn.addEventListener('submit', searching, event);
loadMore.addEventListener('click', searchingMore);
