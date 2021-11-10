import imagesGalleryTpl from '../templates/images-gallery.hbs';
import ApiService from './apiService';

const refs = {
  //   container: document.querySelector('.container'),
  listgallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const apiService = new ApiService();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function renderListGallery(images) {
  refs.listgallery.insertAdjacentHTML('beforeend', imagesGalleryTpl(images));
}

function onSearch(e) {
  e.preventDefault();
  clearListGallery();
  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.fetchImages().then(renderListGallery);
}

function onLoadMore() {
  apiService.fetchImages().then(renderListGallery);
}
function clearListGallery() {
  refs.listgallery.innerHTML = '';
}
