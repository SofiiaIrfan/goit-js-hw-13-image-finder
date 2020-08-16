import appService from './js/apiService';
import updateImagesMarkup from './js/update-images-markup';
import refs from './js/refs';
import LoadMoreBtn from './js/load-more-button';
import successMessage from './js/notifications';
import './js/modal';
import './styles.css';

const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', fetchItems);

function searchFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;
  appService.query = form.elements.query.value;
  clearArticlesContainer();
  appService.resetPage();
  fetchItems();
  form.reset();
}

function fetchItems() {
  loadMoreBtn.disable();

  appService.fetchItems().then(data => {
    updateImagesMarkup(data);
    if (data.length < 12) {
      loadMoreBtn.hide();
    } else {
      loadMoreBtn.show();
      loadMoreBtn.enable();
      successMessage();
    }
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}

function clearArticlesContainer() {
  refs.list.innerHTML = '';
}

refs.form.addEventListener('submit', searchFormSubmitHandler);
