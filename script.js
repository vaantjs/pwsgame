let currentNumber = '';
let level = 1;
let startTime;
let times = [];

function startGame() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    nextLevel();
}

function nextLevel() {
    currentNumber = generateNumber(level);
    document.getElementById('number-display').innerText = currentNumber;
    document.getElementById('input-container').style.display = 'none';
    document.getElementById('correct-message').style.display = 'none';

    // Bepaal de tijd dat het nummer getoond wordt
    const displayTime = 2000 + (level - 1) * 1000; // Start met 2 seconden en verhoog met 1 seconde per niveau

    setTimeout(() => {
        document.getElementById('number-display').innerText = '';
        document.getElementById('input-container').style.display = 'block';
        document.getElementById('user-input').value = '';
        document.getElementById('user-input').focus();
        startTime = new Date();

        // Voeg een event listener toe voor de Enter-toets
        document.getElementById('user-input').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                checkNumber();
            }
        });
    }, displayTime);
}

function generateNumber(length) {
    let number = '';
    for (let i = 0; i < length; i++) {
        number += Math.floor(Math.random() * 10);
    }
    return number;
}

function checkNumber() {
    const userInput = document.getElementById('user-input').value;
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    times.push(timeTaken);

    if (userInput === currentNumber) {
        document.getElementById('correct-message').style.display = 'block';
        setTimeout(() => {
            level++;
            nextLevel();
        }, 1000);
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    const timeResults = document.getElementById('time-results');
    timeResults.innerHTML = '<h2>Time taken per level:</h2>';
    times.forEach((time, index) => {
        timeResults.innerHTML += `<p>Level ${index + 1}: ${time} seconds</p>`;
    });
}