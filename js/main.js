'use strict';

var map = document.querySelector('.map');

var markersBlock = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var markersTemplate = document.querySelector('#pin').content;
var locationXMax = map.offsetWidth - window.constants.HALF_WIDTH_PIN;
var pin = markersTemplate.querySelector('.map__pin');
var activePin = document.querySelector('.map__pin--active');

var addCardForm = document.querySelector('.ad-form');
var addCardFormFieldsets = addCardForm.querySelectorAll('fieldset');
var filtersContainer = map.querySelector('.map__filters-container');
var mapFilters = map.querySelector('.map__filters');
var mapFeatures = map.querySelector('.map__features');

var addCardGuests = addCardForm.querySelector('#capacity');
var addCardAddress = addCardForm.querySelector('#address');
var addCardType = addCardForm.querySelector('#type');
var addCardPrice = addCardForm.querySelector('#price');


// ---------------------------------------------- Генерация и отрисовка объектов ----------------------------------------------------------

// Генерируем объекты

var getRandomOffer = function (index) {
  var mark = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png',
    },

    offer: {
      title: 'Заголовок объявления',
      adress: location.x + ',' + location.y,
      price: window.utils.getRandomNumber(window.constants.MIN_PRICE, window.constants.MAX_PRICE),
      type: window.utils.getRandomElement(window.constants.TYPES),
      rooms: window.utils.getRandomNumber(window.constants.MIN_ROOMS, window.constants.MAX_ROOMS),
      guests: window.utils.getRandomNumber(window.constants.MIN_GUESTS, window.constants.MAX_GUESTS),
      checkin: window.utils.getRandomElement(window.constants.TIMES),
      checkout: window.utils.getRandomElement(window.constants.TIMES),
      features: window.utils.cutArray(window.utils.mixArray(window.constants.FEATURES)),
      description: window.utils.getRandomElement(window.constants.DESCRIPTIONS),
      photos: window.utils.cutArray(window.constants.PHOTOS)
    },

    location: {
      x: window.utils.getRandomNumber(window.constants.LOCATION_X_MIN, locationXMax),
      y: window.utils.getRandomNumber(window.constants.LOCATION_Y_MIN, window.constants.LOCATION_Y_MAX)
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

var adverts = getAdArray(window.constants.QUANTITY_OFFERS);

// Клонируем маркеры

var renderMarks = function (mark) {
  var clone = pin.cloneNode(true);

  clone.querySelector('img').src = mark.author.avatar;
  clone.querySelector('img').alt = mark.offer.title;
  clone.style.left = (mark.location.x - window.constants.HALF_WIDTH_PIN) + 'px';
  clone.style.top = (mark.location.y - window.constants.HEIGTH_PIN) + 'px';

  return clone;
};

var getFragment = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderMarks(array[i]));
  }

  return fragment;
};

// ---------------------------------------------- Управление объявлениями ----------------------------------------------------------
// Показ объяввления
/*
var setPinsHandlers = function () {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  pins.forEach(function (element, index) {
    element.addEventListener('click', function () {
      activePin = document.querySelector('.map__pin--active');

      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }

      element.classList.add('map__pin--active');

      var card = document.querySelector('.map__card');
      if (card) {
        card.remove();
      }

      map.insertBefore(window.card.renderPopupCard(adverts[index]), filtersContainer);
      closePopup();
    });
  });
};


// Закрытие объявления
var closePopup = function () {
  var popup = document.querySelector('.map__card');
  var popupClose = popup.querySelector('.popup__close');

  popupClose.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscButtonKeydown);
};

var onCloseButtonClick = function () {
  var popup = document.querySelector('.map__card');
  var popupClose = popup.querySelector('.popup__close');
  activePin = document.querySelector('.map__pin--active');
  popup.remove();
  activePin.classList.remove('map__pin--active');
  popupClose.removeEventListener('click', onCloseButtonClick);
};

var onEscButtonKeydown = function (evt) {
  if (evt.key === window.constants.ESC_KEY) {
    var popup = document.querySelector('.map__card');
    activePin = document.querySelector('.map__pin--active');
    popup.remove();
    activePin.classList.remove('map__pin--active');
    document.removeEventListener('keydown', onEscButtonKeydown);
  }
};*/

// ---------------------------------------------- Деактивация страницы ----------------------------------------------------------
/*
var disableInputs = function (arrayInputs) {
  for (var i = 0; i < arrayInputs.length; i++) {
    arrayInputs[i].setAttribute('disabled', true);
  }
};

var enableInputs = function (arrayInputs) {
  for (var i = 0; i < arrayInputs.length; i++) {
    arrayInputs[i].removeAttribute('disabled');
  }
};

var deactivatePage = function () {
  disableInputs(addCardFormFieldsets);
  disableInputs(mapFilters);
  disableInputs(mapFeatures);
};

deactivatePage();
*/
// ---------------------------------------------- Активация страницы ----------------------------------------------------------
/*
var activatePage = function () {
  map.classList.remove('map--faded');
  markersBlock.appendChild(getFragment(adverts));
  addCardForm.classList.remove('ad-form--disabled');
  setPinsHandlers();
  window.formenableInputs(addCardFormFieldsets);
  window.formenableInputs(mapFilters);
  window.formenableInputs(mapFeatures);
  addCardGuests.value = window.constants.GUESTS_DEFAULT;
  addCardType.value = window.constants.FLAT;
  addCardPrice.value = 5000;
  addCardAddress.value = (mainPin.offsetLeft + Math.floor(window.constants.WIDTH_PIN / 2)) + ', ' + (mainPin.offsetTop + window.constants.HEIGTH_PIN);
};

var onMainPinMousedown = function (evt) {
  if (evt.button === window.constants.MOUSE_LB) {
    activatePage();
    mainPin.removeEventListener('mousedown', onMainPinMousedown);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
  }
};

var onMainPinEnterPress = function (evt) {
  if (evt.key === window.constants.ENTER_KEY) {
    activatePage();
    mainPin.removeEventListener('mousedown', onMainPinMousedown);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
  }
};

mainPin.addEventListener('mousedown', onMainPinMousedown);
mainPin.addEventListener('keydown', onMainPinEnterPress);
*/
