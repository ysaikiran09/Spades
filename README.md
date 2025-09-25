# ♠️ Spades Scores Tracker

A dynamic and interactive web-based Spades game score tracker with full support for:

- 🧍‍♂️ Multiple Players
- 👥 Teams & Multiplayer Modes
- 🕹 Round Navigation (e.g., Round 1, 2, 3…)
- 📊 Real-time Leaderboard Table
- ➕ Add / ❌ Remove Scores per Player

---

## 🚀 Features

### ✅ Player & Team Management
- Add players and group them under any number of teams.
- Each player is assigned to a team and tracked independently.

### ✅ Round Navigation
- Navigate through game rounds.
- Each score is tagged to a specific round (displayed as “Round X”).

### ✅ Scoring Logic
Follows traditional Spades scoring logic:

- If **Bid == Tricks Won** → `Score = Bid * 10`
- If **Bid < Tricks Won** → `Score = (Bid * 10) + Bags`
- If **Bid > Tricks Won** → `Score = -(Bid - Tricks Won) * 10`

### ✅ Real-time Leaderboard
- Displays:
  - Team name
  - Player name
  - Total score
  - Rounds won
- Automatically updates after every score change.

---

## 📁 Project Structure
spades-score-tracker/
├── index.html # Main HTML file
├── style.css # Custom styles
├── script.js # JavaScript logic
└── README.md # Project documentation

---

## 🧑‍💻 How to Run

1. **Clone or Download** the repo.

2. Open `index.html` in any modern web browser.

> No dependencies or build tools needed. Pure HTML + CSS + JS.

---

## 🧠 Future Enhancements (Optional)

You can extend this project with:
- 💾 `localStorage` persistence (retain data after refresh)
- 📥 CSV or Excel export for scores
- 🔒 Authentication for team players
- 🧠 AI-powered bidding suggestions

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

---

### Made with ♥ for Spades fans.
