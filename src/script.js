const API_URL = 'https://picsum.photos/v2/list';
const LIMIT = 4;

const gallery = document.getElementById('gallery');
const message = document.getElementById('message');
const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const removeBtn = document.getElementById('removeBtn');
const reverseBtn = document.getElementById('reverseBtn');

// Номер сторінки для API: кожен запит бере нові 4 картинки
let page = 1;

function showMessage(text) {
  message.textContent = text;
}

// Створює елемент картинки та додає його в галерею
function addImage(item) {
  const figure = document.createElement('figure');
  figure.className = 'gallery__item';

  const img = document.createElement('img');
  img.className = 'gallery__img';
  img.src = `https://picsum.photos/id/${item.id}/400/300`;
  img.alt = `Фото, автор: ${item.author}`;

  const caption = document.createElement('figcaption');
  caption.className = 'gallery__caption';
  caption.textContent = item.author;

  figure.append(img, caption);
  gallery.append(figure);
}

// Запит на 4 картинки
async function loadImages() {
  loadBtn.disabled = true;
  showMessage('');

  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${LIMIT}`);
    if (!response.ok) {
      throw new Error('Помилка запиту');
    }
    const images = await response.json();
    images.forEach(addImage);
    page++;
  } catch (error) {
    showMessage('Не вдалося завантажити картинки. Спробуйте ще раз.');
  } finally {
    loadBtn.disabled = false;
  }
}

function clearGallery() {
  gallery.innerHTML = '';
  showMessage('');
}

function removeLast() {
  const last = gallery.lastElementChild;
  if (last) {
    last.remove();
  }
}

function reverseGallery() {
  const items = Array.from(gallery.children).reverse();
  items.forEach((item) => gallery.append(item));
}

loadBtn.addEventListener('click', loadImages);
clearBtn.addEventListener('click', clearGallery);
removeBtn.addEventListener('click', removeLast);
reverseBtn.addEventListener('click', reverseGallery);

// Перше завантаження сторінки: 4 картинки
loadImages();