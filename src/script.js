const { invoke } = window.__TAURI__.tauri

const timerDiv = document.getElementById("timer")
const secondInput = document.getElementById("secondsInput");
const minuteInput = document.getElementById("minuteInput");
const hourInput = document.getElementById("hourInput");
const start = document.getElementById("start");

const second = document.getElementById("secondOutput");
const minute = document.getElementById("minuteOutput");
const hour = document.getElementById("hourOutput");

const pause = document.getElementById("pause")
const restart = document.getElementById("restart")

const timerDivInput = document.getElementById("timerInput")
const timerDivOutput = document.getElementById("timerOutput")
const buttons = document.getElementById("buttons")
const quoteEl = document.getElementById("quotes")

let s = parseInt(secondInput.value) + 1;
let m = parseInt(minuteInput.value);
let h = parseInt(hourInput.value);

let sInputPrevious = parseInt(secondInput.value);
let mInputPrevious = parseInt(minuteInput.value);
let hInputPrevious = parseInt(hourInput.value);

let timerInterval; // Store interval ID
// let timerStart = false;
// let timerPause = false
// let timerRestart = false
// let timerComplete = false;

let timer = {
  start: false,
  pause: false,
  restart: false,
  complete: false
}

let startPosition;
let FullScreen;
let InputPosition

const quotes = ["Waktu adalah pedang bermata dua. Ia bisa menjadi sahabat, atau musuhmu. Gunakan dengan bijak.", "Masa lalu adalah sejarah, masa depan adalah misteri, tapi hari ini adalah anugerah. Gunakan waktumu dengan baik.", "Jangan menunda pekerjaanmu. Hari ini kerjakan apa yang bisa kau kerjakan, jangan menunggu sampai besok.", "Waktu yang terbuang sia-sia adalah kehilangan potensi dalam hidupmu. Manfaatkan setiap detiknya.", "Waktu takkan pernah kembali. Gunakan waktumu untuk hal yang berarti dan bermanfaat.", "Waktu adalah harta yang paling berharga. Jangan sia-siakan dengan hal-hal yang tidak penting.", "Setiap detik yang berlalu takkan pernah terulang. Buatlah setiap detiknya berharga.", "Waktu adalah guru terbaik. Ia akan mengajarimu banyak hal, jika kau mau belajar.", "Jangan menunggu waktu yang tepat. Waktu yang tepat adalah saat ini, saat kau mulai bertindak.", "Waktu adalah sumber keberhasilan. Gunakanlah dengan bijak, dan kau akan mencapai apa yang kau inginkan.", "Hidup ini singkat. Gunakan waktumu untuk membuat perbedaan di dunia.", "Waktu adalah kompas. Ia menunjukkan arah mana yang harus kau tuju.", "Waktu adalah sahabat sejati. Ia selalu bersamamu, dalam suka maupun duka."]

const soundFilePath = "./assets/done_soundeffect.mp3"
const audiocontext = new AudioContext()
const audioelement = new Audio(soundFilePath)
const audiosource = audiocontext.createMediaElementSource(audioelement)
audiosource.connect(audiocontext.destination)

function applyStyles(isFullscreen) {

  if (isFullscreen) {
    document.body.style.background = "url(./assets/fullScreen.gif)";
    timerDivOutput.classList.add("fullScreen")
    timerDivInput.classList.add("fullScreen")
  } else {
    timerDivOutput.classList.remove("fullScreen")
    timerDivInput.classList.remove("fullScreen")
    document.body.style.background = (hour < 12) ? "url(./assets/noon.webp)" : "url(./assets/night.webp)";
  }
}

let previousInputPosition = 0; // Initialize previous input position

async function checkCurrentStateOfTime() {
  requestAnimationFrame(checkCurrentStateOfTime);
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.overflow = "hidden";
  startPosition = innerHeight / 2 - timerDivInput.clientHeight / 2
  InputPosition = innerHeight + timerDivInput.offsetHeight

  startPosition = innerHeight / 2 - timerDivInput.clientHeight / 2;
  InputPosition = innerHeight + timerDivInput.offsetHeight;

  // Check if InputPosition value changes from previous value
  if (InputPosition !== previousInputPosition) {
    // Value changed, update previousInputPosition
    previousInputPosition = InputPosition;
    // Do something with the changed value
    console.log('InputPosition changed:', InputPosition);

    // Create a new animation to transition timerDivInput to the center position
    if (timer.start) {
      gsap.to(timerDivInput, {
        delay: 2,
        duration: 1,
        bottom: InputPosition,
      });
    } else {
      gsap.to(timerDivInput, {
        duration: 1,
        bottom: "50%",
      });
    }
  }

  invoke("is_fullscreen")
    .then(isFullscreen => {
      applyStyles(isFullscreen);
      FullScreen = isFullscreen
    })
    .catch(error => {
      console.log("An error occurred:", error);
    });
}

checkCurrentStateOfTime();
