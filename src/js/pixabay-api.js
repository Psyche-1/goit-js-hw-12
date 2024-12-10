// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

import createMarkup from './render-functions';

const input = document.querySelector('#search-field');
const loading = document.querySelector('.loading');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let searchWord = '';
let images = [];
let currentPage = 1;
let per_page = 15;
let lastPage;

const fetchPhotos = async url => {
  try {
    const response = await axios(url);
    if (!response) {
      iziToast.show({
        message: error.message + ' error 1',
        backgroundColor: 'red',
      });
    }
    return response.data;
  } catch (error) {
    // iziToast.show({
    //   message: error.message + ' error',
    //   backgroundColor: 'red',
    // });
    return error;
  }
};

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
      if (response.message) {
        if (response.message.toLowerCase().includes('error')) {
          throw new Error(response.message);
        }
      }
      if (response.statusText) {
        throw new Error(response.status);
      }
      return response;
    })
    .then(post => {
      lastPage = Math.ceil(post.totalHits / per_page);

      images = post.hits;
      if (!images.length) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#FFA000',
        });
        gallery.innerHTML = '';
        loading.classList.add('visually-hidden');
        loadMore.classList.add('visually-hidden');
        return;
      }

      if (currentPage >= lastPage) {
        iziToast.show({
          message: "We're sorry, but you've reached the end of search results.",
          backgroundColor: '#0099FF',
        });
        loading.classList.add('visually-hidden');
        loadMore.classList.add('visually-hidden');
        currentPage = 1;
      }

      createMarkup(images);
      loading.classList.add('visually-hidden');

      if (currentPage < lastPage) {
        loadMore.classList.remove('visually-hidden');
      }
    })
    .catch(error => {
      iziToast.show({
        message: error.message + ' error 2',
        backgroundColor: 'red',
      });
      gallery.innerHTML = '';
      loading.classList.add('visually-hidden');
      loadMore.classList.add('visually-hidden');
    });
}

export async function searchingMore() {
  currentPage++;

  loading.classList.remove('visually-hidden');
  if (currentPage < lastPage) {
    loadMore.classList.remove('visually-hidden');
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

  fetchPhotos(url)
    .then(response => {
      if (response.message) {
        if (response.message.toLowerCase().includes('error')) {
          throw new Error(response.message);
        }
      }
      if (response.statusText) {
        throw new Error(response.status);
      }
      return response;
    })
    .then(post => {
      lastPage = Math.ceil(post.totalHits / per_page);

      images = post.hits;
      if (!images.length) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#FFA000',
        });
        loading.classList.add('visually-hidden');
        loadMore.classList.add('visually-hidden');
        return;
      }

      if (currentPage >= lastPage) {
        iziToast.show({
          message: "We're sorry, but you've reached the end of search results.",
          backgroundColor: '#0099FF',
        });
        loading.classList.add('visually-hidden');
        loadMore.classList.add('visually-hidden');
        currentPage = 1;
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
        message: error.message + ' error 3',
        backgroundColor: 'red',
      });
      loading.classList.add('visually-hidden');
      gallery.innerHTML = '';
    });
}
