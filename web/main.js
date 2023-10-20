function calculateByLevel() {
  inputLevel = parseInt(document.getElementById("inputLevel").value);
  bearing = bearingByLevel(inputLevel);
  days = daysForLevel(inputLevel);
  weeks = Math.floor(days / 7);
  day = days - weeks * 7;
  document.getElementById(
    "resultLevel"
  ).textContent = `${inputLevel} уровней БП можно прокачать за ${days} дн. (${weeks} нед. и ${day} дн.) и получить ${bearing} подшипников`;
}

function calculateByDay() {
  inputDay = parseInt(document.getElementById("inputDay").value);
  score = scoreByDay(inputDay);
  level = levelByScore(score);
  bearing = bearingByLevel(level);
  weeks = Math.floor(inputDay / 7);
  day = inputDay - weeks * 7;
  document.getElementById(
    "resultDay"
  ).textContent = `За ${inputDay} дн. (${weeks} нед. и ${day} дн.) ты прокачаешь ${level} уровней БП и получишь ${bearing} подшипников`;
}

function calculateByBearing() {
  inputBearing = parseInt(document.getElementById("inputBearing").value);
  level = levelForBearing(inputBearing);
  days = daysForLevel(level);
  weeks = Math.floor(days / 7);
  day = days - weeks * 7;

  document.getElementById(
    "resultBearing"
  ).textContent = `${inputBearing} подшипников можно получить на ${level} уровне или через ${days} дн. (${weeks} нед. и ${day} дн.)`;
}

function scoreByDay(days) {
  if (days > 119) {
    days = 119;
  }
  score = 0;
  weeks = Math.floor(days / 7);
  score += weeks * 35500;
  days -= weeks * 7;
  if (days >= 1) {
    score += 26500;
    days--;
  }
  score += days * 1500;
  return score;
}

function levelByScore(score) {
  level = Math.floor(score / 5000);
  return level;
}

function bearingByLevel(level) {
  // Уровни, на которых выдаются подшипники
  const b_level = [
    11, 27, 35, 47, 54, 63, 72, 76, 77, 78, 80, 82, 84, 86, 87, 88, 89, 91, 92,
    93, 94, 96, 100, 101, 102, 104, 106, 108, 109, 110, 111, 113, 115, 116, 118,
    122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 134, 135, 136, 137,
    138, 139, 140,
  ];

  // Количество подшипников
  const b_value = [
    50, 40, 75, 50, 75, 100, 60, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 100, 15, 15, 15, 15,
    200, 15, 15, 15, 15, 200, 15, 15, 15, 15, 15, 15, 15, 15, 200,
  ];

  let countBearings = 0;
  let index = 0;

  while (b_level[index] <= level && index <= b_level.length - 1) {
    countBearings += b_value[index];
    index++;
  }

  if (level > 140) {
    countBearings += (level - 140) * 15;
  }

  return countBearings;
}

function levelForBearing(needBearing) {
  for (let level = 0; level < 1000; level++) {
    bearings = bearingByLevel(level);
    if (bearings >= needBearing) {
      return level;
    }
  }
}

function daysForLevel(level) {
  score = level * 5000;
  fullWeeks = Math.floor(score / 35500);
  days = fullWeeks * 7;
  fullWeekScore = fullWeeks * 35500;
  score = score - fullWeekScore;
  if (score > 0) {
    score = score - 26500;
    days++;
  }
  if (score > 0) {
    days = days + Math.ceil(score / 1500);
  }
  return days;
}
