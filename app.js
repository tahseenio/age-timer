$(document).ready(function () {
  $('#submit').click(function (e) {
    e.preventDefault();

    var input = $('#dob-input').val();
    var dob = new Date(input);
    save(dob);
    renderAgeLoop();
  });

  function save(dob) {
    localStorage.dob = dob.getTime();
  }

  function load() {
    var dob;
    if ((dob = localStorage.getItem('dob'))) {
      return new Date(parseInt(dob));
    }
    return -1;
  }

  function renderAgeLoop() {
    var dob = load();
    $('#choose').css('display', 'none');
    $('#timer').css('display', 'block');

    setInterval(function () {
      var age = getAge(dob);
      $('#age').html(age.year + '<sup>.' + age.ms + '</sup>');

      var fuel = getFuel(dob);
      $('#fuel').html(`${fuel}%`);
    }, 100);
  }

  function renderChoose() {
    $('#choose').css('display', 'block');
  }

  function getAge(dob) {
    var now = new Date();
    var duration = now - dob;
    var years = duration / 31556900000;

    var majorMinor = years.toFixed(9).toString().split('.');

    return {
      year: majorMinor[0],
      ms: majorMinor[1],
    };
  }

  const getFuel = (dob) => {
    const years75 = '2076-02-21';
    const date75 = new Date(Date.parse(years75));

    const now = new Date();

    const difference = date75 - now;
    const PercentageDiff = (difference / 31556900000 / 75) * 100;

    const diffMajorMinor = PercentageDiff.toFixed(8).toString();

    return diffMajorMinor;
    // return {
    //     year: diffMajorMinor[0],
    //     ms: diffMajorMinor[1]
    // };

    //time left until 75 years -> const difference
    //
  };

  function main() {
    if (load() != -1) {
      renderAgeLoop();
    } else {
      renderChoose();
    }
  }
  main();
});
