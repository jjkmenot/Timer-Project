let timer;
let totalSeconds = 0;
let isRunning = false;

const display = document.querySelector('.display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

// Inputs for custom time
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

// Function to update the display
function updateDisplay() {
  let mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  let secs = String(totalSeconds % 60).padStart(2, '0');
  display.textContent = `${mins}:${secs}`;
}

// Start Button Click Event
startBtn.addEventListener('click', () => {
  if (!isRunning) {
    // Get input values when starting
    if (totalSeconds === 0) {
      const inputMinutes = parseInt(minutesInput.value) || 0;
      const inputSeconds = parseInt(secondsInput.value) || 0;
      totalSeconds = inputMinutes * 60 + inputSeconds;
    }

    if (totalSeconds > 0) {
      isRunning = true;
      timer = setInterval(() => {
        totalSeconds--;
        updateDisplay();
        if (totalSeconds === 0) {
          clearInterval(timer);
          isRunning = false;
          playSound(); // Play sound when countdown ends
          showConfetti(); // Optional: show confetti!
        }
      }, 1000);
    }
  }
});

// Stop Button Click Event
stopBtn.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
});

// Reset Button Click Event
resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  totalSeconds = 0;
  updateDisplay();
  isRunning = false;
  minutesInput.value = '';
  secondsInput.value = '';
});

// Function to play a sound when the timer ends
function playSound() {
  const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
  audio.play();
}

// (Optional) Function to show confetti when time's up
function showConfetti() {
  alert("🎉 Time's Up! 🎉"); // Simple alert for now
}

updateDisplay(); // Initialize display to 00:00
// Timer logic remains the same as before...

// Theme Switching Logic
const themeSelector = document.getElementById('theme');

themeSelector.addEventListener('change', (e) => {
  const theme = e.target.value;
  switch (theme) {
    case 'dark':
      setTheme('#000', '#001f3f', '#ffffff', '#0074D9', '#ff69b4');
      break;
    case 'light':
      setTheme('#f0f0f0', '#ffffff', '#333333', '#4CAF50', '#388E3C'); // Light green accents
      break;
    case 'pastel':
      setTheme('#ffe4e1', '#ffb6c1', '#4b0082', '#ff69b4', '#db7093'); // Soft pinks and purples
      break;
  }
});

function setTheme(bgColor, cardColor, textColor, buttonColor, buttonHover) {
  document.documentElement.style.setProperty('--bg-color', bgColor);
  document.documentElement.style.setProperty('--card-color', cardColor);
  document.documentElement.style.setProperty('--text-color', textColor);
  document.documentElement.style.setProperty('--button-color', buttonColor);
  document.documentElement.style.setProperty('--button-hover', buttonHover);
}
