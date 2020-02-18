'use strict';

var map = document.querySelector('.map');
var markersBlock = map.querySelector('.map__pins');
var markersTemplate = document.querySelector('#pin').content;
var locationXMax = map.offsetWidth - 25;
var pin = markersTemplate.querySelector('.map__pin');
var addCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filtersContainer = map.querySelector('.map__filters-container');

// Константы
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Свободно, стильно современно', 'Шикарный вид из окна', 'Рядом с центром города'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var HEIGTH_PIN = 70;
var HALF_WIDTH_PIN = 25;
var MIN_PRICE = 1000;
var MAX_PRICE = 20000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 6;
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
      type: getRandomElement(TYPES),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: cutArray(mixArray(FEATURES)),
      description: getRandomElement(DESCRIPTIONS),
      photos: cutArray(PHOTOS)
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

var addArrays = getAdArray(QUANTITY_OFFERS);

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

  var addCardAvatar = addCard.querySelector('.popup__avatar');
  var addCardTitle = addCard.querySelector('.popup__title');
  var addCardAddress = addCard.querySelector('.popup__text--address');
  var addCardPrice = addCard.querySelector('.popup__text--price');
  var addCardType = addCard.querySelector('.popup__type');
  var addCardCapacity = addCard.querySelector('.popup__text--capacity');
  var addCardTime = addCard.querySelector('.popup__text--time');
  var addCardFeatureList = addCard.querySelector('.popup__features');
  var addCardFeatureItem = addCard.querySelectorAll('.popup__feature');
  var addCardDescription = addCard.querySelector('.popup__description');
  var addCardPhotosBlock = addCard.querySelector('.popup__photos');
  var addCardPhoto = addCardPhotosBlock.querySelector('.popup__photo');
  var houseType = '';

  addCardAvatar.src = mark.author.avatar;
  addCardTitle.textContent = mark.offer.title;
  addCardAddress.textContent = mark.offer.address;
  addCardType.textContent = mark.offer.type;
  addCardPrice.textContent = mark.offer.price + '₽/ночь';
  addCardTime.textContent = 'Заезд после ' + mark.offer.checkin + ', выезд до ' + mark.offer.checkout;
  addCardDescription.textContent = mark.offer.description;

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

  // Добавляем количество комнат и гостей + склоняем
  var roomText = ' комната';
  if (mark.offer.rooms > 1 && mark.offer.rooms < 5) {
    roomText = ' комнаты';
  } else if (mark.offer.rooms >= 5) {
    roomText = ' комнат';
  }

  var guestsText = ' гостей';
  if (mark.offer.guests === 1) {
    guestsText = ' гостя';
  }

  addCardCapacity.textContent = mark.offer.rooms + roomText + ' для ' + mark.offer.guests + guestsText;

  // Удаляем лишние особенности

  var addCardwifiIcon = addCard.querySelector('.popup__feature--wifi');
  var addCarddishwasherIcon = addCard.querySelector('.popup__feature--dishwasher');
  var addCardparkingIcon = addCard.querySelector('.popup__feature--parking');
  var addCardwasherIcon = addCard.querySelector('.popup__feature--washer');
  var addCardelevatorIcon = addCard.querySelector('.popup__feature--elevator');
  var addCardconditionerIcon = addCard.querySelector('.popup__feature--conditioner');

  for (var x = 0; x < addCardFeatureItem.length; x++) {
    addCardFeatureItem[x].remove();
  }

  for (var y = 0; y < mark.offer.features.length; y++) {

    switch (mark.offer.features[y]) {
      case 'wifi':
        addCardFeatureList.append(addCardwifiIcon);
        break;

      case 'dishwasher':
        addCardFeatureList.append(addCarddishwasherIcon);
        break;

      case 'parking':
        addCardFeatureList.append(addCardparkingIcon);
        break;

      case 'washer':
        addCardFeatureList.append(addCardwasherIcon);
        break;

      case 'elevator':
        addCardFeatureList.append(addCardelevatorIcon);
        break;

      case 'conditioner':
        addCardFeatureList.append(addCardconditionerIcon);
        break;
    }
  }

  addCardPhoto.src = mark.offer.photos[0];
  if (mark.offer.photos.length > 1) {
    for (var j = 1; j < mark.offer.photos.length; j++) {
      var newCardPhoto = addCardPhoto.cloneNode(false);
      addCardPhotosBlock.appendChild(newCardPhoto);
      newCardPhoto.src = mark.offer.photos[j];
    }
  }

  return addCard;
};

markersBlock.appendChild(getFragment(getAdArray(QUANTITY_OFFERS)));
map.insertBefore(renderAddCard(addArrays[0]), filtersContainer);

// Скрываем приветствие

map.classList.remove('map--faded');
