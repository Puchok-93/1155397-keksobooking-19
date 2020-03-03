'use strict';

(function () {
  window.utils = {

    // Генерация случайного целого числа
    getRandomNumber: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Генерируем случайный элемент из массива
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    // Функция задает случайную длину массива
    cutArray: function (array) {
      return array.slice(0, window.utils.getRandomNumber(1, array.length));
    },

    // Функция перемешивает массив
    mixArray: function (array) {
      var j;
      var temp;

      for (var i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }

      return array;
    }
  };
})();
