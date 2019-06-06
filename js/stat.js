'use strict';

/**
 * @const
 * @type {number}
 */
var CLOUD_WIDTH = 420;

/**
 * @const
 * @type {number}
 */
var CLOUD_HEIGHT = 270;

/**
 * @const
 * @type {number}
 */
var CLOUD_X = 100;

/**
 * @const
 * @type {number}
 */
var CLOUD_Y = 10;

/**
 * @const
 * @type {number}
 */
var GAP = 10;

/**
 * @const
 * @type {number}
 */
var MAX_HEIGHT = 150;

/**
 * @const
 * @type {number}
 */
var BAR_WIDTH = 40;

/**
 * @const
 * @type {number}
 */
var BAR_SPACING = 50;

/**
 * @const
 * @type {number}
 */
var BAR_GAP = 40;

/**
 * @const
 * @type {number}
 */
var BAR_Y_START = 240;

/**
 * @const
 * @type {number}
 */
var ANNOUNCEMENT_X = 120;

/**
 * @const
 * @type {number}
 */
var ANNOUNCEMENT_Y = 30;

/**
 * @const
 * @type {number}
 */
var ANNOUNCEMENT_SPACING = 20;

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
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'top';
  ctx.fillText(text, x, y);
};

/**
 * Функция поиска индекса максимального элемента массива
 * @param {object} searchObj массив
 * @return {number} индекс элемента с максимальным значением
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

/**
 * Функция отрисовки стобца гистограммы
 * @param {object} ctx объект отрисовки на канвасе
 * @param {number} playerIndex
 * @param {number} names массив с именами
 * @param {number} times массив с результатами
 */
var printBar = function (ctx, playerIndex, names, times) {
  var currentBarHeight = times[playerIndex] * MAX_HEIGHT / times[searchMaxResultIndex(times)];
  var barX = CLOUD_X + BAR_GAP + BAR_WIDTH + (BAR_WIDTH + BAR_SPACING) * playerIndex;
  ctx.beginPath();
  ctx.moveTo(barX, BAR_Y_START);
  ctx.lineTo(barX, BAR_Y_START - currentBarHeight);
  ctx.lineTo(barX - BAR_WIDTH, BAR_Y_START - currentBarHeight);
  ctx.lineTo(barX - BAR_WIDTH, BAR_Y_START);
  ctx.lineTo(barX, BAR_Y_START);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
  if (names[playerIndex] === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  }
  ctx.fill();
  renderText(ctx, names[playerIndex], barX - BAR_WIDTH, BAR_Y_START + 10);
  renderText(ctx, Math.round(times[playerIndex]), barX - BAR_WIDTH, BAR_Y_START - currentBarHeight - 20);
};

/**
 * Функция отрисовки облака с общими результатами
 * @param {object} ctx объект отрисовки на канвасе
 * @param {string} names массив с именами
 * @param {number} times массив с результатами
 */
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#ffffff');
  renderText(ctx, 'Ура вы победили!', ANNOUNCEMENT_X, ANNOUNCEMENT_Y);
  renderText(ctx, 'Список результатов:', ANNOUNCEMENT_X, ANNOUNCEMENT_Y + ANNOUNCEMENT_SPACING);
  for (var playerIndex = 0; playerIndex < names.length; playerIndex++) {
    printBar(ctx, playerIndex, names, times);
  }
};
