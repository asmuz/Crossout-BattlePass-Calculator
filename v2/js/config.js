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
