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
  var resetButton = addCardForm.querySelector('.ad-form__reset');

  // ---------------------------------Создаем фрагмент ---------------------------------

  var createPinsBlock = function (data) {
    var fragment = document.createDocumentFragment();
    var filteredArray = window.filter.array(data);
    for (var i = 0; i < filteredArray.length; i++) {
      var pin = window.pin.renderPin(filteredArray[i]);
      fragment.appendChild(pin);
    }

    pinsBlock.appendChild(fragment);
    setPinsHandlers(data);
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

  // Удаляем метки с карты

  var removePins = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    var openedCard = document.querySelector('.map__card');

    pins.forEach(function (element) {
      element.remove();
    });

    if (openedCard) {
      openedCard.remove();
    }
  };

  // Деактивируем страницу

  var deactivatePage = function () {
    map.classList.add('map--faded');
    addCardForm.classList.add('ad-form--disabled');
    disableInputs(addCardFormFieldsets);
    disableInputs(mapFilters);
    disableInputs(mapFeatures);
    removePins();
    mapFilters.forEach(function (filter) {
      filter.value = window.constants.DEFAULT_FILTER_VALUE;
    });
  };

  var activeInputs = function () {
    enableInputs(addCardFormFieldsets);
    enableInputs(mapFilters);
    enableInputs(mapFeatures);
  };

  // ---------------------------------Активация страницы---------------------------------

  var activatePage = function () {
    map.classList.remove('map--faded');
    addCardForm.classList.remove('ad-form--disabled');
    window.backend.load(createPinsBlock);
    setPinsHandlers();
    mapFilters.forEach(function (filter) {
      filter.addEventListener('change', onFiltersChange);
    });
    addCardGuests.value = window.constants.GUESTS_DEFAULT;
    addCardType.value = window.constants.FLAT;
    addCardPrice.value = window.constants.MIN_FLAT_PRICE;
    addCardForm.addEventListener('submit', onFormSubmit);
    resetButton.addEventListener('click', onResetClick);
    activeInputs();
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

  var onFiltersChange = function () {
    removePins();
    window.backend.load(createPinsBlock);
  };

  // --------------------------------- Отправка данных на сервер ---------------------------------

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.form.send();
    deactivatePage();
    addCardForm.removeEventListener('submit', onFormSubmit);
    resetButton.removeEventListener('click', onResetClick);
  };

  // --------------------------------- Сброс данных формы ---------------------------------

  var onResetClick = function (evt) {
    evt.preventDefault();
    addCardGuests.value = window.constants.GUESTS_DEFAULT;
    addCardType.value = window.constants.FLAT;
    addCardPrice.value = window.constants.MIN_FLAT_PRICE;
    addCardForm.removeEventListener('submit', onFormSubmit);
    resetButton.removeEventListener('click', onResetClick);
  };

  mainPin.addEventListener('mousedown', onMainPinMousedown);
  mainPin.addEventListener('keydown', onMainPinEnterPress);
})();
