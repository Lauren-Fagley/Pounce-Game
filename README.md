# 🐴 POUNCE

**Pounce** is a fast-paced, horse-racing-themed score tracker for the card game of the same name. Designed to make scorekeeping more fun and visual, Pounce uses AngularJS and custom animations to display game progress with horses racing across the screen. 

This project also served as a personal challenge to improve my **HTML**, **CSS**, and **JavaScript** skills and to **learn AngularJS** for the first time.

---

## 🎯 Purpose

- Learn how to build a single-page app (SPA) with AngularJS
- Practice responsive UI design with HTML/CSS
- Apply animations and DOM manipulation for interactive fun
- Build a real, playable game utility for my favorite card game

---

## 🌟 Features

### 🧑‍🤝‍🧑 Add & Manage Players
- Unique name validation
- Manual or automatic score input options
- Player removal & round reset

### 🧮 Score Calculations
- Manual input or automatic calculation using pounce pile and cards out
- Win condition: First to 100+ points
- Handles ties and negative scores

### 🐎 Horse Race Animation
- Players each get a random horse PNG (from Vecteezy)
- Horse position updates based on current score
- Visual race with lanes and progress bar

### 🗣️ Dynamic Commentary
- Custom messages for:
  - Taking or losing the lead
  - Maintaining position
  - Negative scores
  - Ties
- Adds humor and character to each round

### 📊 Scoreboard
- Ranks players with ordinal positions (1st, 2nd, etc.)
- Displays player names, scores, and dialogue
- Smooth animated updates

---

## 🛠️ Technologies

- **AngularJS 1.8.2** – routing, views, and app logic
- **HTML5 / CSS3** – layout, styling, and animations
- **JavaScript** – logic for gameplay and UI
- **Google Fonts** – `Barriecito`, `Oxanium`
- **Vecteezy.com** – Horse PNGs
- **ChatGPT** – Helped troubleshoot stuck moments
- **YouTube** – [Net Ninja's AngularJS Tutorial Series](https://www.youtube.com/watch?v=FlUCU13dJyo&list=PL4cUxeGkcC9gsJS5QgFT2IvWIX78dV3_v)

---

## 🧱 File Structure

pounce/

├── index.html # Entry point, sets up Angular app

├── header.html # Reusable header/navigation bar

├── home.html # Animated landing title

├── play.html # Core gameplay UI

├── pounce.css # All custom styles and animations

├── app/

│ └── app.js # AngularJS routing & controllers

├── horses/

│ └── horse1.png - horse23.png # Player horse icons (from Vecteezy)

└── pictures/

└── racetrack.png # Background image for race lanes


---

## 🚧 Planned Features

### Coming Soon
-  Scoreboard animations
-  Score editing for previous rounds
-  Statistics tracking per player
-  Player stats dashboard
-  Horse animation (actual galloping or movement)

### Long-Term Goals
-  Tournament bracket generator
-  Online multiplayer version of Pounce (play with friends!)

---

## 🧠 What I Learned

- How to build and structure a single-page app using AngularJS
- Creating dynamic forms and reusable views
- Managing complex UI state in JavaScript
- Building custom UI animations with CSS keyframes
- Debugging with developer tools and online resources

---

## 👩‍💻 About the Creator

**Lauren Fagley**  
 Computer Science graduate  
 Passionate about building fun, interactive tools  
 Always learning through code  

---

## 📜 License

This is a personal learning project and not intended for commercial use. Feel free to fork and build upon it for educational or personal fun!

---
