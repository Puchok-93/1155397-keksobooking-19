'use strict';

var map = document.querySelector('.map');
var markersBlock = map.querySelector('.map__pins');
var markersTemplate = document.querySelector('#pin').content;
var locationXMax = map.offsetWidth - 25;
var pin = markersTemplate.querySelector('.map__pin');
var addCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filtersContainer = map.querySelector('.map__filters-container');

// Массивы данных

var housings = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 4, 5];
var guests = [1, 2, 3, 4, 5, 6];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptions = ['Свобно, стильно современно', 'Шикарный вид из окна', 'Рядом с центром города'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Константы
var HEIGTH_PIN = 70;
var HALF_WIDTH_PIN = 25;
var MIN_PRICE = 1000;
var MAX_PRICE = 20000;
var QUANTITY_OFFERS = 8; // Количество выводимых элементов на страницу
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var LOCATION_X_MIN = 25;

// -----------------------Генерация случайных элементов ----------------------------------- \\

// Генерация случайного целого числа
var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Генерируем случайный элемент из массива
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Функция задает случайную длину массива
var cutArray = function (array) {
  return array.slice(0, getRandomNumber(1, array.length));
};

// Функция перемешивает массив
var mixArray = function (array) {
  var j;
  var temp;

  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
};

// -----------------------Генерация и отрисовка объектов ----------------------------------- \\

// Генерируем объекты

var getRandomOffer = function (index) {
  var mark = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png',
    },

    offer: {
      title: 'Заголовок объявления',
      adress: location.x + ',' + location.y,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(housings),
      rooms: getRandomElement(rooms),
      guests: getRandomElement(guests),
      checkin: getRandomElement(times),
      checkout: getRandomElement(times),
      features: cutArray(mixArray(features)),
      description: getRandomElement(descriptions),
      photos: cutArray(photos)
    },

    location: {
      x: getRandomNumber(LOCATION_X_MIN, locationXMax),
      y: getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };
  return mark;
};

// Генерируем массив с объявлениями
var getAdArray = function (number) {
  var ads = [];

  for (var i = 0; i < number; i++) {
    ads.push(getRandomOffer(i));
  }

  return ads;
};

var addArray = getAdArray(QUANTITY_OFFERS);

// Клонируем маркеры

var renderMarks = function (mark) {
  var clone = pin.cloneNode(true);

  clone.querySelector('img').src = mark.author.avatar;
  clone.querySelector('img').alt = mark.offer.title;
  clone.style.left = (mark.location.x - HALF_WIDTH_PIN) + 'px';
  clone.style.top = (mark.location.y - HEIGTH_PIN) + 'px';

  return clone;
};

var getFragment = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderMarks(array[i]));
  }

  return fragment;
};

// Создание карточки объявления

var renderAddCard = function (mark) {
  var addCard = addCardTemplate.cloneNode(true);

  var addCardTitle = addCard.querySelector('.popup__title');
  var addCardAddress = addCard.querySelector('.popup__text--address');
  var addCardPrice = addCard.querySelector('.popup__text--price');
  var addCardType = addCard.querySelector('.popup__type');
  var addCardCapacity = addCard.querySelector('.popup__text--capacity');
  var addCardTime = addCard.querySelector('.popup__text--time');
  var houseType = '';

  addCardTitle.textContent = mark.offer.title;
  addCardAddress.textContent = mark.offer.address;
  addCardType.textConten = mark.offer.type;
  addCardPrice.textContent = mark.offer.price + '₽/ночь';
  addCardCapacity.textContent = mark.offer.rooms + mark.offer.guests;
  addCardTime.textContent = mark.offer.checkin + mark.offer.checkout;

  // Выбираем тип жилья
  if (mark.offer.type === 'palace') {
    houseType = 'Дворец';
  } else if (mark.offer.type === 'flat') {
    houseType = 'Квартира';
  } else if (mark.offer.type === 'house') {
    houseType = 'Дом';
  } else if (mark.offer.type === 'bungalo') {
    houseType = 'Бунгало';
  }

  addCardType.textContent = houseType;
  return addCard;
};

markersBlock.appendChild(getFragment(getAdArray(QUANTITY_OFFERS)));
map.insertBefore(renderAddCard(addArray[0]), filtersContainer);

// Скрываем приветствие

map.classList.remove('map--faded');
