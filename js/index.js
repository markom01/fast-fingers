"use strict";

(function start() {
  const LETTERS = document.querySelectorAll("#letters button");
  const PLAY_AGAIN_BTN = document.querySelector("button#play-again");
  const BUTTONS = [...LETTERS].concat(PLAY_AGAIN_BTN);
  const RAND_NUM_SET = new Set();
  const interval = 1000; // in ms

  BUTTONS.forEach((btn) => (btn.type = "button"));

  (function play() {
    RAND_NUM_SET.clear();
    const USER_NUM_ARRAY = [];
    const generateRandNums = (() => {
      while (RAND_NUM_SET.size < LETTERS.length) {
        let randNum;
        randNum = Math.floor((Math.random() * 10) % LETTERS.length);
        RAND_NUM_SET.add(randNum);
      }
    })();

    const RAND_NUM_SET_ITERATOR = RAND_NUM_SET.values();
    const RAND_NUM_ARRAY = [...RAND_NUM_SET];

    LETTERS.forEach((letter, i) => {
      letter.disabled = true;
      let RAND_NUM_SET_VALUE = RAND_NUM_SET_ITERATOR.next().value;

      const setOrder = () =>
        setTimeout(() => {
          letter.style.order = RAND_NUM_SET_VALUE;
        }, i * interval);

      if (i !== RAND_NUM_SET.size) {
        setOrder();
      }

      setTimeout(() => {
        letter.disabled = false;
        clearInterval(setOrder);

        letter.onclick = () => {
          letter.classList.add("clicked");
          let USER_NUM_ARRAY_VALUE = Number(
            getComputedStyle(letter).getPropertyValue("order")
          );
          USER_NUM_ARRAY.push(USER_NUM_ARRAY_VALUE);
        };
      }, RAND_NUM_SET.size * interval);
    });

    const areEqual = (array1, array2) => {
      if (array1.length === array2.length) {
        return array1.every((element, index) => {
          if (element === array2[index]) {
            return true;
          }

          return false;
        });
      }

      return false;
    };

    let timeToPlay; // in ms
    if (window.matchMedia("(pointer: coarse)").matches) {
      // touch device
      timeToPlay = 5000;
    } else {
      timeToPlay = 4000;
    }

    setTimeout(() => {
      setTimeout(() => {
        LETTERS.forEach((letter) => {
          if (letter.classList.contains("clicked"))
            letter.classList.remove("clicked");
        });
        if (areEqual(RAND_NUM_ARRAY, USER_NUM_ARRAY)) {
          alert("Good job!");
          PLAY_AGAIN_BTN.style.opacity = 1;
          PLAY_AGAIN_BTN.disabled = false;
          PLAY_AGAIN_BTN.onclick = () => {
            play();
            PLAY_AGAIN_BTN.style.opacity = 0;
            PLAY_AGAIN_BTN.disabled = true;
          };
        } else {
          play();
        }
      }, timeToPlay);
    }, RAND_NUM_SET.size * interval);
  })();
})();
