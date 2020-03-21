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
  var submitButton = addCardForm.querySelector('.ad-form__submit');

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

  // --------------------------------- Отправка формы на сервер ---------------------------------
  var successSend = function () {
    window.messages.success();
    submitButton.textContent = 'Данные отправлены';
    submitButton.disabled = false;
  };

  var failSend = function (errorMessage) {
    window.messages.error(errorMessage);
    submitButton.textContent = 'Данные не отправлены';
    submitButton.disabled = false;
  };

  var sendForm = function () {
    window.backend.upload(new FormData(addCardForm), successSend, failSend);
    submitButton.textContent = 'Данные отправляются...';
    submitButton.disabled = true;
  };

  // дефолтные значения
  var setDefaultValues = function () {
    addCardPrice.setAttribute('min', window.constants.MIN_FLAT_PRICE);
    addCardPrice.placeholder = window.constants.MIN_FLAT_PRICE;
    addCardGuests.value = window.constants.GUESTS_DEFAULT;
  };


  // --------------------------------- Обработчики событий ---------------------------------

  addCardGuests.addEventListener('change', onRoomGuestsCapacityChange);
  addCardRooms.addEventListener('change', onRoomGuestsCapacityChange);
  addCardType.addEventListener('change', onTypeHouseChange);
  addCardTimein.addEventListener('change', onCheckTimeinChange);
  addCardTimeout.addEventListener('change', onCheckTimeoutChange);

  window.form = {
    addCardFormFieldsets: addCardFormFieldsets,
    addCardAddress: addCardAddress,
    send: sendForm,
    setDefaults: setDefaultValues
  };
})();
