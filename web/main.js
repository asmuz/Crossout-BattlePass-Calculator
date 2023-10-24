/* Инициация основных переменных */
const START_DATE = "10/12/2023";
const DURATION = 119; // продолжительность дней БП
const WEEKLY_REWARD = 4000; // очки основного еженедельньного задания
const WEEKLY_REWARD_Q = 4; // количество основных еженедельных заданий
const WEEKLY_REWARD_ADD = 4500; // очки дополнительных еженедельных заданий
const WEEKLY_REWARD_ADD_Q = 2; // количество дополнительных еженедельных заданий
const DAILY_SCORE = 1500; // количество очков за ежедневные задания
const LEVEL_SCORE = 5000; // количество очков за 1 уровень

const MAX_LEVEL = 140; // максимальный уровень основного БП
const ADD_LEVEL_SCORE = 15; // награда за дополнительные уровни БП
const MAX_LEVEL_BY_SCORE = 120; // максимальный уровень прокачки БП за задания

const WEEKLY_SCORE =
  WEEKLY_REWARD * WEEKLY_REWARD_Q +
  WEEKLY_REWARD_ADD * WEEKLY_REWARD_ADD_Q +
  DAILY_SCORE * 7;

const FIRST_DAY_SCORE =
  WEEKLY_REWARD * WEEKLY_REWARD_Q +
  WEEKLY_REWARD_ADD * WEEKLY_REWARD_ADD_Q +
  DAILY_SCORE;

// функция стартует при перезагрузке страницы
function start() {
  day = today();
  //day = 230;
  if (day > DURATION) {
    document.getElementById(
      "result-todayIs"
    ).innerHTML = `<b>БП закончился</b>`;
  } else {
    document.getElementById(
      "result-todayIs"
    ).innerHTML = `<b>${day}</b> дней с начала БП`;
    document.getElementById("inputLeftDays").value = day;
    document.getElementById("range-inputLeftDays").value = day;
    document.getElementById("inputMissDays").value = 0;
    document.getElementById("range-inputMissDays").value = 0;
    document.getElementById("result-needBuy").innerHTML = ``;
    onchangeDay();
  }
}

function printDay(day) {
  document.getElementById("inputLeftDays").value = day;
  document.getElementById("range-inputLeftDays").value = day;
  document.getElementById(
    "result-todayIs"
  ).innerHTML = `<b>${day}</b> дней с начала БП`;
  document.getElementById("result-daysLeft").innerHTML = `<b>${
    DURATION - day
  }</b> дней осталось`;
}
function printScore(score) {
  document.getElementById("result-score").innerHTML = `<b>${score}</b> очков`;
}

function printLevel(level) {
  document.getElementById("inputLevel").value = level;
  document.getElementById("range-inputLevel").value = level;
  document.getElementById("result-level").innerHTML = `<b>${level}</b> уровень`;
}

function printResources(resources) {
  document.getElementById("inputResources").value = resources;
  document.getElementById("range-inputResources").value = resources;
  document.getElementById(
    "result-resources"
  ).innerHTML = `<b>${resources}</b> подшипников`;
}

function onchangeDay() {
  paid = paidLevel();
  inputDay = parseInt(document.getElementById("inputLeftDays").value);
  inputMissDay = parseInt(document.getElementById("inputMissDays").value);
  if (inputMissDay < 0) {
    inputMissDay = 0;
  }
  if (inputMissDay >= inputDay) {
    document.getElementById("range-inputMissDays").max = inputDay;
    document.getElementById("range-inputMissDays").value = inputDay;
    document.getElementById("inputMissDays").value = inputDay;
  }
  score = scoreByDay(inputDay) - inputMissDay * DAILY_SCORE;
  level = levelByScore(score) + paid;
  resources = resourcesByLevel(level);
  weeks = Math.floor(inputDay / 7);
  day = inputDay - weeks * 7;
  document.getElementById("range-inputMissDays").max = inputDay;

  if (inputMissDay > 0) {
    document.getElementById(
      "result-daysMiss"
    ).innerHTML = `<b>${inputMissDay}</b> дней пропущено`;
  }
  if (inputMissDay <= 0) {
    document.getElementById("result-daysMiss").innerHTML = ``;
  }
  needBuy = howManyBuy(inputLevel);
  if (needBuy <= 0) {
    document.getElementById("result-needBuy").innerHTML = ``;
  } else if (needBuy > 0) {
    document.getElementById(
      "result-needBuy"
    ).innerHTML = `<b>${needBuy}</b> уровней нужно докупить`;
  }
  printDay(inputDay);
  printLevel(level);
  printScore(score);
  printResources(resources);
}

