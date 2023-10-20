/* Инициация основных переменных */
const DURATION = 119; // продолжительность дней БП
const WEEKLY_REWARD = 4000; // очки основного еженедельньного задания
const WEEKLY_REWARD_Q = 4; // количество основных еженедельных заданий
const WEEKLY_REWARD_ADD = 4500; // очки дополнительных еженедельных заданий
const WEEKLY_REWARD_ADD_Q = 2; // количество дополнительных еженедельных заданий
const DAILY_SCORE = 1500; // количество очков за ежедневные задания
const LEVEL_SCORE = 5000; // количество очков за 1 уровень

const MAX_LEVEL = 140; // максимальный уровень основного БП
const ADD_LEVEL_SCORE = 15; // награда за дополнительные уровни БП

const WEEKLY_SCORE =
  WEEKLY_REWARD * WEEKLY_REWARD_Q +
  WEEKLY_REWARD_ADD * WEEKLY_REWARD_ADD_Q +
  DAILY_SCORE * 7;

const FIRST_DAY_SCORE =
  WEEKLY_REWARD * WEEKLY_REWARD_Q +
  WEEKLY_REWARD_ADD * WEEKLY_REWARD_ADD_Q +
  DAILY_SCORE;

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
  inputDay = parseInt(document.getElementById("inputDay").value);
  score = scoreByDay(inputDay);
  level = levelByScore(score);
  resources = resourcesByLevel(level);
  weeks = Math.floor(inputDay / 7);
  day = inputDay - weeks * 7;

  if (!isNaN(inputDay)) {
    document.getElementById(
      "result-title"
    ).textContent = `За ${inputDay} дней (${weeks} нед. и ${day} дн.):`;
    document.getElementById(
      "result-body"
    ).textContent = `Ты прокачаешь ${level} уровней БП и получишь ${resources} подшипников`;
    UIkit.modal("#modal-result").show();
  }
}

function calculateByResources() {
  inputResources = parseInt(document.getElementById("inputResources").value);
  level = levelForResources(inputResources);
  days = daysForLevel(level);
  weeks = Math.floor(days / 7);
  day = days - weeks * 7;
  if (!isNaN(inputResources)) {
    document.getElementById(
      "result-title"
    ).textContent = `${inputResources} подшипников`;
    document.getElementById(
      "result-body"
    ).textContent = `Можно получить на ${level} уровне или через ${days} дн. (${weeks} нед. и ${day} дн.)`;
    UIkit.modal("#modal-result").show();
  }
}

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

function levelByScore(score) {
  level = Math.floor(score / LEVEL_SCORE);
  return level;
}

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

  const RESOURCES_SUM = VALUES.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  console.log(RESOURCES_SUM);
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

function levelForResources(need) {
  resources = 0;
  level = 0;
  while (resources < need) {
    level++;
    resources = resourcesByLevel(level);
  }
  return level;
}

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
