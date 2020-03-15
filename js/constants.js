'use strict';

(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Свободно, стильно современно', 'Шикарный вид из окна', 'Рядом с центром города'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var HEIGTH_PIN = 70;
  var WIDTH_PIN = 50;
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
  var MOUSE_LB = 0;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;

  var BUNGALO = 'bungalo';
  var FLAT = 'flat';
  var HOUSE = 'house';
  var PALACE = 'palace';

  var GUESTS_DEFAULT = 1;

  var MAIN_PIN_WIDTH = 50;
  var MAIN_PIN_HEIGHT = 50;

  var GET = 'GET';
  var POST = 'POST';

  var TIMEOUT_IN_MS = 10000;
  var STATUS_OK = 200;

  var MAX_PIN_ON_MAP = 5;
  var DEFAULT_FILTER_VALUE = 'any';

  window.constants = {

    TYPES: TYPES,
    TIMES: TIMES,
    FEATURES: FEATURES,
    DESCRIPTIONS: DESCRIPTIONS,
    PHOTOS: PHOTOS,

    BUNGALO: BUNGALO,
    FLAT: FLAT,
    HOUSE: HOUSE,
    PALACE: PALACE,

    GUESTS_DEFAULT: GUESTS_DEFAULT,

    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE,
    MIN_ROOMS: MIN_ROOMS,
    MAX_ROOMS: MAX_ROOMS,
    MIN_GUESTS: MIN_GUESTS,
    MAX_GUESTS: MAX_GUESTS,

    MIN_FLAT_PRICE: MIN_FLAT_PRICE,
    MIN_HOUSE_PRICE: MIN_HOUSE_PRICE,
    MIN_PALACE_PRICE: MIN_PALACE_PRICE,

    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    HEIGTH_PIN: HEIGTH_PIN,
    WIDTH_PIN: WIDTH_PIN,
    HALF_WIDTH_PIN: HALF_WIDTH_PIN,
    QUANTITY_OFFERS: QUANTITY_OFFERS,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    LOCATION_X_MIN: LOCATION_X_MIN,

    MOUSE_LB: MOUSE_LB,
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,

    GET: GET,
    POST: POST,
    TIMEOUT_IN_MS: TIMEOUT_IN_MS,
    STATUS_OK: STATUS_OK,

    MAX_PIN_ON_MAP: MAX_PIN_ON_MAP,
    DEFAULT_FILTER_VALUE: DEFAULT_FILTER_VALUE
  };
})();
