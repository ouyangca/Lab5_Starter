// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  /*
    When you select a horn from the drop down menu, the following should occur:
    The correct image should display
    The correct audio sound file should be set
  */
  // Get references to the dropdown, image and audio elements
  const hornSelect = document.getElementById("horn-select");
  const hornImage = document.querySelector("#expose img");
  const hornAudio = document.getElementsByClassName("hidden");

  // Define the image files for each horn
  const hornImages = {
    "air-horn": "assets/images/air-horn.svg",
    "car-horn": "assets/images/car-horn.svg",
    "party-horn": "assets/images/party-horn.svg",
  };

  // Define the audio files for each horn
  const hornAudios = {
    "air-horn": "assets/audio/air-horn.mp3",
    "car-horn": "assets/audio/car-horn.mp3",
    "party-horn": "assets/audio/party-horn.mp3",
  };

  // Add an event listener to the dropdown to change the image and audio when a new option is selected/changed
  hornSelect.addEventListener("change", function() {
    const selectedHorn = hornSelect.value; // Get the selected value from the dropdown menu
    hornImage.src = hornImages[selectedHorn]; // Set the image source based on the selected value
    hornAudio.src = hornAudios[selectedHorn]; // Set the audio source based on the selected value
  });

  /*
    When you change the volume on the slider, the following should occur:
    At zero volume, the mute icon (level 0) should be displayed
    From 1 to < 33 volume the first volume level should be displayed
    From 33 to < 67 volume the second volume level should be displayed
    From 67 and up the third volume level should be displayed
    The correct volume icon should be set
    The corresponding volume should be set for the audio element (note: this element’s volume is not out of 100)
  */
  // Get references to the slider and icon elements
  const volumeSlider = document.getElementById("volume");
  const volumeIcon = document.querySelector("[src='assets/icons/volume-level-2.svg']");

  // Define the icon images for each volume level when sliding the volume
  const volumeIcons = {
    "volume-level-0": "assets/icons/volume-level-0.svg",
    "volume-level-1": "assets/icons/volume-level-1.svg",
    "volume-level-2": "assets/icons/volume-level-2.svg",
    "volume-level-3": "assets/icons/volume-level-3.svg",
  };

  // Define the volume levels for each volume range when sliding the volume
  const volumeLevels = {
    "volume-level-0": 0,
    "volume-level-1": 0.33,
    "volume-level-2": 0.67,
    "volume-level-3": 1,
  };

  // Add an event listener to the slider to change the icon based on different levels and set the volume for the audio volume when the value changes
  volumeSlider.addEventListener("input", function() {
    const volumeSliderValue = volumeSlider.value; // Get the value of the slider
    let volumeLevel;

    // Determine the volume level based on the slider value
    if (volumeSliderValue == 0) {
      volumeLevel = "volume-level-0";
    } else if (volumeSliderValue < 33) {
      volumeLevel = "volume-level-1";
    } else if (volumeSliderValue < 67) {
      volumeLevel = "volume-level-2";
    } else {
      volumeLevel = "volume-level-3";
    }

    // Set the volume icon source based on the volume level categorized at above step
    volumeIcon.src = volumeIcons[volumeLevel];

    // Set the volume of the audio element based on the volume level
    const audioVolume = volumeLevels[volumeLevel];
    hornAudio.volume = audioVolume;
  });


  /*
    When you click the “Play Sound” button the following should occur:
    The corresponding sound for the horn selected should play out loud at the specified volume
    If the Party Horn is selected, confetti should shoot out out, as shown in the video
  */
  const button = document.querySelector("button");
  const jsConfetti = new JSConfetti();

  button.addEventListener('click', function() {
    hornAudio.play(); //play the audio

    //const selectedHorn = hornSelect.value;
    if (hornSelect.value === "party-horn"){
      jsConfetti.addConfetti();
    }
  })

}


