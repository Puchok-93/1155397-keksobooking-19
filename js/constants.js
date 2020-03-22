'use strict';

(function () {
  var HEIGTH_PIN = 70;
  var WIDTH_PIN = 50;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var MAIN_PIN_WIDTH = 50;
  var MAIN_PIN_HEIGHT = 50;
  var MAIN_PIN_DEFAULT_CORDS_X = 570;
  var MAIN_PIN_DEFAULT_CORDS_Y = 375;
  var MAX_PIN_ON_MAP = 5;

  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;
  var BUNGALO = 'bungalo';
  var FLAT = 'flat';
  var HOUSE = 'house';
  var PALACE = 'palace';
  var GUESTS_DEFAULT = 1;
  var DEFAULT_FILTER_VALUE = 'any';
  var INVALID_INPUT_COLOR = 'red';

  var GET = 'GET';
  var POST = 'POST';

  var TIMEOUT_IN_MS = 10000;
  var STATUS_OK = 200;

  var MOUSE_LB = 0;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  window.constants = {

    BUNGALO: BUNGALO,
    FLAT: FLAT,
    HOUSE: HOUSE,
    PALACE: PALACE,

    GUESTS_DEFAULT: GUESTS_DEFAULT,


    MIN_FLAT_PRICE: MIN_FLAT_PRICE,
    MIN_HOUSE_PRICE: MIN_HOUSE_PRICE,
    MIN_PALACE_PRICE: MIN_PALACE_PRICE,

    INVALID_INPUT_COLOR: INVALID_INPUT_COLOR,

    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    HEIGTH_PIN: HEIGTH_PIN,
    WIDTH_PIN: WIDTH_PIN,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,

    MOUSE_LB: MOUSE_LB,
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,

    GET: GET,
    POST: POST,
    TIMEOUT_IN_MS: TIMEOUT_IN_MS,
    STATUS_OK: STATUS_OK,

    MAX_PIN_ON_MAP: MAX_PIN_ON_MAP,
    DEFAULT_FILTER_VALUE: DEFAULT_FILTER_VALUE,

    MAIN_PIN_DEFAULT_CORDS_X: MAIN_PIN_DEFAULT_CORDS_X,
    MAIN_PIN_DEFAULT_CORDS_Y: MAIN_PIN_DEFAULT_CORDS_Y
  };
})();
