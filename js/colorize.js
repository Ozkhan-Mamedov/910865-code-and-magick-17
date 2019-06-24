'use strict';

(function () {
  var coatsColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballsColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardCoatInput = document.querySelector('input[name="coat-color"]');
  var wizardEyesInput = document.querySelector('input[name="eyes-color"]');
  var wizardFireballInput = document.querySelector('input[name="fireball-color"]');

  wizardCoat.addEventListener('click', function () {
    var randomIndex = window.util.getRandomIndexElement(coatsColors);

    wizardCoat.style.fill = coatsColors[randomIndex];
    wizardCoatInput.setAttribute('value', coatsColors[randomIndex]);
  });
  wizardEyes.addEventListener('click', function () {
    var randomIndex = window.util.getRandomIndexElement(eyesColors);

    wizardEyes.style.fill = eyesColors[randomIndex];
    wizardEyesInput.setAttribute('value', eyesColors[randomIndex]);
  });
  wizardFireball.addEventListener('click', function () {
    var randomIndex = window.util.getRandomIndexElement(fireballsColors);

    wizardFireball.style.backgroundColor = fireballsColors[randomIndex];
    wizardFireballInput.setAttribute('value', fireballsColors[randomIndex]);
  });
})();
