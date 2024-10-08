let clicked = document.querySelector("#start");
let speech = document.querySelector(".speech");
let ring = document.querySelector(".ring");
let copy = document.querySelector(".copy");

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
    const synth = window.speechSynthesis;
    let utterThis = new SpeechSynthesisUtterance();
    utterThis.rate = 1.5;
    let talk = (utterThis.text = finalTranscript);
    console.log(talk);
    synth.speak(utterThis);

    speechApi.stop();
    setInterval(() => {
      speech.innerText = "";
      alert("transcript clean");
    }, 1000 * 60);
  };
});

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(finalTranscript);
  alert("text copied ");
});
