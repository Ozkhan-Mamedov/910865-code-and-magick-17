'use strict';

/**
 * Функция первоначальной настройки
 */
var setup = function () {
  var userDialog = document.querySelector('.setup');

  userDialog.classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
};

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

/**
 * Функция генерирования объекта случайного волшебника
 * @return {Object} объект волшебника
 */
var generateRandomWizard = function () {
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

  var randomWizard = {
    'name': names[getRandomIndexElement(names)] + ' ' + surnames[getRandomIndexElement(surnames)],
    'coatColor': coatColor[getRandomIndexElement(coatColor)],
    'eyesColor': eyesColor[getRandomIndexElement(eyesColor)]
  };

  return randomWizard;
};

/**
 * Функция генерирования массива объектов случайных волшебников
 * @return {Object[]} массив случайных волшебников
 */
var generateRandomWizards = function () {
  var WIZARDS_NUM = 4;
  var wizards = [];

  for (var i = 0; i < WIZARDS_NUM; i++) {
    wizards.push(generateRandomWizard());
  }

  return wizards;
};

/**
 * Функция создания DOM-элементов
 * @param {Object[]} characters массив объектов
 * @param {Object} template шаблон элемента
 * @return {Object[]} массив DOM-элементов
 */
var createDomElements = function (characters, template) {
  var elements = [];

  for (var i = 0; i < characters.length; i++) {
    var elementModel = template.cloneNode(true);

    elementModel.querySelector('.setup-similar-label').textContent = characters[i].name;
    elementModel.querySelector('.wizard-coat').style.fill = characters[i].coatColor;
    elementModel.querySelector('.wizard-eyes').style.fill = characters[i].eyesColor;
    elements.push(elementModel);
  }

  return elements;
};

/**
 * Функция заполнения блока DOM-элементами
 * @param {Object[]} elements массив заполняемых объектов
 * @param {Object} block заполняемый блок
 */
var renderDomElement = function (elements, block) {
  var nodes = document.createDocumentFragment();

  for (var i = 0; i < elements.length; i++) {
    nodes.appendChild(elements[i]);
  }

  block.appendChild(nodes);
};

setup();

var insertionPoint = document.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var elements = createDomElements(generateRandomWizards(), template);

renderDomElement(elements, insertionPoint);
