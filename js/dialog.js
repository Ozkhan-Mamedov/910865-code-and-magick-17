'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SETUP_POS_X = '50%';
  var SETUP_POS_Y = 80;

  var dialogHandler = window.util.setup.querySelector('.upload');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.util.setup.querySelector('.setup-close');
  var nameInput = window.util.setup.querySelector('.setup-user-name');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    /**
     * Обработчик события перемещения мыши
     * @param {Object} moveEvt объект события перемещения мыши
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
     * @param {Object} upEvt объект события отпускания кнопки мыши
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        /**
         * Обработчик для решения конфликта нажатия по иконке и перетаскивания окна
         * @param {Object} isDraggedEvt объект события перемещения мыши
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
   * @param {Object} evt объект события нажатия на клавишу
   */
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  /**
   * Функция проверяет клавиатурное нажатие по ESC в элементе формы
   * @param {Object} evt объект события нажатия на кнопку клавиатуры
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

  nameInput.addEventListener('focus', focusInput);
  setupOpen.addEventListener('click', function () {
    openPopup();
    window.util.setup.style.left = SETUP_POS_X;
    window.util.setup.style.top = SETUP_POS_Y + 'px';
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
})();
