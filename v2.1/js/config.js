/* Инициация основных переменных */
const START_DATE = "10/12/2023";
const DURATION = 119; // продолжительность дней БП
const WEEKLY_REWARD = 4000; // очки основного еженедельньного задания
const WEEKLY_REWARD_Q = 4; // количество основных еженедельных заданий
const WEEKLY_REWARD_ADD = 4500; // очки дополнительных еженедельных заданий
const WEEKLY_REWARD_ADD_Q = 2; // количество дополнительных еженедельных заданий
const DAILY_SCORE = 1500; // количество очков за ежедневные задания
const LEVEL_SCORE = 5000; // количество очков за 1 уровень

const MAX_LEVEL = 142; // максимальный уровень основного БП
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

// БЕСПЛЫТНЫЕ Уровни, на которых выдаются подшипники
const LEVEL_RESOURCES_FREE = {
  27: 40,
  47: 50,
  72: 60,
};

// Уровни, на которых выдаются подшипники
const LEVEL_RESOURCES = {
  11: 50,
  27: 40,
  35: 75,
  47: 50,
  54: 75,
  63: 100,
  72: 60,
  76: 15,
  77: 15,
  78: 15,
  80: 15,
  82: 15,
  84: 15,
  86: 15,
  87: 15,
  88: 15,
  89: 15,
  91: 15,
  92: 15,
  93: 15,
  94: 15,
  96: 15,
  100: 15,
  101: 15,
  102: 15,
  104: 15,
  106: 15,
  108: 15,
  109: 15,
  110: 15,
  111: 15,
  113: 15,
  115: 15,
  116: 100,
  118: 15,
  122: 15, // 970
  123: 15,
  124: 15,
  125: 200,
  126: 15,
  127: 15,
  128: 15,
  129: 15,
  130: 200,
  131: 15,
  132: 15,
  134: 15,
  135: 15,
  136: 15,
  137: 15,
  138: 15,
  139: 15,
  140: 200,
};

INPUT_DAY = document.getElementById("input-day");
INPUT_SKIP = document.getElementById("input-skip");
INPUT_LEVEL = document.getElementById("input-level");
INPUT_RES = document.getElementById("input-res");

RANGE_DAY = document.getElementById("range-day");
RANGE_SKIP = document.getElementById("range-skip");
RANGE_LEVEL = document.getElementById("range-level");
RANGE_RES = document.getElementById("range-res");

RESULT_DAY = document.getElementById("result-day");
RESULT_LEFT = document.getElementById("result-left");
RESULT_SKIP = document.getElementById("result-skip");
RESULT_LEVEL = document.getElementById("result-level");
RESULT_RES = document.getElementById("result-res");
RESULT_BUY = document.getElementById("result-buy");
RESULT_SCORE = document.getElementById("result-score");
