'use strict';

(function () {
  /**
   * @param {Object[]} characters массив объектов
   * @param {Object} template шаблон элемента
   * @return {Object[]} массив DOM-элементов
   */
  window.createDomElements = function (characters, template) {
    var elements = [];
    var ELEMENTS_NUM = 4;
    var charactersModified = window.util.excludeSimilarElements(characters, ELEMENTS_NUM);

    for (var i = 0; i < charactersModified.length; i++) {
      var elementModel = template.cloneNode(true);

      elementModel.querySelector('.setup-similar-label').textContent = charactersModified[i].name;
      elementModel.querySelector('.wizard-coat').style.fill = charactersModified[i].colorCoat;
      elementModel.querySelector('.wizard-eyes').style.fill = charactersModified[i].colorEyes;
      elements.push(elementModel);
    }

    return elements;
  };

  /**
   * Функция заполнения блока DOM-элементами
   * @param {Object[]} elements массив заполняемых объектов
   */
  window.renderDomElements = function (elements) {
    var insertionPoint = document.querySelector('.setup-similar-list');
    var nodes = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      nodes.appendChild(elements[i]);
    }

    insertionPoint.appendChild(nodes);
  };
})();
