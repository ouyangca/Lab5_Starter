// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  /*
  Requirements:
  On page load, all of the available voices that you can use for your SpeechSynthesizer should be 
  loaded and populate the “Select Voice” dropdown.
  */

  // Initialize the SpeechSynthesis object
  const synth = window.speechSynthesis;
  // Get the DOM elements, including dropdown selection
  const voiceSelect = document.getElementById("voice-select");
  let voices = [];

  synth.addEventListener("voiceschanged", function() {
    // access all the voices list to populate all the voices in the list to dropdown menu
    voices = synth.getVoices();

    // iterate over through all the voices list to update elements/strings
    // of each voice string displayed on page for different voices
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  });

  /* When you click the “Press to Talk” button, the following should happen:
     The text that you have typed into the “Text to speak here” textarea should 
     be spoken out loud using the voice that you have selected.
     Only while the synthesizer is speaking, the face should swap to being open mouthed (included in the images folder)
  */

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
    
  // Get the DOM elements for the "Press to Talk" button，smile face image, and text area, 
  const button = document.querySelector("button");
  const smileImage = document.querySelector("img");
  const textArea = document.getElementById("text-to-speak");

  button.addEventListener("click", function() {
    // create a new SpeechSynthesisUtterance object
    const utterThis = new SpeechSynthesisUtterance(textArea.value);
    // get the selected option's attribute of data-name
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    
    for (let i = 0; i < voices.length; i++) {
      // when going over the voices list, if the current voice's name
      // equal to our selected option's voice's data-name
      if (voices[i].name === selectedOption) {
        // the utterThis's voice would be the current voice, voices[i]
        utterThis.voice = voices[i];
      }
    }
    
    // Set the onstart and onend event handlers to change the smile face images
    // when speaking, the smiling would be open
    utterThis.onstart = () => {
      smileImage.src = 'assets/images/smiling-open.png';
    };
    utterThis.onend = () => {
      smileImage.src = 'assets/images/smiling.png';
    };

    // Speak the text in the text area using the selected voice
    synth.speak(utterThis);
  });
}