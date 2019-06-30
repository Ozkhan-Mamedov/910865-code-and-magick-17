'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SETUP_POS_X = '50%';
  var SETUP_POS_Y = 80;

  var dialogHandler = window.util.setup.querySelector('.upload');
  var form = document.querySelector('.setup-wizard-form');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.util.setup.querySelector('.setup-close');
  var nameInput = window.util.setup.querySelector('.setup-user-name');
  var insertionPoint = document.querySelector('.setup-similar-list');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    /**
     * Обработчик события перемещения мыши
     * @param {MouseEvent} moveEvt объект события перемещения мыши
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      window.util.setup.style.top = (window.util.setup.offsetTop - shift.y) + 'px';
      window.util.setup.style.left = (window.util.setup.offsetLeft - shift.x) + 'px';
    };

    /**
     * Обработчик события при отпускании кнопки мыши
     * @param {MouseEvent} upEvt объект события отпускания кнопки мыши
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        /**
         * Обработчик для решения конфликта нажатия по иконке и перетаскивания окна
         * @param {MouseEvent} isDraggedEvt объект события перемещения мыши
         */
        var onClickPreventDefault = function (isDraggedEvt) {
          isDraggedEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  /**
   * Функция открытия попапа
   */
  var openPopup = function () {
    window.util.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  /**
   * Функция закрытия попапа
   */
  var closePopup = function () {
    window.util.setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  /**
   * Функция закрытия попапа по клавише ESC
   * @param {KeyboardEvent} evt объект события нажатия на клавишу
   */
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  /**
   * Функция проверяет клавиатурное нажатие по ESC в элементе формы
   * @param {KeyboardEvent} evt объект события нажатия на кнопку клавиатуры
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

  /**
   * Обработчик загрузки данных с сервера
   * @param {Object[]} wizards массив загруженных объектов
   */
  var onLoad = function (wizards) {
    document.querySelector('.setup-similar').classList.remove('hidden');

    if (insertionPoint.children.length) {
      while (insertionPoint.children.length !== 0) {
        insertionPoint.removeChild(insertionPoint.lastChild);
      }
    }

    window.renderDomElements(window.createDomElements(wizards, template));
  };

  /**
   * Обработчик ошибки загрузки данных с сервера
   * @param {String} error сообщение ошибки
   */
  var onError = function (error) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  nameInput.addEventListener('focus', focusInput);
  setupOpen.addEventListener('click', function () {
    openPopup();
    window.util.setup.style.left = SETUP_POS_X;
    window.util.setup.style.top = SETUP_POS_Y + 'px';
    window.backend.load(onLoad, onError);
  });
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
      window.backend.load(onLoad, onError);
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
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      closePopup();
    }, onError);
  });
})();
