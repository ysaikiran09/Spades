class Spades {
  constructor(name, team) {
    this.name = name;
    this.team = team;
    this.scores = [];
    this.wins = 0;
  }

  add(score, won) {
    if (score === won) {
      score *= 10;
    } else if (score < won) {
      score = (score * 10) + (won - score);
    } else {
      score = (score - won) * -10;
    }
    this.scores.push(score);
    this.wins += 1;
  }

  remove() {
    if (this.scores.length > 0) {
      this.scores.pop();
      this.wins = Math.max(this.wins - 1, 0);
    }
  }

  total() {
    return this.scores.reduce((a, b) => a + b, 0);
  }
}

const players = {};
const teams = {};
let currentRound = 1;

// Add Teams
function addTeam() {
  const teamName = document.getElementById("teamName").value.trim();
  if (!teamName || teams[teamName]) {
    alert("Enter a unique team name.");
    return;
  }
  teams[teamName] = [];
  updateTeamDropdown();
  document.getElementById("teamName").value = "";
}

// Update team dropdown
function updateTeamDropdown() {
  const select = document.getElementById("teamSelect");
  select.innerHTML = Object.keys(teams)
    .map(team => `<option value="${team}">${team}</option>`)
    .join("");
}

// Add Player to a Team
function addPlayer() {
  const playerName = document.getElementById("playerName").value.trim();
  const team = document.getElementById("teamSelect").value;

  if (!playerName || players[playerName]) {
    alert("Enter a unique player name.");
    return;
  }

  players[playerName] = new Spades(playerName, team);
  teams[team].push(playerName);

  document.getElementById("playerName").value = "";
  updateDisplay();
}

// Add Score
function addScoreToPlayer(name) {
  const bid = parseInt(document.getElementById(`bid-${name}`).value);
  const won = parseInt(document.getElementById(`won-${name}`).value);

  if (isNaN(bid) || isNaN(won)) {
    alert("Enter valid bid and won values.");
    return;
  }

  players[name].add(bid, won);
  updateDisplay();
}

// Remove Score
function removeScoreFromPlayer(name) {
  players[name].remove();
  updateDisplay();
}

// Round Navigation
function nextRound() {
  currentRound++;
  document.getElementById("roundDisplay").innerText = `Round ${currentRound}`;
}

function prevRound() {
  if (currentRound > 1) {
    currentRound--;
    document.getElementById("roundDisplay").innerText = `Round ${currentRound}`;
  }
}

// Update UI
function updateDisplay() {
  const board = document.getElementById("playerBoard");
  const tableBody = document.getElementById("summaryTableBody");
  board.innerHTML = "";
  tableBody.innerHTML = "";

  Object.keys(players).forEach(name => {
    const player = players[name];

    // Player Card
    const div = document.createElement("div");
    div.className = "player-block";

    const header = document.createElement("div");
    header.className = "player-header";
    header.innerHTML = `${player.name} (${player.team}) <span class="round-counter">🏆 Wins: ${player.wins}</span>`;
    div.appendChild(header);

    const controls = document.createElement("div");
    controls.className = "controls";
    controls.innerHTML = `
      <input type="number" id="bid-${name}" placeholder="Bid" min="0" max="13" />
      <select id="won-${name}">
        ${[...Array(14).keys()].map(i => `<option value="${i}">${i}</option>`).join("")}
      </select>
      <button class="add-btn" onclick="addScoreToPlayer('${name}')">Add</button>
      <button class="remove-btn" onclick="removeScoreFromPlayer('${name}')">Remove</button>
    `;
    div.appendChild(controls);

    const scoreList = document.createElement("ul");
    scoreList.className = "score-list";
    player.scores.forEach((s, i) => {
      const item = document.createElement("li");
      item.className = "score-item";
      item.innerText = `Round ${i + 1}: ${s}`;
      scoreList.appendChild(item);
    });

    div.appendChild(scoreList);
    board.appendChild(div);

    // Leaderboard Row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player.team}</td>
      <td>${player.name}</td>
      <td>${player.total()}</td>
      <td>${player.wins}</td>
    `;
    tableBody.appendChild(row);
  });
}