function onchangeMissDay() {
  onchangeDay();
}

function onchangeLevel() {
  inputLevel = parseInt(document.getElementById("inputLevel").value);
  resources = resourcesByLevel(inputLevel);
  days = daysForLevel(inputLevel);
  if (days > DURATION) days = DURATION;
  // weeks = Math.floor(days / 7);
  // day = days - weeks * 7;
  printDay(days);
  printLevel(inputLevel);
  printResources(resources);
  needBuy = howManyBuy(inputLevel);
  if (needBuy <= 0) {
    document.getElementById("result-needBuy").innerHTML = ``;
  } else if (needBuy > 0) {
    document.getElementById(
      "result-needBuy"
    ).innerHTML = `<b>${needBuy}</b> уровней нужно докупить`;
  }
  //  onchangeDay();
}

function onchangeResources() {
  inputResources = parseInt(document.getElementById("inputResources").value);
  level = levelForResources(inputResources);
  needBuy = howManyBuy(level);
  //days = daysForLevel(level - paidLevel());
  days = daysForLevel(level);
  if (days > DURATION) days = DURATION;
  // weeks = Math.floor(days / 7);
  // day = days - weeks * 7;
  printDay(days);
  printLevel(level);
  printResources(resources);
  if (needBuy <= 0) {
    document.getElementById("result-needBuy").innerHTML = ``;
  } else if (needBuy > 0) {
    document.getElementById(
      "result-needBuy"
    ).innerHTML = `<b>${needBuy}</b> уровней нужно докупить`;
  }
}

function onchangePaid() {
  paid = paidLevel();
  level = parseInt(document.getElementById("inputLevel").value);
  resources = resourcesByLevel(level);
  printDay(inputDay);
  printLevel(level);
  printScore(score);
  printResources(resources);
}

function paidLevel() {
  const levels = document.getElementById("paid_bp");
  n = Number(levels.elements["buy"].value);
  return n;
}

function today() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  const date1 = new Date(START_DATE);
  const date2 = new Date(today);
  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();
  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);
  return diffInDays + 1;
}

function calculateMaxLevel() {
  miss = parseInt(document.getElementById("inputMissdays").value);
  paid = paidLevel();
  if (paid == 0) {
    bpType = "Без покупки";
  }
  if (paid == 1) {
    bpType = "С простым";
  }
  if (paid == 15) {
    bpType = "С элитным";
  }
  score = scoreByDay(DURATION) - miss * DAILY_SCORE;
  level = levelByScore(score) + paid;
  resources = resourcesByLevel(level);

  if (miss > 0) {
    document.getElementById(
      "a-result-1"
    ).innerHTML = `Пропустив <b>${miss}</b> дней`;
  }
  document.getElementById("a-result-2").innerHTML = `<b>${bpType} БП</b>`;
  document.getElementById(
    "a-result-3"
  ).innerHTML = `ты прокачаешь <b>${level}</b> уровней`;
  document.getElementById(
    "a-result-4"
  ).innerHTML = `и получишь <b>${resources}</b> подшипников`;
}

function howManyBuy(needLevel) {
  maxLevel = MAX_LEVEL_BY_SCORE + paidLevel();
  needBuy = needLevel - maxLevel;
  if (needBuy > 0) return needBuy;
  else return 0;
}

function calculateByResources() {
  inputResources = parseInt(document.getElementById("inputResources").value);
  level = levelForResources(inputResources);
  needBuy = howManyBuy(level);
  //days = daysForLevel(level - paidLevel());
  days = daysForLevel(level);
  weeks = Math.floor(days / 7);
  day = days - weeks * 7;
  document.getElementById(
    "b-result-1"
  ).innerHTML = `<b>${inputResources}</b> подшипников`;
  document.getElementById(
    "b-result-2"
  ).innerHTML = `Можно получить на <b>${level}</b> уровне`;
  //document.getElementById("b-result-3").innerHTML = `или через <b>${days} дн.</b> (${weeks} нед. и ${day} дн.)`;
  document.getElementById(
    "b-result-4"
  ).innerHTML = `Придётся докупить <b>${needBuy}</b> уровней`;
}

