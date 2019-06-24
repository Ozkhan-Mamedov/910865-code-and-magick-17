'use strict';

(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var MAX_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_SPACING = 50;
  var BAR_GAP = 40;
  var BAR_Y_START = 240;
  var ANNOUNCEMENT_X = 120;
  var ANNOUNCEMENT_Y = 30;
  var ANNOUNCEMENT_SPACING = 20;
  var NAMES_INDENT = 10;
  var RESULTS_INDENT = 20;
  var TEXT_STYLE = '16px PT Mono';
  var TEXT_BASELINE = 'top';
  var COLORS = {
    USER_BAR_COLOR: 'rgba(255, 0, 0, 1)',
    PLAYERS_BAR_COLOR: 'rgba(0, 0, 255, ',
    CLOUD_COLOR: '#ffffff',
    CLOUD_SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
    TEXT_COLOR: '#000000'
  };
  var TEXT = {
    ANNOUNCEMENT_WIN: 'Ура вы победили!',
    ANNOUNCEMENT_RESULT: 'Список результатов:',
    USER: 'Вы'
  };

  /**
   * Функция отрисовки облака прямоугольной формы
   * @param {object} ctx объект отрисовки на канвасе
   * @param {number} x координата по X
   * @param {number} y координата по Y
   * @param {number} width
   * @param {number} height
   * @param {string} color
   */
  var renderCloud = function (ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  /**
   * Функция отрисовки текстового сообщения
   * @param {object} ctx объект отрисовки на канвасе
   * @param {string} text
   * @param {number} x координата по Х
   * @param {number} y координата по Y
   */
  var renderText = function (ctx, text, x, y) {
    ctx.fillStyle = COLORS.TEXT_COLOR;
    ctx.font = TEXT_STYLE;
    ctx.textBaseline = TEXT_BASELINE;
    ctx.fillText(text, x, y);
  };

  /**
   * Функция отрисовки стобца гистограммы
   * @param {object} ctx объект отрисовки на канвасе
   * @param {number} playerIndex
   * @param {number} names массив с именами
   * @param {number} times массив с результатами
   */
  var printBar = function (ctx, playerIndex, names, times) {
    var currentBarHeight = times[playerIndex] * MAX_HEIGHT / times[window.util.searchMaxResultIndex(times)];
    var barX = CLOUD_X + BAR_GAP + BAR_WIDTH + (BAR_WIDTH + BAR_SPACING) * playerIndex;

    ctx.beginPath();
    ctx.moveTo(barX, BAR_Y_START);
    ctx.lineTo(barX, BAR_Y_START - currentBarHeight);
    ctx.lineTo(barX - BAR_WIDTH, BAR_Y_START - currentBarHeight);
    ctx.lineTo(barX - BAR_WIDTH, BAR_Y_START);
    ctx.lineTo(barX, BAR_Y_START);
    ctx.closePath();
    ctx.fillStyle = COLORS.PLAYERS_BAR_COLOR + Math.random() + ')';

    if (names[playerIndex] === TEXT.USER) {
      ctx.fillStyle = COLORS.USER_BAR_COLOR;
    }

    ctx.fill();
    renderText(ctx, names[playerIndex], barX - BAR_WIDTH, BAR_Y_START + NAMES_INDENT);
    renderText(ctx, Math.round(times[playerIndex]), barX - BAR_WIDTH, BAR_Y_START - currentBarHeight - RESULTS_INDENT);
  };

  /**
   * Функция отрисовки облака с общими результатами
   * @param {object} ctx объект отрисовки на канвасе
   * @param {string} names массив с именами
   * @param {number} times массив с результатами
   */
  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, COLORS.CLOUD_SHADOW_COLOR);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, COLORS.CLOUD_COLOR);
    renderText(ctx, TEXT.ANNOUNCEMENT_WIN, ANNOUNCEMENT_X, ANNOUNCEMENT_Y);
    renderText(ctx, TEXT.ANNOUNCEMENT_RESULT, ANNOUNCEMENT_X, ANNOUNCEMENT_Y + ANNOUNCEMENT_SPACING);

    for (var playerIndex = 0; playerIndex < names.length; playerIndex++) {
      printBar(ctx, playerIndex, names, times);
    }
  };
})();
