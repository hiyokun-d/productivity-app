function padNumber(num) {
  return num < 10 ? "0" + num : num;
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function reset() {
  clearInterval(timerInterval)
  timer.restart = false;
  timer.pause = false;
  timer.start = false;
  pause.classList.remove("paused")
  restart.disabled = true
  timer.restart = true

  gsap.to(timerDivOutput, {
    opacity: 0.2,
    onComplete: () => {
      gsap.to(timerDivOutput, {
        delay: 1,
        height: 350,
      })
      gsap.to(timerDivInput, {
        position: "absolute",
        bottom: startPosition,
        onComplete: () => {
          gsap.to(timerDivInput, {
            width: 484,
            borderRadius: 60,

            onCompelete: () => {
              gsap.to(timerDivOutput, {
                delay: 2,
                opacity: 0
              })
            }
          })

          gsap.to(hourInput, {
            translateX: 0
          })

          gsap.to(start, {
            height: 40,
            translateX: 0
          })
        }
      })


    }
  })



  //reset the value
  s = parseInt(secondInput.value)
  m = parseInt(minuteInput.value)
  h = parseInt(hourInput.value)

  //enable the input 
  secondInput.disabled = false;
  minuteInput.disabled = false;
  hourInput.disabled = false;
  start.disabled = false

  //update the output
  second.innerText = padNumber(s)
  minute.innerText = padNumber(m)
  hour.innerText = padNumber(h)
}

function init() {
  if (s <= 0) {
    if (m > 0) {
      m--;
      s = 60;
    } else if (h > 0) {
      h--;
      m = 59;
      s = 60;
    }
  }

  if (h === 0 && m === 0 && s === 0) {
    s = 0;
    m = 0;
    h = 0;
    clearInterval(timerInterval);
    timer.start = false;
    timer.complete = true
  } else {
    timer.complete = false
    if (!timer.pause) {
      s--;
    }

    secondInput.disabled = true;
    minuteInput.disabled = true;
    hourInput.disabled = true
    start.disabled = true
  };

  second.innerText = padNumber(s);
  minute.innerText = padNumber(m);
  hour.innerText = padNumber(h);
}

function startFunc() {
  let startButton = -330
  if (!timer.start) {
    timer.start = true;
    restart.disabled = false
    // Reset timer values
    s = parseInt(secondInput.value) + 1;
    m = parseInt(minuteInput.value);
    h = parseInt(hourInput.value);

    gsap.to(timerDivOutput, {
      opacity: 0.1,
      onCompelete: () => {

        gsap.to(timerDivInput, {
          width: 95,
          borderRadius: 10,
          onCompelete: () => {
            if (FullScreen) {
              startButton = -345
            } else startButton = -230
            gsap.to(start, {
              height: 90,
              translateX: startButton,
              onComplete: () => {
                gsap.to(timerDivInput, {
                  delay: .5,
                  position: "absolute",
                  bottom: InputPosition,

                  onCompelete: () => {
                    gsap.to(timerDivOutput, {
                      opacity: 1,
                      onComplete: () => {
                        setInterval(() => {

                          if (FullScreen) {
                            gsap.to(timerDivOutput, {
                              delay: 1,
                              height: 800,
                            })
                          } else {
                            gsap.to(timerDivOutput, {
                              delay: 1,
                              height: 400,
                            })
                          }
                        }, 1000)
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })

    gsap.to(hourInput, {
      translateX: 110
    })

    shuffleArray(quotes);
    quoteEl.innerText = quotes[0]
  }
}

function pauseFunc() {
  if (!timer.pause) {
    timer.pause = true
    pause.classList.add("paused")
  } else {
    timer.pause = false
    pause.classList.remove("paused")
  }
}


start.onclick = () => {
  startFunc()
  timerInterval = setInterval(init, 1000);
}
pause.onclick = pauseFunc
restart.onclick = reset
