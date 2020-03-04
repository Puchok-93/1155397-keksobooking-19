'use strict';

(function () {
  var map = document.querySelector('.map');
  var locationXMax = map.offsetWidth - window.constants.HALF_WIDTH_PIN;

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

  window.data = {
    adverts: adverts
  };
})();
