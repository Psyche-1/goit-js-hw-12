// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import createMarkup from './render-functions';
import axios from 'axios';

const input = document.querySelector('#search-field');
const loading = document.querySelector('.loading');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let searchWord = '';
let images = [];
let currentPage = 1;
let per_page = 15;
let lastPage;

export default async function searching(event) {
  event.preventDefault();
  currentPage = 1;

  loading.classList.add('visually-hidden');
  searchWord = input.value.trim();
  input.value = '';

  if (!searchWord) {
    return;
  }

  const params = new URLSearchParams({
    key: '47410848-ca90cbe53fb16c342854d4794',
    q: searchWord,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: per_page,
    page: currentPage,
  });

  const url = `https://pixabay.com/api/?${params}`;

  loading.classList.remove('visually-hidden');
  gallery.innerHTML = '';

  fetchPhotos(url)
    .then(response => {
      if (response.statusText) {
        throw new Error(response.status);
      }
      return response;
    })
    .then(post => {
      images = post.hits;
      if (!images.length) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#FFA000',
        });
        gallery.innerHTML = '';
        return;
      }

      createMarkup(images);
      // gallery.innerHTML = '';
      loading.classList.add('visually-hidden');
      loadMore.classList.remove('visually-hidden');
    })
    .catch(error => {
      iziToast.show({
        message: error.message + ' error',
        backgroundColor: 'red',
      });
      gallery.innerHTML = '';
    });
}

const fetchPhotos = async url => {
  try {
    const response = await axios(url);
    return response.data;
  } catch (error) {
    iziToast.show({
      message: error.message + ' error',
      backgroundColor: 'red',
    });
  }
};

export async function searchingMore() {
  loading.classList.remove('visually-hidden');
  loadMore.classList.remove('visually-hidden');

  currentPage++;

  const params = new URLSearchParams({
    key: '47410848-ca90cbe53fb16c342854d4794',
    q: searchWord,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: per_page,
    page: currentPage,
  });

  const url = `https://pixabay.com/api/?${params}`;

  fetchPhotos(url)
    .then(response => {
      if (response.statusText) {
        throw new Error(response.status);
      }
      return response;
    })
    .then(post => {
      const lastPage = Math.floor(post.totalHits / per_page);

      if (currentPage === lastPage - 1) {
        iziToast.show({
          message: "We're sorry, but you've reached the end of search results.",
          backgroundColor: '#0099FF',
        });
        loadMore.classList.add('visually-hidden');
        loading.classList.add('visually-hidden');
        currentPage = 1;
        return;
      }

      images = post.hits;
      if (!images.length) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#FFA000',
        });
        loading.classList.add('visually-hidden');
        return;
      }

      createMarkup(images);
      loading.classList.add('visually-hidden');

      const itemHeight = document
        .querySelector('.gallery-item')
        .getBoundingClientRect().height;
      window.scrollBy({
        top: itemHeight * 2 + 24,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      iziToast.show({
        message: error.message + ' error',
        backgroundColor: 'red',
      });
      gallery.innerHTML = '';
    });
}
