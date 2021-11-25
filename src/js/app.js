import imagesGalleryTpl from '../templates/images-gallery.hbs';
import ApiService from './apiService';
import showAlert from './alert-message';
const basicLightbox = require('basiclightbox');

const refs = {
  listgallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.listgallery.addEventListener('click', openModalWithImage);

function renderListGallery(images) {
  refs.listgallery.insertAdjacentHTML('beforeend', imagesGalleryTpl(images));
}

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;

  refs.loadMoreBtn.classList.add('is-hidden');

  if (apiService.query == '' || !apiService.query.trim().length) {
    showAlert('Images has not been found. Please, check your request!');
    return;
  }

  apiService.fetchImages().then(images => {
    if (images.length == 0) {
      showAlert('Images has not been found. Please, check your request!');
      return;
    }

    clearListGallery();
    apiService.resetPage();
    renderListGallery(images);
    if (images.length == 12) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
  });
}

function onLoadMore() {
  apiService.fetchImages().then(imaged => {
    renderListGallery(imaged);
    refs.loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
}

function clearListGallery() {
  refs.listgallery.innerHTML = '';
}

function openModalWithImage(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`<img src=${evt.target.srcset} alt='' />`);
  instance.show(() => {
    window.addEventListener('keydown', evt => {
      if (evt.code === 'Escape') {
        instance.close();
      }
    });
  });
}
