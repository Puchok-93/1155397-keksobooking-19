'use strict';

(function () {

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var addCardForm = document.querySelector('.ad-form');
  var addCardFormFieldsets = addCardForm.querySelectorAll('fieldset');

  var addCardGuests = addCardForm.querySelector('#capacity');
  var addCardRooms = addCardForm.querySelector('#room_number');
  var addCardAddress = addCardForm.querySelector('#address');
  var addCardType = addCardForm.querySelector('#type');
  var addCardPrice = addCardForm.querySelector('#price');
  var addCardTimein = addCardForm.querySelector('#timein');
  var addCardTimeout = addCardForm.querySelector('#timeout');

  var getAddress = function () {
    addCardAddress.value = (mainPin.offsetLeft + Math.floor(window.constants.WIDTH_PIN / 2)) + ', ' + (mainPin.offsetTop + window.constants.HEIGTH_PIN);
  };

  getAddress();
  // --------------------------------- Валидация формы ---------------------------------

  var onRoomGuestsCapacityChange = function () {
    addCardGuests.setCustomValidity('');

    if (addCardRooms.value < addCardGuests.value) {
      addCardGuests.setCustomValidity('Количество гостей превышает спальных мест. Увеличьте количество комнат.');
    }

    if (addCardRooms.value === '100' && addCardGuests.value !== '0') {
      addCardGuests.setCustomValidity('100 комнат? Серьезно?');
    }
  };

  var onCheckTimeinChange = function () {
    addCardTimeout.value = addCardTimein.value;
  };

  var onCheckTimeoutChange = function () {
    addCardTimein.value = addCardTimeout.value;
  };

  var onTypeHouseChange = function () {
    switch (addCardType.value) {
      case window.constants.BUNGALO:
        addCardPrice.setAttribute('min', 0);
        addCardPrice.placeholder = 0;
        break;

      case window.constants.FLAT:
        addCardPrice.setAttribute('min', window.constants.MIN_FLAT_PRICE);
        addCardPrice.placeholder = window.constants.MIN_FLAT_PRICE;
        break;

      case window.constants.HOUSE:
        addCardPrice.setAttribute('min', window.constants.MIN_HOUSE_PRICE);
        addCardPrice.placeholder = window.constants.MIN_HOUSE_PRICE;
        break;

      case window.constants.PALACE:
        addCardPrice.setAttribute('min', window.constants.MIN_PALACE_PRICE);
        addCardPrice.placeholder = window.constants.MIN_PALACE_PRICE;
        break;
    }
  };

  // --------------------------------- ОБработчики событий ---------------------------------

  addCardGuests.addEventListener('change', onRoomGuestsCapacityChange);
  addCardRooms.addEventListener('change', onRoomGuestsCapacityChange);
  addCardType.addEventListener('change', onTypeHouseChange);
  addCardTimein.addEventListener('change', onCheckTimeinChange);
  addCardTimeout.addEventListener('change', onCheckTimeoutChange);

  window.form = {
    addCardFormFieldsets: addCardFormFieldsets,
    addCardAddress: addCardAddress
  };
})();
