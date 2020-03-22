'use strict';

(function () {
  var addCardForm = document.querySelector('.ad-form');
  var addCardFormFieldsets = addCardForm.querySelectorAll('fieldset');
  var addCardTitle = addCardForm.querySelector('#title');
  var addCardGuests = addCardForm.querySelector('#capacity');
  var addCardRooms = addCardForm.querySelector('#room_number');
  var addCardAddress = addCardForm.querySelector('#address');
  var addCardType = addCardForm.querySelector('#type');
  var addCardPrice = addCardForm.querySelector('#price');
  var addCardTimein = addCardForm.querySelector('#timein');
  var addCardTimeout = addCardForm.querySelector('#timeout');
  var submitButton = addCardForm.querySelector('.ad-form__submit');

  // --------------------------------- Валидация формы ---------------------------------

  var onRoomGuestsCapacityChange = function () {
    addCardGuests.setCustomValidity('');
    addCardGuests.removeAttribute('style');

    if (addCardRooms.value < addCardGuests.value) {
      addCardGuests.setCustomValidity('Количество гостей превышает спальных мест. Увеличьте количество комнат.');
      addCardGuests.style.borderColor = window.constants.INVALID_INPUT_COLOR;
    }

    if (addCardRooms.value === '100' && addCardGuests.value !== '0') {
      addCardGuests.setCustomValidity('100 комнат? Серьезно?');
      addCardGuests.style.borderColor = window.constants.INVALID_INPUT_COLOR;
    }
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

  // Проверка заголовка
  var onTitleInput = function () {
    addCardTitle.removeAttribute('style');

    if (addCardTitle.validity.valueMissing || addCardTitle.validity.tooShort) {
      addCardTitle.style.borderColor = window.constants.INVALID_INPUT_COLOR;
    }
  };

  // Проверка цены
  var onPriceInput = function () {
    addCardPrice.removeAttribute('style');

    if (addCardPrice.validity.rangeUnderflow || addCardPrice.validity.rangeOverflow || addCardPrice.validity.valueMissing) {
      addCardPrice.style.borderColor = window.constants.INVALID_INPUT_COLOR;
    }
  };

  // Синхронизация по времени
  var onCheckTimeinChange = function () {
    addCardTimeout.value = addCardTimein.value;
  };

  var onCheckTimeoutChange = function () {
    addCardTimein.value = addCardTimeout.value;
  };

  // подсветка невалидных полей
  var onFormInvalid = function (evt) {
    evt.target.style.borderColor = window.constants.INVALID_INPUT_COLOR;
  };

  // Выставляем значения формы по умолчанию
  var setDefaultValues = function () {
    addCardPrice.value = window.constants.MIN_FLAT_PRICE;
    addCardPrice.placeholder = window.constants.MIN_FLAT_PRICE;
    addCardGuests.value = window.constants.GUESTS_DEFAULT;
    addCardTitle.removeAttribute('style');
    addCardPrice.removeAttribute('style');
    addCardGuests.removeAttribute('style');
  };

  // --------------------------------- Обработчики событий ---------------------------------

  var addFormListeners = function () {
    addCardForm.addEventListener('invalid', onFormInvalid, true);
    addCardTitle.addEventListener('input', onTitleInput);
    addCardGuests.addEventListener('change', onRoomGuestsCapacityChange);
    addCardRooms.addEventListener('change', onRoomGuestsCapacityChange);
    addCardType.addEventListener('change', onTypeHouseChange);
    addCardTimein.addEventListener('change', onCheckTimeinChange);
    addCardTimeout.addEventListener('change', onCheckTimeoutChange);
    addCardPrice.addEventListener('input', onPriceInput);
  };

  var removeFormListeners = function () {
    addCardForm.removeEventListener('invalid', onFormInvalid, true);
    addCardTitle.removeEventListener('input', onTitleInput);
    addCardRooms.removeEventListener('input', onRoomGuestsCapacityChange);
    addCardGuests.removeEventListener('input', onRoomGuestsCapacityChange);
    addCardType.removeEventListener('change', onTypeHouseChange);
    addCardPrice.removeEventListener('input', onPriceInput);
    addCardTimein.removeEventListener('change', onCheckTimeinChange);
    addCardTimeout.removeEventListener('change', onCheckTimeoutChange);
  };

  // --------------------------------- Отправка формы на сервер ---------------------------------
  var successSend = function () {
    window.messages.showSuccess();
    submitButton.textContent = 'Данные отправлены';
    submitButton.disabled = false;
  };

  var failSend = function (errorMessage) {
    window.messages.showError(errorMessage);
    submitButton.textContent = 'Данные не отправлены';
    submitButton.disabled = false;
  };

  var sendForm = function () {
    window.backend.upload(new FormData(addCardForm), successSend, failSend);
    submitButton.textContent = 'Данные отправляются...';
    submitButton.disabled = true;
  };

  window.form = {
    addCardFormFieldsets: addCardFormFieldsets,
    addCardAddress: addCardAddress,
    send: sendForm,
    addListeners: addFormListeners,
    removeListeners: removeFormListeners,
    setDefaults: setDefaultValues
  };
})();
