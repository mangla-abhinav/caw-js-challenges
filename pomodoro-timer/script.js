/* eslint no-alert: 0 */
$(document).ready(() => {
  let clockRunning = false;
  let memoryTime = {
    minutes: 15,
    seconds: 0,
  };
  let interval;
  let userTime = {};
  const sound = new Howl({
    src: ['sound.mp3'],
  });

  const disableInput = () => {
    $('#minutes, #seconds').attr('disabled', 'disabled');
  };

  const enableInput = () => {
    $('#minutes, #seconds').removeAttr('disabled');
  };

  $('.settings').click((e) => {
    e.preventDefault();
    if ($('#minutes').attr('disabled') === undefined) {
      disableInput();
    } else {
      enableInput();
    }
  });

  const updateTime = (time) => {
    if (time.minutes.toString().length === 1) {
      $('#minutes').val(`0${time.minutes}`);
    } else $('#minutes').val(time.minutes);
    if (time.seconds.toString().length === 1) {
      $('#seconds').val(`0${time.seconds}`);
    } else $('#seconds').val(time.seconds);
  };

  const updateRing = (colorClass) => {
    $('.ring').removeClass('ending ring-stroke').addClass(colorClass);
  };

  const updateText = (text) => {
    $('.start').text(text);
  };

  const checkTime = (time) => {
    if (
      time.minutes > 99 ||
      time.minutes < 0 ||
      time.seconds > 60 ||
      time.seconds < 0 ||
      (time.minutes === 0 && time.seconds === 0 && clockRunning === false) ||
      Number.isNaN(time.minutes) ||
      Number.isNaN(time.seconds)
    ) {
      return false;
    }
    return true;
  };

  $('.start').click((e) => {
    e.preventDefault();
    memoryTime = {
      minutes: parseInt($('#minutes').val(), 10),
      seconds: parseInt($('#seconds').val(), 10),
    };

    if (checkTime(memoryTime)) {
      if (!clockRunning) {
        userTime = { ...memoryTime };
        clockRunning = true;
        disableInput();
        updateRing('ring-stroke');
        updateText('STOP');
        $('.settings').hide();
        interval = setInterval(() => {
          if (memoryTime.minutes === 0 && memoryTime.seconds === 0) {
            clearInterval(interval);
            updateRing('ending');
            updateText("TIME'S UP!!! STOP!");
            sound.loop(true);
            sound.play();
          } else {
            if (memoryTime.seconds === 0) {
              memoryTime.minutes -= 1;
              memoryTime.seconds = 60;
            }
            memoryTime.seconds -= 1;
            updateTime(memoryTime);
          }
        }, 1000);
      } else if (clockRunning) {
        sound.stop();
        clockRunning = false;
        clearInterval(interval);
        updateRing('ending');
        updateText('START');
        $('.settings').show();
        updateTime(userTime);
      }
    } else {
      alert('Enter valid time');
      updateTime({
        minutes: 15,
        seconds: 0,
      });
      enableInput();
    }
  });
});
