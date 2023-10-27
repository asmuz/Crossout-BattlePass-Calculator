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
  document.getElementById("result-score").innerHTML = `<b>${
    score % LEVEL_SCORE
  }</b> очков до уровня`;
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
