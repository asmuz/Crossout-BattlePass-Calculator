// выполняется при загрузке страницы
function start() {
  day = today();
  if (day > DURATION) RESULT_DAY.innerHTML = `<b>БП закончился</b>`;
  else {
    RESULT_DAY.innerHTML = `<b>${day}</b> дней с начала БП`;
    INPUT_DAY.value = day;
    RANGE_DAY.value = day;
    INPUT_SKIP.value = 0;
    RANGE_SKIP.value = 0;
    RANGE_SKIP.max = day - 1;
    RESULT_BUY.innerHTML = ``;
    onchangeDay();
  }
}

function onchangeDay() {
  paid = paidLevel();
  day = days();
  skip = skipDays(day);
  score = dayToScore(day) - skip * DAILY_SCORE; // вычитаем пропущенные дни
  level = scoreToLevel(score) + paid; // прибавляем купленные уровни
  resources = levelToResources(level, paid);

  //extra = extraLevel(level);

  printDay(day);
  printSkip(skip);
  printScore(score);
  printLevel(level);
  printResources(resources);
}
