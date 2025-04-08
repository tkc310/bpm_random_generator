const initialize = async () => {
  let timer = null;
  let isRunning = false;
  let isNumberOnly = false;

  const bpmInput = document.getElementById('bpm');
  const startStopButton = document.getElementById('startStop');
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  const output = document.getElementById('output');

  function generateRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function generateRandomLetter() {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    return letters[Math.floor(Math.random() * letters.length)];
  }

  function updateDisplay() {
    if (isNumberOnly) {
      output.textContent = generateRandomNumber();
    } else {
      output.textContent = `${generateRandomNumber()}${generateRandomLetter()}`;
    }
  }

  function startStop() {
    if (isRunning) {
      clearInterval(timer);
      startStopButton.textContent = '開始';
      isRunning = false;
    } else {
      const bpm = parseInt(bpmInput.value);
      const interval = (60 / bpm) * 1000;
      timer = setInterval(updateDisplay, interval);
      startStopButton.textContent = '停止';
      isRunning = true;
      updateDisplay();
    }
  }

  function handleModeChange() {
    isNumberOnly = this.value === 'number';
    if (isRunning) {
      updateDisplay();
    }
  }

  const res = await fetch(
    'https://cdn.jsdelivr.net/gh/tkc310/bpm_random_generator@v1/flag.json'
  );
  const bpm = await res.json();
  console.log(bpm);
  if (!bpm.flag) return;

  startStopButton.addEventListener('click', startStop);
  modeRadios.forEach((radio) => {
    radio.addEventListener('change', handleModeChange);
  });
};

window.onload = initialize;
