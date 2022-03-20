<template>
  <div class="home">
    <Header title="Szach" />
    <div class="introduction">
      <div class="part">
        <h3>Wstęp</h3>
        <p>Aplikacja do pracy dyplomowej "Implementacja i porównanie jakości działania wybranych algorytmów gry w szachy". W kolejnych zakładkach użytkownik ma możliwość sprawdzenia możliwości każdego zaimplementowanego silnika, w pojedynku lub też rozegranie partii silnik vs. silnik oraz obejrzenie wszystkich gier treningowych i walidacyjnych rozegranych przez każdy z nich.</p>
      </div>
      <div class="part">
        <h3>Kod źródłowy</h3>
        <p>Kod źródłowy aplikacji webowej oraz API, z którego korzysta, znajduje się w dwóch repozytoriach:</p>
        <ul class="no-dot">
          <li>
            Kod źródłowy API oraz silników szachowych:
            <a href="https://github.com/swapzero9/chess_api"
              >https://github.com/swapzero9/chess_api</a
            >
          </li>
          <li>
            Kod źródłowy aplikacji:
            <a href="https://github.com/swapzero9/Chess-app"
              >https://github.com/swapzero9/Chess-app</a
            >
          </li>
        </ul>
      </div>
      <div class="part" v-if="showAll">
        <h3>Podsumowanie gier w bazie danych</h3>
        <ul class="no-dot">
          <li v-if="trainingGames > 0">Gier treningowych: <span>{{ trainingGames }}</span></li>
          <li v-else-if="trainingGames == 0">Brak gier treningowych</li>
          <li v-if="validationGames > 0">Gier walidacyjnych: <span>{{ validationGames }}</span></li>
          <li v-else-if="validationGames == 0">Brak gier walidacyjnych</li>
          <li v-if="duelGames > 0">Rozegranych pojedynków: <span>{{ duelGames }}</span></li>
          <li v-else-if="duelGames == 0">Nie rozegrano pojedynków</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      trainingGames: -1,
      validationGames: -1,
      duelGames: -1,
      showAll: false
    }
  },
  mounted() {
    // fetch games
    fetch(`${process.env.VUE_APP_APIURL}/summary`, {
      method: "GET",
    })
    .then(json => {
      return json.json()
    })
    .then(data => {
      this.trainingGames = data.training_games
      this.validationGames = data.validation_games
      this.duelGames = data.duel_games
      this.showAll = true
    })
    .catch(err => {
      console.error(err)
    })
  }
};
</script>

<style scoped>
.introduction {
  margin-top: 30px;
}
th,
td {
  border: 1px solid gray;
  padding: 10px;
}
h3,
p {
  margin: 0;
}
.introduction {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.part{
  max-width: max(60%, 700px);
}

.part > h3 {
  padding-bottom: 10px;
}
.part>* {
  text-align: center;
}

ul > li > span {
  text-decoration: underline;
}

.no-dot {
  list-style-type: none;
  padding-left: 16px;
  margin-top: 10px
}

ul {
  margin: 0;
}
</style>