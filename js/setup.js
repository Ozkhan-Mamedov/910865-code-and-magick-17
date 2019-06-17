'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var coatsColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballsColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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

/**
 * Функция открытия попапа
 */
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

/**
 * Функция закрытия попапа
 */
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

/**
 * Функция закрытия попапа по клавише ESC
 * @param {Object} evt объект события
 */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

/**
 * Функция проверяет клавиатурное нажатие по ESC в элементе формы
 * @param {Object} evt объект события
 */
var onInputEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  } else {
    document.removeEventListener('keydown', onInputEscPress);
  }
};

/**
 * Функция отслеживает клавиатурное нажатие в элементе формы
 */
var focusInput = function () {
  nameInput.addEventListener('keydown', onInputEscPress);
};

var insertionPoint = document.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var elements = createDomElements(generateRandomWizards(), template);
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var nameInput = setup.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

document.querySelector('.setup-similar').classList.remove('hidden');
renderDomElement(elements, insertionPoint);
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = coatsColors[getRandomIndexElement(coatsColors)];
});
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = eyesColors[getRandomIndexElement(eyesColors)];
});
wizardFireball.addEventListener('click', function () {
  wizardFireball.style.backgroundColor = fireballsColors[getRandomIndexElement(fireballsColors)];
});
nameInput.addEventListener('focus', focusInput);
setupOpen.addEventListener('click', function () {
  openPopup();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
setupClose.addEventListener('click', function () {
  closePopup();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

