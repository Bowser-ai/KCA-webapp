<template>
  <div class="main-bar">
    <h1 style="font-style: italic;font-size: 2.2em">KCA</h1>
    <div id="nav">
      <router-link :to="{name: 'mainScreen'}">Hoofdscherm</router-link>
      <router-link :to="{name: 'mededelingen'}">Mededelingen</router-link>
    </div>
  </div>
  <router-view :filialen="filialen"/>
</template>

<script>
import { mapState } from 'vuex';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

export default {
  computed: {
    ...mapState({
      filialen: state => state.filialen,
    })
  },
  async mounted() {
    try{
      const repository = RepositoryFactory.createRepository(
        process.env.VUE_APP_REPOSITORY
      );
      this.$store.commit('setRepository', repository);
      await this.$store.dispatch('getAllFilialen');
      await this.$store.dispatch('getAllMededelingen');
    }
    catch(error) {
      this.error = error;
    }
  },
}
</script>

<style>
pre {
  white-space: break-spaces;
}

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

.results {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding: 10px;
  width: 85vw;
}

.btn {
  font-size: 0.7em;
  border-radius: 1em;
  width: fit-content;
  padding: 0.5em;
  margin: 1rem;
  cursor: pointer;
  transition: all 400ms ease-in-out;
  background-color: bisque;
}

.btn:hover {
  background-color: #f7637d;
}

.result-card {
  display: flex;
  flex-direction: column;
  font-size: 1.3em;
  align-items: center;
  background-color: #d0a3a7;
  padding: 20px;
  box-shadow: 3px 5px 5px 3px;
  width: 90%;
  margin: 1.5em auto;
  border-radius: 10px;
}

.header {
  text-decoration: underline;
  font-weight: bold;
}

.address-link:hover {
  color: red;
}

.edit-mededeling {
  display: block;
  width: 90%;
  height: max-content;
  font-size: 1.1em;
  margin: auto;
}

.mededeling {
  margin: 0.3rem;
}

.mededeling-header {
  font-size: 0.9rem;
  margin: 0.5rem auto;
}

.mededelingen {
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 780px) {
  body {
    font-size: 12px;
  }

  .modal-body {
    width: 85%;
  }

  .input-field {
    flex-direction: column;
  }

  .input-field > label {
    margin-bottom: 0.5em;
  }
}
</style>
