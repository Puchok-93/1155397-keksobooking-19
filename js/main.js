'use strict';

var map = document.querySelector('.map');
var markersBlock = map.querySelector('.map__pins');
var markersTemplate = document.querySelector('#pin').content;

// Массивы данных

var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var title = ['Объявление о сдаче', 'Сдам помещение', 'Жду гостей'];
var price = [1000, 2000, 3000, 4000, 5000];
var typeHouse = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 4, 5];
var guests = [1, 2, 3, 4, 5, 6];
var checkIn = ['12:00', '13:00', '14:00'];
var checkOut = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var description = ['Свобно, стильно современно', 'Шикарный вид из окна', 'Рядом с центром города'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var QUANTITY_OFFERS = 8; // Количество выводимых элементов на страницу

// Генерируем случайное число из массива
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Генерируем случайные координаты Х и Y
var getRandomCoordinateX = function () {
  return Math.floor(Math.random() * (750 - 1 + 1)) + 1;
};

var getRandomCoordinateY = function () {
  return Math.floor(Math.random() * (630 - 130 + 1)) + 130;
};

// Генерируем объекты

var getRandomOffer = function () {
  var mark = {
    author: {
      avatar: 'img/avatars/user' + getRandomElement(avatars) + '.png'
    },

    offer: {
      title: getRandomElement(title),
      adress: getRandomCoordinateX() + ',' + getRandomCoordinateY(),
      price: getRandomElement(price),
      type: getRandomElement(typeHouse),
      rooms: getRandomElement(rooms),
      guests: getRandomElement(guests),
      checkin: getRandomElement(checkIn),
      checkout: getRandomElement(checkOut),
      features: getRandomElement(features),
      description: getRandomElement(description),
      photos: getRandomElement(photos)
    },

    location: {
      x: getRandomCoordinateX(),
      y: getRandomCoordinateY()
    }
  };
  return mark;
};

// Генерируем массив с объявлениями
var getAdvertisingArr = function (number) {
  var advertising = [];

  for (var i = 0; i < number; i++) {
    advertising.push(getRandomOffer());
  }

  return advertising;
};

// Клонируем маркеры

var renderMarks = function (mark) {
  var marks = markersTemplate.querySelector('.map__pin').cloneNode(true);

  marks.querySelector('img').src = mark.author.avatar;
  marks.querySelector('img').alt = mark.offer.title;
  marks.style.left = (mark.location.x - 25) + 'px';
  marks.style.top = (mark.location.y - 25) + 'px';

  return marks;
};

var getFragment = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderMarks(array[i]));
  }

  return fragment;
};

markersBlock.appendChild(getFragment(getAdvertisingArr(QUANTITY_OFFERS)));

// Скрываем приветствие

map.classList.remove('map--faded');
