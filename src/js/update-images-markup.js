import gallery from '../templates/gallery.hbs';
import refs from './refs';

function updateImagesMarkup(data) {
  const markup = gallery(data);
  refs.list.insertAdjacentHTML('beforeend', markup);
}

export default updateImagesMarkup;
