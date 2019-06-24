'use strict';

(function () {
  var setup = document.querySelector('.setup');

  /**
   * Функция генерирования случайного числа
   * @param {Number} min
   * @param {Number} max
   * @return {Number} результат генерации
   */
  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  /**
   * Функция генерирования случайного индекса элемента массива
   * @param {String[]} arr массив, индекс которого является искомым
   * @return {Number} результат генерации
   */
  var getRandomIndexElement = function (arr) {
    return getRandomNumber(0, arr.length - 1);
  };

  /**
   * Функция поиска индекса максимального элемента массива
   * @param {Object[]} searchObj массив
   * @return {Number} индекс элемента с максимальным значением
   */
  var searchMaxResultIndex = function (searchObj) {
    var maxResultIndex = 0;

    for (var i = 0; i < searchObj.length; i++) {
      if (searchObj[i] > searchObj[maxResultIndex]) {
        maxResultIndex = i;
      }
    }

    return maxResultIndex;
  };

  window.util = {
    setup: setup,
    getRandomNumber: getRandomNumber,
    getRandomIndexElement: getRandomIndexElement,
    searchMaxResultIndex: searchMaxResultIndex
  };
})();
