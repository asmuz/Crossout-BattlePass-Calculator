function calculateLevelByDay() {
  const day = parseInt(document.getElementById("dayInput").value);
  const result = levelByDay(day);
  document.getElementById(
    "result1"
  ).textContent = `Уровень механиков: ${result}`;
}

function calculateBearingByLevel() {
  const level = parseInt(document.getElementById("levelInput").value);
  const result = bearingByLevel(level);
  document.getElementById(
    "result2"
  ).textContent = `Количество подшипников: ${result}`;
}

function calculateLevelForBearing() {
  const needBearing = parseInt(document.getElementById("bearingInput").value);
  const result = levelForBearing(needBearing);
  if (result === -1) {
    document.getElementById("result3").textContent =
      "Не удалось достичь нужного количества подшипников.";
  } else {
    document.getElementById(
      "result3"
    ).textContent = `Уровень для ${needBearing} подшипников: ${result}`;
  }
}
function levelByDay(day) {
  if (day > 119) {
    day = 119;
  }
  const week = Math.floor(day / 7) + 1;
  const score_w = week * 25000;
  const score_d = day * 1500;
  const score = score_w + score_d;
  const level = Math.floor(score / 5000);
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
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 100, 15, 15, 15, 15, 200,
    15, 15, 15, 15, 200, 15, 15, 15, 15, 15, 15, 15, 15, 200,
  ];

  let countBearings = 0;
  let index = 0;

  while (b_level[index] <= level && index < b_level.length - 1) {
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
    const bearings = bearingByLevel(level);
    if (bearings >= needBearing) {
      return level;
    }
  }
  return -1; // Вернуть -1, если нужное количество подшипников недостижимо.
}
