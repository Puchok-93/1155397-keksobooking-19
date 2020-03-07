'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsBlock = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var filtersContainer = map.querySelector('.map__filters-container');
  var activePin = document.querySelector('.map__pin--active');
  var addCardForm = document.querySelector('.ad-form');
  var mapFilters = map.querySelectorAll('.map__filter');
  var mapFeatures = map.querySelectorAll('.map__features');
  var addCardFormFieldsets = addCardForm.querySelectorAll('fieldset');
  var addCardGuests = addCardForm.querySelector('#capacity');
  var addCardType = addCardForm.querySelector('#type');
  var addCardPrice = addCardForm.querySelector('#price');

  // ---------------------------------Создаем фрагмент ---------------------------------

  var createPinsBlock = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var pin = window.pin.renderPin(array[i]);
      fragment.appendChild(pin);
    }

    pinsBlock.appendChild(fragment);
    setPinsHandlers(array);
  };

  // ---------------------------------Показ объяввления---------------------------------
  var setPinsHandlers = function (array) {
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

        map.insertBefore(window.card.renderPopupCard(array[index]), filtersContainer);
        closePopup();
      });
    });
  };

  // ---------------------------------Закрытие объявления---------------------------------
  var closePopup = function () {
    var popup = document.querySelector('.map__card');
    var popupClose = popup.querySelector('.popup__close');

    popupClose.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onEscButtonKeydown);
  };

  // ---------------------------------Деактивация страницы---------------------------------

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

  // ---------------------------------Активация страницы---------------------------------

  var activatePage = function () {
    map.classList.remove('map--faded');
    addCardForm.classList.remove('ad-form--disabled');
    window.backend.load(createPinsBlock);
    setPinsHandlers();
    enableInputs(addCardFormFieldsets);
    enableInputs(mapFilters);
    enableInputs(mapFeatures);
    addCardGuests.value = window.constants.GUESTS_DEFAULT;
    addCardType.value = window.constants.FLAT;
    addCardPrice.value = window.constants.MIN_FLAT_PRICE;
  };

  // ---------------------------------Обработчики событий ---------------------------------

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
})();
