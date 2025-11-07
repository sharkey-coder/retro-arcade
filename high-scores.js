// High Score System for Snake Game

const highScores = [];

// Bug 1: No input validation - what if score is negative or name is empty?
function addHighScore(playerName, score) {
  highScores.push({
    name: playerName,
    score: score,
    timestamp: Date.now()
  });
  
  // Bug 2: Sorting in place without returning, and wrong order
  highScores.sort((a, b) => a.score - b.score); // ascending instead of descending
}

// Bug 3: No bounds checking - what if n is negative or bigger than array?
function getTopScores(n) {
  return highScores.slice(0, n);
}

// Bug 4: Potential null reference error
function displayHighScores() {
  const container = document.getElementById('high-scores');
  container.innerHTML = ''; // What if container is null?
  
  const topTen = getTopScores(10);
  
  topTen.forEach(score => {
    const scoreElement = document.createElement('div');
    // Bug 5: No HTML escaping - XSS vulnerability
    scoreElement.innerHTML = `${score.name}: ${score.score}`;
    container.appendChild(scoreElement);
  });
}

// Bug 6: No error handling, synchronous localStorage can throw
function saveHighScores() {
  localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Bug 7: No error handling for invalid JSON
function loadHighScores() {
  const saved = localStorage.getItem('highScores');
  return JSON.parse(saved); // What if saved is null or invalid JSON?
}

// Bug 8: Memory leak - event listener never removed
window.addEventListener('load', () => {
  loadHighScores();
  displayHighScores();
});