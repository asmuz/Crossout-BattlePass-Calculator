// получаем день от начала БП
function today() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  const date1 = new Date(START_DATE);
  const date2 = new Date(today);
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);
  return diffInDays + 1; // +1 считаем, что день завершился
}

// опреляем тип БП (количество дополнительно купленных уровней)
function paidLevel() {
  const levels = document.getElementById("paid_bp");
  paid = Number(levels.elements["buy"].value);
  if (paid == 0)
    RANGE_RES.max = 150; // ограничиваем max поля выбора ресурсов для бесплатного БП
  else RANGE_RES.max = 1960; // ограничиваем max поля выбора ресурсов для платного БП (3 легендарки по 650)
  return paid;
}

function skipDays(day) {
  skip = parseInt(INPUT_SKIP.value);
  RANGE_SKIP.max = day - 1;
  if (day <= skip) {
    RANGE_SKIP.value = day - 1;
    INPUT_SKIP.value = day - 1;
  }
  printSkip();
  return skip;
}

function days() {
  return parseInt(INPUT_DAY.value);
}

// ОСНОВНЫЕ ФУНКЦИИ РАСЧЕТА

// очки опыта через количество дней
function dayToScore(day) {
  if (day > DURATION) {
    day = DURATION;
  }
  score = 0;
  weeks = Math.floor(day / 7); // считаем полные недели
  score += weeks * WEEKLY_SCORE; // считаем очки за полные недели
  day -= weeks * 7; // сколько дней в неполной неделе
  if (day >= 1) {
    // в первый день новой недели (четверг) считаем еженедельки + очки этого дня
    score += FIRST_DAY_SCORE;
    day--;
  }
  score += day * DAILY_SCORE; // прибавляем оставшиеся ежедневные очки
  return score;
}

// уровень от очков опыта
function scoreToLevel(score) {
  level = Math.floor(score / LEVEL_SCORE);
  return level + 1; // +1 начинаем с первого уровня
}

function levelToResources(level, paid) {
  const values = paid ? LEVEL_RESOURCES : LEVEL_RESOURCES_FREE; // выбираем "базу данных" с которой будем работать
  const levels = Object.keys(values).map(Number);
  // общее количество ресурсов
  const RESOURCES_SUM = Object.values(values).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  let count = 0;
  let index = 0;
  if (level > MAX_LEVEL) {
    count = RESOURCES_SUM + (level - MAX_LEVEL) * ADD_LEVEL_SCORE;
    return count;
  }
  while (levels[index] <= level && index <= levels.length - 1) {
    count += values[levels[index]];
    index++;
  }
  return count;
}

function extraLevel(needLevel) {
  // maxLevel = MAX_LEVEL_BY_SCORE + paidLevel() + 1;
  maxLevelByScore = scoreToLevel(dayToScore(DURATION));
  console.log("maxLevelByScore: ", maxLevelByScore);
  needBuy = needLevel - maxLevelByScore;
  if (needBuy > 0) return needBuy;
  else return 0;
}
