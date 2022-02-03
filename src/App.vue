<template>
  <div>
    <nav>
      <div class="logo">
        <router-link to="/">
          <i class="fas fa-chess"></i>
          <h4>ChessApp</h4>
        </router-link>
      </div>
      <ul class="nav-bar">
        <li class="nav-item">
          <router-link to="/puzzles">
            <i class="fas fa-chess-pawn"></i>
            <h4>Puzzles</h4>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/duel">
            <i class="fas fa-chess-knight"></i>
            <h4>Duel</h4>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/engine">
            <i class="fas fa-chess-bishop"></i>
            <h4>Engine</h4>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/training">
            <i class="fas fa-chess-board"></i>
            <h4>Training</h4>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/statistics">
            <i class="fas fa-chart-line"></i>
            <h4>Statistics</h4>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style>
/* mainly navbar styling might throw more if i want to */
:root {
  --nav-bg: #414141;
  --nav-width: 5rem;
  --scrollbar-color: crimson;
  --nav-icon-size: 2.5rem;
}

body {
  margin: 0;
  padding: 0;
  background: #bbb;
}
body *:not(i) {
  font-family: "Roboto Mono", monospace !important;
}

body::-webkit-scrollbar {
  width: 0.3rem;
}

body::-webkit-scrollbar-thumb {
  background: var(--scrollbar-color);
}

body::-webkit-scrollbar-track {
  background: var(--nav-bg);
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
  background-color: var(--nav-bg);
  transition: width 200ms ease;
  z-index: 10;
}

.logo {
  background: #383838;
}

.logo > a {
  text-decoration: none;
  color: white;
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
  background: #2b2a2a;
  padding: 0;
}

.nav-item {
  flex-basis: 100%;
  padding: 1em 1em;
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
}
.nav-item > a > i {
  font-size: var(--nav-icon-size);
  color: white;
  flex-basis: 1em;
  flex-shrink: 0;
  text-align: center;
}

@media (hover: hover) {
  nav:hover {
    width: 15rem;
  }
  nav:hover .nav-item > a > h4 {
    display: block;
  }
  .nav-item:hover > a > * {
    color: crimson !important;
  }
  .nav-item:hover {
    background: #383838;
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
    color: green;
  }
}
</style>
