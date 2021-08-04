<template>
  <div class="main-bar">
    <h1 style="font-style: italic;font-size: 2.2em">KCA</h1>
    <div id="nav">
      <router-link to="/">Hoofdscherm</router-link>
      <router-link to="/mededelingen">Mededelingen</router-link>
    </div>
  </div>
  <router-view :filialen="filialen"/>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      filialen: state => state.filialen
    })
  },
  async mounted() {
    try{
      await this.$store.dispatch('getAllFilialen');
    }
    catch(error) {
      this.error = error;
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.main-bar {
  color: #2c3e50;
  background: #f7637d;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: 1;
}

#nav {
  padding: 0.5em;
  display: flex;
  justify-content: space-evenly;
}

#nav a {
  font-weight: bold;
  color: white;
  transition: all 200ms ease-in-out;
  text-decoration: none;
}

#nav a:hover {
  transform: scale(1.2);
  color: blue;
}

#nav a.router-link-exact-active {
  border-bottom: blue 0.2em solid;
}

@media only screen and (max-width: 780px) {
  body {
    font-size: 13px;
  }
}
</style>