function calculateByLevel() {
  inputLevel = parseInt(document.getElementById("inputLevel").value);
  resources = resourcesByLevel(inputLevel);
  days = daysForLevel(inputLevel);
  weeks = Math.floor(days / 7);
  day = days - weeks * 7;
  if (!isNaN(inputLevel)) {
    document.getElementById(
      "result-title"
    ).textContent = `Для прокачки ${inputLevel} уровня БП:`;
    document.getElementById(
      "result-body"
    ).textContent = `Нужно ${days} дней (${weeks} нед. и ${day} дн.). К этому моменту у тебя будет ${resources} подшипников.`;
    UIkit.modal("#modal-result").show();
  }
}

function calculateByDay() {
  paid = paidLevel();
  if (paid == 0) {
    bpType = "Без покупки";
  }
  if (paid == 1) {
    bpType = "С ОБЫЧНЫМ";
  }
  if (paid == 15) {
    bpType = "С ЭЛИТНЫМ";
  }
  inputDay = parseInt(document.getElementById("inputDay").value);
  score = scoreByDay(inputDay);
  level = levelByScore(score) + paid;
  resources = resourcesByLevel(level);
  weeks = Math.floor(inputDay / 7);
  day = inputDay - weeks * 7;

  if (!isNaN(inputDay)) {
    document.getElementById(
      "result-title"
    ).textContent = `За ${inputDay} дней (${weeks} нед. и ${day} дн.):`;
    document.getElementById(
      "result-body"
    ).textContent = `${bpType} БП ты прокачаешь ${level} уровней и получишь ${resources} подшипников`;
    UIkit.modal("#modal-result").show();
  }
}

// количество очков опыта через определенное количество дней
function scoreByDay(days) {
  if (days > DURATION) {
    days = DURATION;
  }
  score = 0;
  weeks = Math.floor(days / 7);
  score += weeks * WEEKLY_SCORE;
  days -= weeks * 7;
  if (days >= 1) {
    score += FIRST_DAY_SCORE;
    days--;
  }
  score += days * DAILY_SCORE;
  return score;
}

// какой уровень будет при получении определенного количества опыта
function levelByScore(score) {
  level = Math.floor(score / LEVEL_SCORE);
  return level;
}

// сколько ресурсов будет на определенном уровне
function resourcesByLevel(level) {
  // Уровни, на которых выдаются подшипники
  const LEVELS = [
    11, 27, 35, 47, 54, 63, 72, 76, 77, 78, 80, 82, 84, 86, 87, 88, 89, 91, 92,
    93, 94, 96, 100, 101, 102, 104, 106, 108, 109, 110, 111, 113, 115, 116, 118,
    122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 134, 135, 136, 137,
    138, 139, 140,
  ];
  // Количество подшипников
  const VALUES = [
    50, 40, 75, 50, 75, 100, 60, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 100, 15, 15, 15, 15,
    200, 15, 15, 15, 15, 200, 15, 15, 15, 15, 15, 15, 15, 15, 200,
  ];

  // общее количество ресурсов основного БП
  const RESOURCES_SUM = VALUES.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  count = 0;
  index = 0;
  if (level > MAX_LEVEL) {
    count = RESOURCES_SUM + (level - MAX_LEVEL) * ADD_LEVEL_SCORE;
    return count;
  }
  while (LEVELS[index] <= level && index <= LEVELS.length - 1) {
    count += VALUES[index];
    index++;
  }
  return count;
}

// количество уровней для получения нужного количества ресурсов
function levelForResources(need) {
  resources = 0;
  level = 0;
  while (resources < need) {
    level++;
    resources = resourcesByLevel(level);
  }
  return level;
}

// количество дней для прокачки нужного уровня
function daysForLevel(level) {
  score = level * LEVEL_SCORE;
  fullWeeks = Math.floor(score / WEEKLY_SCORE);
  days = fullWeeks * 7;
  fullWeekScore = fullWeeks * WEEKLY_SCORE;
  score -= fullWeekScore;
  if (score > 0) {
    score = score - FIRST_DAY_SCORE;
    days++;
  }
  if (score > 0) {
    days += Math.ceil(score / DAILY_SCORE);
  }
  return days;
}
