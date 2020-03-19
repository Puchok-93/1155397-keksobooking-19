'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsBlock = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var filtersContainer = map.querySelector('.map__filters-container');
  var addCardForm = document.querySelector('.ad-form');
  var mapFilters = map.querySelectorAll('.map__filter');
  var mapFeatures = map.querySelectorAll('.map__features');
  var addCardFormFieldsets = addCardForm.querySelectorAll('fieldset');
  var resetButton = addCardForm.querySelector('.ad-form__reset');
  var addCardGuests = addCardForm.querySelector('#capacity');
  var addCardType = addCardForm.querySelector('#type');
  var addCardPrice = addCardForm.querySelector('#price');
  var downloadedAdverts = [];
  var adverts = [];
  var filtersForm = window.filter.form;

  // создаем и вставляем фрагмент
  var createPinsBlock = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      array[i].id = i;
      var pin = window.pin.renderPin(array[i]);
      fragment.appendChild(pin);
    }

    adverts = array;
    pinsBlock.appendChild(fragment);
  };

  // отображение карточки при нажатии на метку
  var showPopupCard = function (advert) {
    var openedCard = document.querySelector('.map__card');
    if (openedCard) {
      openedCard.remove();
    }
    map.insertBefore(window.card.renderPopupCard(advert), filtersContainer);
    addPopupCardListeners();
  };

  var onPinClick = function (evt) {
    var activePins = map.querySelectorAll('.map__pin--active');
    var target = evt.target;
    var isClickOnPin = target.classList.contains('map__pin:not(map__pin--main)');
    var isClickInside = target.closest('.map__pin:not(.map__pin--main)');
    var currentPin;
    var isCurrentPinActive = isClickOnPin ? target.classList.contains('map__pin--active') : target.closest('.map__pin--active');

    if (isClickOnPin) {
      currentPin = target;
    } else if (isClickInside) {
      currentPin = isClickInside;
    }

    if (!currentPin || isCurrentPinActive) {
      return;
    }

    var pinId = +currentPin.dataset.id;
    var advert = adverts.find(function (ad) {
      return ad.id === pinId;
    });

    showPopupCard(advert);

    activePins.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });

    currentPin.classList.add('map__pin--active');
  };

  // закрытие карточки
  var addPopupCardListeners = function () {
    var popup = document.querySelector('.map__card');
    var popupClose = popup.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      var activePins = map.querySelectorAll('.map__pin--active');

      activePins.forEach(function (pin) {
        pin.classList.remove('map__pin--active');
      });

      popup.remove();
    }, {once: true});

    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        var activePins = map.querySelectorAll('.map__pin--active');

        activePins.forEach(function (pin) {
          pin.classList.remove('map__pin--active');
        });

        popup.remove();
      }
    }, {once: true});
  };
  // --------------------------------- Деактивация страницы ---------------------------------
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

  var deactivateAllInputs = function () {
    disableInputs(addCardFormFieldsets);
    disableInputs(mapFilters);
    disableInputs(mapFeatures);

    mapFilters.forEach(function (filter) {
      filter.value = window.filter.default;
    });

    mapFeatures.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  };

  deactivateAllInputs();
  window.form.default();

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

  var deactivatePage = function () {
    addCardForm.reset();
    map.classList.add('map--faded');
    addCardForm.classList.add('ad-form--disabled');

    map.removeEventListener('click', onPinClick);
    filtersForm.removeEventListener('change', onFiltersChange);
    addCardForm.removeEventListener('submit', onFormSubmit);
    resetButton.removeEventListener('click', onResetClick);

    removePins();
    window.form.default();
    deactivateAllInputs();
  };

  // --------------------------------- Активация страницы ---------------------------------
  var activateAllInputs = function () {
    enableInputs(addCardFormFieldsets);
    enableInputs(mapFilters);
    enableInputs(mapFeatures);
  };

  var onLoadSuccess = function (data) {
    downloadedAdverts = data;
    var filteredArray = window.filter.array(downloadedAdverts);
    createPinsBlock(filteredArray);
    return downloadedAdverts;
  };

  var activatePage = function () {
    window.backend.load(onLoadSuccess);
    map.classList.remove('map--faded');
    addCardForm.classList.remove('ad-form--disabled');
    addCardGuests.value = window.constants.GUESTS_DEFAULT;
    addCardType.value = window.constants.FLAT;
    addCardPrice.value = window.constants.MIN_FLAT_PRICE;
    map.addEventListener('click', onPinClick);
    filtersForm.addEventListener('change', onFiltersChange);
    addCardForm.addEventListener('submit', onFormSubmit);
    resetButton.addEventListener('click', onResetClick);
    activateAllInputs();
  };

  // управление меткой
  var onMainPinMousedown = function (evt) {
    if (evt.button === window.constants.MOUSE_LB) {
      if (map.classList.contains('map--faded')) {
        activatePage();
      }

      evt.preventDefault();

      mainPin.removeEventListener('keydown', onMainPinKeydown);
    }
  };

  // обработчики
  var onMainPinKeydown = function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      activatePage();
      mainPin.removeEventListener('keydown', onMainPinKeydown);
    }
  };

  var onFiltersChange = window.debounce(function () {
    removePins();
    createPinsBlock(window.filter.array(downloadedAdverts));
  });

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.form.send();
    deactivatePage();
    addCardForm.removeEventListener('submit', onFormSubmit);
    resetButton.removeEventListener('click', onResetClick);
  };

  var onResetClick = function (evt) {
    evt.preventDefault();
    deactivatePage();
    addCardForm.removeEventListener('submit', onFormSubmit);
    resetButton.removeEventListener('click', onResetClick);
  };

  // добавляем обработчики
  mainPin.addEventListener('mousedown', onMainPinMousedown);
  mainPin.addEventListener('keydown', onMainPinKeydown);
})();
