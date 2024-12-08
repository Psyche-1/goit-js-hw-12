// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const items = [];

export default function createMarkup(images) {
  const items = [];
  for (const image of images) {
    const item = document.createElement('li');
    item.classList.add('gallery-item');
    const a = document.createElement('a');
    a.classList.add('gallery-link');
    a.href = image['largeImageURL'];
    const img = document.createElement('img');
    img.classList.add('gallery-image');
    img.setAttribute('src', image['webformatURL']);
    img.setAttribute('alt', image['tags']);

    const pContainer = document.createElement('div');
    pContainer.classList.add('gallery-descr-container');
    // redone with map or else ------------------------------------------------------------------------------------------------------------------------------------------
    const pSubContainer1 = document.createElement('div');
    const pSubContainer2 = document.createElement('div');
    const pSubContainer3 = document.createElement('div');
    const pSubContainer4 = document.createElement('div');

    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    const p5 = document.createElement('p');
    const p6 = document.createElement('p');
    const p7 = document.createElement('p');
    const p8 = document.createElement('p');
    p1.classList.add('gallery-descr');
    p2.classList.add('gallery-descr');
    p3.classList.add('gallery-descr');
    p4.classList.add('gallery-descr');
    p5.classList.add('gallery-descr');
    p6.classList.add('gallery-descr');
    p7.classList.add('gallery-descr');
    p8.classList.add('gallery-descr');
    p1.textContent = `Likes`;
    p5.textContent = `${image['likes']}`;
    p2.textContent = `Views`;
    p6.textContent = `${image['views']}`;
    p3.textContent = `Comments`;
    p7.textContent = `${image['comments']}`;
    p4.textContent = `Downloads`;
    p8.textContent = `${image['downloads']}`;

    a.append(img);
    pSubContainer1.append(p1, p5);
    pSubContainer2.append(p2, p6);
    pSubContainer3.append(p3, p7);
    pSubContainer4.append(p4, p8);
    pContainer.append(
      pSubContainer1,
      pSubContainer2,
      pSubContainer3,
      pSubContainer4
    );
    a.append(pContainer);
    item.append(a);

    items.push(item);
  }
  gallery.append(...items);

  const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
  });
}
