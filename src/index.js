let current = document.querySelectorAll(".counter-num");
let start = document.getElementById("start-btn");
let stop = document.getElementById("stop-btn");
let reset = document.getElementById("reset-btn");

let totalSeconds = 0;
let interval;
let stopClicked = false;
//Logic for starting the stop watch
function startWatch() {

  //If counter is already running, hitting start button should not do anything
  if (totalSeconds > 0 && !stopClicked) {
    return;
  }
  //If stop watch was paused/stopped, it should start from the same point.
  if (totalSeconds > 0 && stopClicked) {
    stopClicked = false;
    startWatch();
  }
  //UPPER LIMIT : 99 Days, 59 Hours, 59 Minutes,59 Seconds = 85766799 Seconds
  if (totalSeconds >= 0 && totalSeconds <= 85766799) {
    interval = setInterval(function () {
      totalSeconds++;
      let newTime = formatTime(totalSeconds);
      updateValues(newTime);
    }, 1000);
  } else {
    clearInterval(interval);
    return;
  }
}

//function to get current duration in Days/Hours/Minutes/Seconds format
function formatTime(duration) {
  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor((duration / 60) % 60);
  const hours = Math.floor((duration / (60 * 60)) % 24);
  const days = Math.floor(duration / (24 * 60 * 60));

  const formattedDays = String(days).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return [formattedDays, formattedHours, formattedMinutes, formattedSeconds];
}

//Function to update the values on the counter display
function updateValues(newTime) {
  for (let i = 0; i < current.length; i++) {
    current[i].textContent = newTime[i];
  }
}

//Function to pause/stop the counter
function stopWatch() {
  clearInterval(interval);
  stopClicked = true;
  return;
}

//Function to reset the watch.
function resetWatch() {
  clearInterval(interval);
  totalSeconds = 0;
  let resetTime = formatTime(0);
  updateValues(resetTime);
  return;
}

// Function to toggle between dark and light modes
function toggleMode(isDarkMode) {
  // Get the element with the class "stopwatch-container"
  var stopwatchContainer = document.querySelector(".stopwatch-container");

  // Set the background image and colors based on the mode
  stopwatchContainer.style.backgroundImage = isDarkMode
    ? "linear-gradient(-45deg, black, rgb(82, 89, 95))"
    : "linear-gradient(120deg, rgb(255, 255, 255), #616161)";

  // Define the color values based on the mode
  var textColor = isDarkMode ? "rgb(211, 208, 208)" : "black";
  var labelColor = isDarkMode ? "rgb(138, 138, 138)" : "black";

  // Change the color of the headline
  let hColor = document.getElementsByTagName("h1");
  hColor[0].style.color = textColor;

  // Change the color of the stopwatch counter
  let counterNums = document.querySelectorAll(".counter-num");
  for (let i of counterNums) {
    i.style.color = textColor;
  }

  // Change the color of button text
  let buttonTextColor = document.getElementsByClassName("buttons");
  for (let i of buttonTextColor) {
    i.style.backgroundColor = "transparent";
    i.style.color = textColor;
  }

  // Change the color of the counter labels
  let timeFormatLabel = document.getElementsByClassName("time-format");
  for (let i of timeFormatLabel) {
    i.style.color = labelColor;
  }
}

// Dark Mode
function darkMode() {
  toggleMode(true);
}

// Light Mode
function lightMode() {
  toggleMode(false);
}
