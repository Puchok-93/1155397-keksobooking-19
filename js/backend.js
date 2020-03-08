'use strict';

(function () {
  var URL_SERVER = 'https://js.dump.academy/keksobooking/data';

  var createRequest = function (method, url, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.open(method, url);

    return xhr;
  };

  window.backend = {
    load: function (onLoad) {
      var request = createRequest(window.constants.GET, URL_SERVER, onLoad);
      request.send();
    }
  };
})();
