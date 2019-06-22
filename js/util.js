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
   * @param {Object[]} mas массив, индекс которого является искомым
   * @return {Number} результат генерации
   */
  var getRandomIndexElement = function (mas) {
    return getRandomNumber(0, mas.length - 1);
  };

  window.util = {
    setup: setup,
    getRandomNumber: getRandomNumber,
    getRandomIndexElement: getRandomIndexElement
  };
})();
