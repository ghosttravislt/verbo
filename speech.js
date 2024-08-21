let clicked = document.querySelector("#start");
let speech = document.querySelector(".speech");
let ring = document.querySelector(".ring");
console.log(clicked);

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let speechApi = new speechRecognition();

let finalTranscript = "";

clicked.addEventListener("click", () => {
  speechApi.lang = "en-US";
  speechApi.start();
  speechApi.onresult = (e) => {
    const result = e.results[0][0].transcript;
    finalTranscript = result;

    speech.innerText = finalTranscript;
  };

  ring.style.color = "red";

  speechApi.onend = () => {
    ring.style.color = "black";
    speechApi.stop();
  };

  setInterval(() => {
    speech.innerText = "";
  }, 1000 * 60);
});

// console.log(speechApi);
