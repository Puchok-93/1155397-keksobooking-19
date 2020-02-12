'use strict';

// Массивы
// Автор
var USER_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];

// Предложение

var OFFERS_TITLE = ['ОБъявление о сдаче', 'Сдам помещение', 'Жду гостей'];
var PRICE = [1000, 2000, 3000, 4000, 5000];
var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var QUESTS = [1, 2, 3, 4, 5, 6];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Свобно, стильно современно', 'Шикарный вид из окна', 'Рядом с центром города'];

// Генерируем случайное число из массива
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Генерируем случайные координаты Х и Y
var getRandomCoordinateX = function() {
  return Math.floor(Math.random() * (750 - 1 + 1)) + 1;
};

var getRandomCoordinateY = function() {
  return Math.floor(Math.random() * (630 - 130 + 1)) + 130;
};

// Тест

var similarWizardTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

// Генерируем случайные объекты

var getRandomMark = function () {
  var mark = {
    offer: {
      title: getRandomElement(OFFERS_TITLE),
      adress: getRandomCoordinateX() + ',' + getRandomCoordinateY(),
      price: getRandomElement(PRICE),
      type: getRandomElement(TYPE_HOUSE),
      rooms: getRandomElement(ROOMS),
      guests: getRandomElement(QUESTS),
      checkin: getRandomElement(CHECK_IN),
      checkout: getRandomElement(CHECK_OUT),
      features: getRandomElement(FEATURES),
      description: getRandomElement(DESCRIPTION),
    },

    location: {
      x: getRandomCoordinateX(),
      y: getRandomCoordinateY()
    }
  }
  return mark;
};

// Генерируем массив с объявлениями
var getAdvertisingArr = function (number) {
  var advertising = [];

  for (var i = 0; i < number; i++) {
    advertising.push(getRandomMark());
  }

  return advertising;
};

var createAdvertising = getAdvertisingArr(8);

// Клонируем маркеры

var renderMarks = function (mark) {
  var marksElement = marksTemplate.cloneNode(true);

  marksElement.querySelector('.map__pin').

  return marksElement;
};

var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < createAdvertising.length; i++) {
    fragment.appendChild(renderMarks(createAdvertising[i]));
  }

  return fragment;
};


var map = document.querySelector('.map--faded');
map.classList.remove('map--faded');
