<template>
  <div>
    <nav>
      <div class="logo">
        <router-link to="/">
          <i class="fas fa-chess"></i>
          <h4>Szach</h4>
        </router-link>
      </div>
      <ul class="nav-bar">
        <li class="nav-item" style="display: none">
          <router-link to="/puzzles">
            <i class="fas fa-chess-pawn"></i>
            <h4>Puzzles</h4>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/duel">
            <i class="fas fa-chess-knight"></i>
            <h4>Pojedynek</h4>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/engine">
            <i class="fas fa-chess-bishop"></i>
            <h4>Sparing silników</h4>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/training">
            <i class="fas fa-chess-board"></i>
            <h4>Gry Treningowe</h4>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/statistics">
            <i class="fas fa-chart-line"></i>
            <h4>Statystyki</h4>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="main-content">
      <div class="nice-title-block">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="top-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="var(--palette-4)" />
              <stop offset="0%" stop-color="var(--palette-5)" />
            </linearGradient>
          </defs>
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <div class="title-block"></div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    window.engineNamesByKeys = {
      "random": "Silnik ruchów przypadkowych",
      "minimax": "Silnik MinMax",
      "montecarlo": "Silnik MonteCarlo",
      "stockfish": "Stockfish",
      "ai": "Silnik AI, implementacja 1",
      "ai2": "Silnik AI, implementacja 2",
      "AiComputer": "Silnik AI, implementacja 1",
      "AiComputer2": "Silnik AI, implementacja 2",
      "MiniMaxComputer": "Silnik MinMax",
      "MonteCarloComputer": "Silnik MonteCarlo",
      "RandomComputer": "Silnik ruchów przypadkowych",
      "StockfishComputer": "Stockfish",
    };
    window.engineOptions = [
      {
        key: 1,
        value: "random",
        text: window.engineNamesByKeys["random"],
      },
      {
        key: 2,
        value: "minimax",
        text: window.engineNamesByKeys["minimax"],
      },
      {
        key: 3,
        value: "montecarlo",
        text: window.engineNamesByKeys["montecarlo"],
      },
      {
        key: 4,
        value: "stockfish",
        text: window.engineNamesByKeys["stockfish"],
      },
      {
        key: 5,
        value: "ai",
        text: window.engineNamesByKeys["ai"],
      },
      {
        key: 6,
        value: "ai2",
        text: window.engineNamesByKeys["ai2"],
      },
    ];
  },
};
</script>

<style>
/* mainly navbar styling might throw more if i want to */
:root {
  --nav-bg: #414141;
  --nav-width: 5rem;
  --scrollbar-color: rgb(29, 29, 29);
  --nav-icon-size: 2.5rem;
  --button-color: rgb(0 143 208);

  /* CSS HEX */
  --palette-1: rgb(195, 225, 250);
  --palette-2: #91aec1ff;
  --palette-3: #508ca4ff;
  --palette-4: #0a8754ff;
  --palette-5: rgb(2, 97, 56);
}

body {
  margin: 0;
  padding: 0;
  background: var(--palette-1);
}
body *:not(i) {
  font-family: "Roboto Mono", monospace !important;
}

body::-webkit-scrollbar {
  width: 0.8rem;
}

body::-webkit-scrollbar-thumb {
  background: var(--scrollbar-color);
}

body::-webkit-scrollbar-track {
  background: var(--palette-5);
}

.main-content {
  margin-left: calc(var(--nav-width) + 2em);
  overflow: hidden;
}

nav {
  height: 100vh;
  width: var(--nav-width);
  position: fixed;
  left: 0;
  background-color: var(--palette-5);
  transition: width 200ms ease;
  z-index: 10;
}

@media screen and (max-width: 650px) {
  nav {
    left: auto;
    bottom: 0;
    width: 100vw;
    height: auto;
    display: flex;
  }

  .nav-bar {
    gap: 15px;
  }

  .nav-item {
    flex-basis: unset !important;
  }

  .logo > a {
    padding: 0.9em !important;
  }

  .main-content {
    max-width: calc(100% - 2em);
    margin: auto;
    margin-bottom: 80px;
  }

  .board-main {
    flex-grow: 1;
  }
}

@media screen and (max-width: 400px) {
  .nav-bar {
    gap: 0px !important;
    flex-basis: 100%;
  }

  .nav-item {
    padding: .75em !important;
    flex-grow: 1;
  }

  .nav-item > a > i {
    flex-basis: 100% !important;
  }
}

@media screen and (min-width: 650px) {
  .highlighted[class*="white"] {
    background: rgb(255, 118, 118) !important;
  }

  .highlighted[class*="black"] {
    background: rgb(255, 70, 70) !important;
  }
}

.logo > a {
  text-decoration: none;
  color: rgb(255, 217, 224);
  display: flex;
  padding: 0.5em 1rem;
}

.logo > a > h4 {
  display: none;
  margin: 0;
  padding: 0.5em 1em;
  font-size: 16px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 2000ms linear;
}

.logo > a > i {
  font-size: var(--nav-icon-size);
  flex-grow: 1;
}

.nav-bar {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.logo {
  background: var(--palette-5);
  padding: 0;
}

.nav-item {
  flex-basis: 100%;
  padding: 1em;
}

.nav-item > a {
  text-decoration: none;
  color: white;
  display: flex;
  align-content: center;
}

.nav-item > a > h4 {
  margin: 0;
  padding: 0.5em 1em;
  font-size: 16px;
  display: none;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
}
.nav-item > a > i {
  font-size: var(--nav-icon-size);
  color: white;
  flex-basis: 1em;
  flex-shrink: 0;
  text-align: center;
}

.nav-item {
  transition: background 400ms ease-in-out;
}
.nav-item > a > * {
  transition: color 200ms ease-in-out;
}
.logo > a > * {
  transition: color 200ms ease-in-out;
}

.nice-title-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  overflow: hidden;
  line-height: 0;
  z-index: -1;
}

.nice-title-block svg {
  position: relative;
  display: block;
  width: calc(190% + 1.3px);
  height: 90px;
  transform: rotateY(180deg);
}

.nice-title-block .shape-fill {
  fill: url("#top-gradient");
}

.title-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  background: var(--palette-5);
  z-index: -1;
}

@media screen and (min-width: 1100px) {
  .nice-title-block {
    display: block;
  }

  .title-block {
    display: none;
  }
}

@media screen and (max-width: 1100px) and (min-width: 650px){
  .title-block {
    display: none;
  }

  .nice-title-block svg {
    width: calc(300% + 1.3px) !important;
  }
}

@media screen and (max-width: 650px) {
  .title-block {
    display: block;
  }
  .nice-title-block {
    display: none;
  }
}

@media screen and (max-width: 400px) {
  .title-block {
    height: 120px !important;
  }
}

@media (hover: hover) {
  nav:hover {
    width: 17em;
  }
  nav:hover .nav-item > a > h4 {
    display: block;
  }
  .nav-item:hover > a > * {
    color: rgb(171, 243, 227) !important;
  }
  .nav-item:hover {
    background: var(--palette-4);
  }

  nav:hover .logo > a > h4 {
    display: block;
    opacity: 1;
  }
  nav:hover .logo > a > i {
    flex-grow: 0;
    text-align: left;
  }

  .logo:hover > a > * {
    color: rgb(255, 104, 134);
  }
}
</style>
