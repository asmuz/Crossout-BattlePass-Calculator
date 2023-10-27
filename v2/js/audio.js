var myAudio = document.getElementById("myAudio");
//var isPlaying = false;

// Громкость на 50%
myAudio.volume = 0.3;

function togglePlay() {
  //   if (isPlaying) {
  //     myAudio.pause();
  //   } else {
  //     myAudio.play();
  //   }
  myAudio.play();
}

myAudio.onplaying = function () {
  isPlaying = true;
};

myAudio.onpause = function () {
  isPlaying = false;
};

myAudio.onended = function () {
  // Когда аудио завершено, воспроизводим его снова (зацикливаем)
  myAudio.currentTime = 0; // Сбрасываем время воспроизведения в начало
  myAudio.play();
};

// // Автоматически воспроизводим аудио при загрузке страницы
// window.onload = function () {
//   togglePlay();
// };
