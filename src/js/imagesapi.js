import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39246673-8495b21e621c9930d57ed1c34';

// export async function createGalleryMarkup(images) {
//     const galleryList = images
//         .map(
//             ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
//     <div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes:</b> ${likes}
//     </p>
//     <p class="info-item">
//       <b>Views:</b> ${views}
//     </p>
//     <p class="info-item">
//       <b>Comments:</b> ${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads:</b> ${downloads}
//     </p>
//   </div>
// </div>`).join('');
//     gallery.insertAdjacentHTML('beforeend', galleryList);
// }
