'use strict';

window.renderStatistics = function (ctx, names, times) {
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

  var renderCloud = function (x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  var renderText = function (text, x, y) {
    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'top';
    ctx.fillText(text, x, y);
  };

  var maxResultIndex = 0;
  for (var i = 0; i < times.length; i++) {
    if (times[i] > times[maxResultIndex]) {
      maxResultIndex = i;
    }
  }

  var printBar = function (playerIndex) {
    var currentBarHeight = times[playerIndex] * MAX_HEIGHT / times[maxResultIndex];
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
    renderText(names[playerIndex], barX - BAR_WIDTH, BAR_Y_START + 10);
    renderText(Math.round(times[playerIndex]), barX - BAR_WIDTH, BAR_Y_START - currentBarHeight - 20);
  };

  renderCloud(CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#ffffff');
  renderText('Ура вы победили!', 120, 30);
  renderText('Список результатов:', 120, 50);
  for (var playerIndex = 0; playerIndex < names.length; playerIndex++) {
    printBar(playerIndex);
  }
};
