'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filtersContainer = map.querySelector('.map__filters-container');
  var activePin = document.querySelector('.map__pin--active');
  var addCardForm = document.querySelector('.ad-form');

  // Показ объяввления
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
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    addCardForm.classList.remove('ad-form--disabled');
    setPinsHandlers();
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
