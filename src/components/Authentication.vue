<template>
  <div v-if="!authenticatedUser || isLoading" class="auth">
    <Loader class="loader" v-if="isLoading" />
    <form v-else class="auth-form">
      <div class="form-element">
        <label for="username">Gebruikersnaam</label>
        <input
          v-model="username"
          id="username"
          placeholder="Vul de gebruikersnaam in"
        />
      </div>
      <div class="form-element">
        <label for="password">Wachtwoord</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Vul het wachtwoord in"
        />
      </div>
      <div class="auth-error">{{ authError }}</div>
      <button
        v-if="!isAuthenticating"
        :disabled="!username || !password"
        @click="login"
        class="login-btn"
      >
        Login
      </button>
      <div class="login-loader" v-else><Loader></Loader></div>
    </form>
  </div>
</template>

<script>
import Auth from "@/authentication/fireBaseAuth";
import {
  InvalidUserName,
  InvalidPassword,
  UnknownError,
} from "@/authentication/authError";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      username: "",
      password: "",
      authenticatedUser: null,
      authError: "",
      isLoading: true,
      isAuthenticating: false,
    };
  },
  beforeCreate() {
    Auth.onAuthenticatedUser((user) => {
      this.authenticatedUser = user;
      this.isLoading = false;
    });
  },
  methods: {
    async login(event) {
      event.preventDefault();
      this.isAuthenticating = true;
      this.authError = "";
      try {
        await Auth.login(this.username, this.password);
      } catch (e) {
        if (e instanceof InvalidUserName) {
          this.authError = "Gebruikersnaam is niet correct.";
          return;
        }
        if (e instanceof InvalidPassword) {
          this.authError = "Onjuist wachtwoord ingevuld.";
          return;
        }
        if (e instanceof UnknownError) {
          this.authError =
            "Er heeft een fout opgetreden, probeer het later nog eens.";
          return;
        }
      }
      finally {
        this.isAuthenticating = false;
      }
    },
  },
};
</script>

<style scoped>
.auth {
  display: flex;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgb(0, 0, 0);
}
.auth-form {
  font-size: 14pt;
  border: 2px solid black;
  color: white;
  background-color: grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 50%;
  padding: 20px;
}
.form-element {
  display: flex;
  width: 90%;
  margin-bottom: 100px;
  text-align: left;
}
.form-element label {
  width: 30%;
}
.form-element input {
  width: 50%;
  font-size: 14pt;
}
.login-btn {
  font-size: 14pt;
}
.auth-error {
  color: red;
  text-align: center;
  height: 5%;
  margin-bottom: 20px;
}
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
