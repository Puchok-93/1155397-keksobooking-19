'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');

  var filterAdverts = function (adverts) {
    return adverts.filter(function (advert) {
      return housingType.value !== window.constants.DEFAULT_FILTER_VALUE ? advert.offer.type === housingType.value : advert.offer.type;
    }).slice(0, window.constants.MAX_PIN_ON_MAP);
  };

  window.filter = {
    type: housingType,
    array: filterAdverts
  };
})();
