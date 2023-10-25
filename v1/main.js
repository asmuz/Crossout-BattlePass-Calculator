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
    ).innerHTML = `<b>${needBuy}</b> уровней докупить`;
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
  inputMissDay = parseInt(document.getElementById("inputMissDays").value);
  missScore = inputMissDay * DAILY_SCORE;
  resources = resourcesByLevel(inputLevel);
  days = daysForLevel(inputLevel);
  score = scoreByDay(days) - missScore;

  if (days > DURATION) days = DURATION;
  printDay(days);
  printLevel(inputLevel);
  printResources(resources);
  printScore(score);
  needBuy = howManyBuy(inputLevel);
  if (needBuy <= 0) {
    document.getElementById("result-needBuy").innerHTML = ``;
  } else if (needBuy > 0) {
    document.getElementById(
      "result-needBuy"
    ).innerHTML = `<b>${needBuy}</b> уровней нужно докупить`;
  }
}

function onchangeResources() {
  inputResources = parseInt(document.getElementById("inputResources").value);
  level = levelForResources(inputResources);
  needBuy = howManyBuy(level);
  //days = daysForLevel(level - paidLevel());
  days = daysForLevel(level);
  score = inputLevel * LEVEL_SCORE - inputMissDay * DAILY_SCORE;
  if (days > DURATION) days = DURATION;
  printDay(days);
  printLevel(level);
  printResources(resources);
  if (needBuy <= 0) {
    document.getElementById("result-needBuy").innerHTML = ``;
  } else if (needBuy > 0) {
    document.getElementById(
      "result-needBuy"
    ).innerHTML = `<b>${needBuy}</b> уровней докупить`;
  }
}

function onchangePaid() {
  onchangeDay();
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
