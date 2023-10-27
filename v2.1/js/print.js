function printDay(day) {
  INPUT_DAY.value = day;
  RANGE_DAY.value = day;
  RESULT_DAY.innerHTML = `<b>${day}</b> день`;
  if (DURATION - day <= 0) RESULT_LEFT.innerHTML = `<b>ПОСЛЕДНИЙ ДЕНЬ БП!</b>`;
  else RESULT_LEFT.innerHTML = `<b>${DURATION - day}</b> дней осталось`;
}

function printSkip(skip) {
  if (skip <= 0) RESULT_SKIP.innerHTML = ``;
  else RESULT_SKIP.innerHTML = `(<b>${skip}</b> пропущено)`;
}

function printScore(score) {
  score = score % LEVEL_SCORE;
  RESULT_SCORE.innerHTML = `<b>${score}</b> очков уровня`;
}

function printLevel(level) {
  INPUT_LEVEL.value = level;
  RANGE_LEVEL.value = level;
  RESULT_LEVEL.innerHTML = `<b>${level}</b> уровень`;
}

function printResources(resources) {
  INPUT_RES.value = resources;
  RANGE_RES.value = resources;
  RESULT_RES.innerHTML = `<b>${resources}</b> подшипников`;
}
