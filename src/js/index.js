import SimpleLightbox from "simplelightbox";
import Notiflix from "notiflix";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImagesFrom } from "./imagesapi";

const searchForm = document.querySelector('.search-form');
const loadMoreB = document.querySelector('.js-load-more');
const gallery = document.querySelector('.gallery');

let page = 1;
let query = '';
let SimpleLightbox = null;
searchForm.addEventListener('submit', onSubmit);
loadMoreB.addEventListener('click', btnLoadMore);

//нема картинок на запрос
function catchError(error) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query.');
}

//пустий запит
//loadmore
//нема результатів
//Hooray!
async function onSubmit(e) {
    e.preventDefault();
    page = 1;
    query = e.currentTarget.elements.searchQuery.value.trim();
    gallery.innerHTML = '';

    if (query === '') {
        Notiflix.Notify.failure('Enter your request!');
        return;
    }
    searchImagesFrom(query, page).then(response => {
        if (response.hits.length < 40) {
            loadMoreB.classList.replace('load-more', 'load-more-hide');
            loadMoreB.disabled = true;
        } else {
            loadMoreB.classList.replace('load-more-hide', 'load-more');
            loadMoreB.disabled = false;
        }
        if (response.totalHits === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            gallery.insertAdjacentHTML('beforeend', createMarkup(response.hits));
            SimpleLightbox = new SimpleLightbox('.gallery a').refresh();
            Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
        }
    })
    .catch (catchError)
    .finally(() => {
        searchForm.reset();
    })
}

//Галерея і картка зображення
function createMarkup(arr) {
    return arr.map(({
        webformatURL, largeImageURL, tags, likes, views, comments, downloads,
    }) => {
        return `<div class="photo-card">
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
</div>`
    }
    ).join('');
}

//f btnLoadMore
function btnLoadMore() {
    page += 1;
    SimpleLightbox.destroy = true;
    loadMoreB.disabled = true;

    searchImagesFrom(query, page).then(response => {
        gallery.insertAdjacentHTML('beforeend', createMarkup(response.hits));
        SimpleLightbox = new SimpleLightbox('.gallery a').refresh();
        const amountOfPages = Math.ceil(response.totalHits / 40);
        if (page < amountOfPages) {
            loadMoreB.classList.replace('load-more-hide', 'load-more');
            loadMoreB.disabled = false;
        } else {
            Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
            loadMoreB.classList.replace('load-more', 'load-more-hidden');
        }
    })
        .catch(catchError);
}







