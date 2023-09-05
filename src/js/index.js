import SimpleLightBox from 'simplelightbox';
import Notiflix from 'notiflix';

// import { createGalleryMarkup } from './imagesapi';

import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39246673-8495b21e621c9930d57ed1c34';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadB = document.querySelector('.load-more');
const lightBox = new SimpleLightBox('.gallery a')

searchForm.addEventListener('submit', formSubmit);
loadB.addEventListener('click', loadMore);

let page = 1;
let searchQuery = '';
let isLoad = false;

loadB.style.display = 'none';

function formSubmit(event) {
    event.preventDefault();
    searchQuery = event.target.elements.searchQuery.value.trim();
    if (searchQuery === '') {
        Notiflix.Notify.failure('Please, enter a search query.');
        return;
    }
    clearGallery();
    page = 1;
    searchImg();
};

async function searchImg() {
    if (isLoad) {
        return;
    }
    isLoad = true;
    try {
        const responce = await axios.get('', {
            params: {
                key: API_KEY,
                q: searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page,
                per_page: 40,
            },
        });

        const images = responce.data.hits;
        const totalHits = responce.data.totalHits;

        if (images.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            createGalleryMarkup(images);
            lightBox.refresh();
            page += 1;
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        }
        hideLoadBInTheEnd(totalHits);
    }
    catch (error) {
        console.error('Error');
        Notiflix.Notify.failure('Please try again later');
    }
    finally {
        isLoad = false;
    }
}

function createGalleryMarkup(images) {
    const galleryList = images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b> ${downloads}
    </p>
  </div>
</div>`).join('');
    gallery.insertAdjacentHTML('beforeend', galleryList);
}

function clearGallery() {
    gallery.innerHTML = '';
};

function hideLoadBInTheEnd(totalHits) {
    const totalImg = page * 40;
    if (totalImg >= totalHits) {
        loadB.style.display = 'none'
     if (totalHits === 0) {
            Notiflix.Notify.info('No pictures')
        } else {
            Notiflix.Notify.info('We are sorry, but you have reached the end of search results.')
        }
    }
    else {
        loadB.style.display = 'block';
    }
};
function loadMore() {
    searchImg();
    scroll();
};

function scroll() {
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}


