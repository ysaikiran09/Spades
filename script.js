let teams = [];
let round = 1;
const maxTeams = 4;
const maxPlayersPerTeam = 2;
const maxRounds = 13;

function addTeam() {
  const teamName = document.getElementById("teamName").value.trim();
  if (!teamName || teams.length >= maxTeams) return;

  teams.push({ name: teamName, players: [], scores: [], roundsWon: 0 });
  updateTeamDropdown();
  render();
}

function updateTeamDropdown() {
  const select = document.getElementById("teamSelect");
  select.innerHTML = "";
  teams.forEach((team, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.innerText = team.name;
    select.appendChild(opt);
  });
}

function addPlayer() {
  const name = document.getElementById("playerName").value.trim();
  const teamIndex = document.getElementById("teamSelect").value;
  if (!name || teams[teamIndex].players.length >= maxPlayersPerTeam) return;

  teams[teamIndex].players.push({ name, bids: [], won: [] });
  render();
}

function render() {
  const container = document.getElementById("teamsContainer");
  container.innerHTML = "";

  teams.forEach((team, tIndex) => {
    const teamDiv = document.createElement("div");
    teamDiv.className = "team";

    const header = document.createElement("h3");
    header.innerText = `${team.name}`;
    teamDiv.appendChild(header);

    team.players.forEach((player, pIndex) => {
      const div = document.createElement("div");
      div.className = "player-inputs";

      const label = document.createElement("label");
      label.innerHTML = `<strong>${player.name}</strong> Bid: `;
      div.appendChild(label);

      const bidInput = document.createElement("input");
      bidInput.type = "number";
      bidInput.value = player.bids[round - 1] || "";
      bidInput.onchange = (e) => {
        player.bids[round - 1] = Number(e.target.value);
      };
      div.appendChild(bidInput);

      const wonLabel = document.createElement("span");
      wonLabel.innerText = "Won: ";
      div.appendChild(wonLabel);

      const wonCounter = document.createElement("button");
      wonCounter.className = "counter-button";
      wonCounter.innerText = player.won[round - 1] || 0;
      wonCounter.onclick = () => {
        if (!player.won[round - 1]) player.won[round - 1] = 0;
        player.won[round - 1]++;
        wonCounter.innerText = player.won[round - 1];
        updateRoundResults();
        render();
      };
      div.appendChild(wonCounter);

      teamDiv.appendChild(div);
    });

    container.appendChild(teamDiv);
  });

  updateLeaderboard();
  document.getElementById("roundDisplay").innerText = `Round ${round}`;
}

function updateRoundResults() {
  let totalWins = 0;
  let valid = true;

  teams.forEach((team) => {
    if (team.players.length !== maxPlayersPerTeam) {
      valid = false;
      return;
    }

    let totalBid = 0;
    let totalWon = 0;

    team.players.forEach((p) => {
      if (p.bids[round - 1] == null || p.won[round - 1] == null) {
        valid = false;
      }
      totalBid += p.bids[round - 1] || 0;
      totalWon += p.won[round - 1] || 0;
    });

    if (!valid) return;

    let score = 0;
    if (totalBid === totalWon) {
      score = totalBid * 10;
      team.roundsWon++;
    } else if (totalWon > totalBid) {
      score = (totalBid * 10) + (totalWon - totalBid);
    } else {
      score = (totalBid - totalWon) * -10;
    }

    team.scores[round - 1] = score;
    totalWins += totalWon;
  });

  if (!valid || totalWins !== round) {
    alert(`Invalid entry. Total wins of both teams must equal ${round}.`);
    return false;
  }

  return true;
}

function nextRound() {
  if (!updateRoundResults()) return;
  if (round < maxRounds) {
    round++;
    render();
  }
}

function prevRound() {
  if (round > 1) {
    round--;
    render();
  }
}

function updateLeaderboard() {
  const tbody = document.getElementById("leaderboardTable");
  tbody.innerHTML = "";

  teams.forEach((team) => {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    name.innerText = team.name;
    const score = document.createElement("td");
    score.innerText = team.scores.reduce((a, b) => a + b, 0);
    const rounds = document.createElement("td");
    rounds.innerText = team.roundsWon;
    tr.appendChild(name);
    tr.appendChild(score);
    tr.appendChild(rounds);
    tbody.appendChild(tr);
  });
}
