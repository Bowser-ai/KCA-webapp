<template>
  <Authentication />
  <div class="main-bar">
    <h1 style="font-style: italic; font-size: 2.2em">KCA</h1>
    <div id="nav">
      <router-link to="/">Hoofdscherm</router-link>
      <router-link to="/mededelingen">Mededelingen</router-link>
      <a @click="logout" class="logout-btn">Logout</a>
    </div>
  </div>
  <router-view v-if="!error" :filialen="filialen" />
  <div v-else class="fatal-error">
    De filialen kunnen niet worden geladen, probeer het later nog eens.
  </div>
</template>

<script>
import { mapState } from "vuex";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import Authentication from "@/components/Authentication.vue";
import Auth from "@/authentication/Auth";

export default {
  data() {
    return {
      error: undefined,
    };
  },
  computed: {
    ...mapState({
      filialen: (state) => state.filialen,
    }),
  },
  components: {
    Authentication,
  },
  methods: {
    logout() {
      Auth.logout();
    },
  },
  async mounted() {
    try {
      const repository = RepositoryFactory.createRepository(
        import.meta.env.VITE_REPOSITORY
      );
      this.$store.commit("setRepository", repository);
      await this.$store.dispatch("getAllFilialen");
    } catch (error) {
      this.error = error;
    }
  },
};
</script>

<style>
pre {
  white-space: break-spaces;
}

html,
body {
  height: 100%;
}

#app {
  height: 100%;
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
  top: 0;
  left: 0;
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
  padding: 0.5em;
  cursor: pointer;
  transition: all 400ms ease-in-out;
  background-color: bisque;
}

.logout-btn {
  cursor: pointer;
}

.btn:hover {
  background-color: #f7637d;
}

.fatal-error {
  color: red;
  text-align: center;
  margin: auto;
  position: fixed;
  top: 25%;
  left: 35;
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
