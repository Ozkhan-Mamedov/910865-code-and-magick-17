'use strict';

(function () {
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
      'name': names[window.util.getRandomIndexElement(names)] + ' ' + surnames[window.util.getRandomIndexElement(surnames)],
      'coatColor': coatColor[window.util.getRandomIndexElement(coatColor)],
      'eyesColor': eyesColor[window.util.getRandomIndexElement(eyesColor)]
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
   */
  var renderDomElements = function (elements) {
    var insertionPoint = document.querySelector('.setup-similar-list');
    var nodes = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      nodes.appendChild(elements[i]);
    }

    insertionPoint.appendChild(nodes);
  };

  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var elements = createDomElements(generateRandomWizards(), template);

  document.querySelector('.setup-similar').classList.remove('hidden');
  renderDomElements(elements);
})();
