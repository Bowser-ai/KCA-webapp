<template>
  <div v-if="!authenticatedUser || isLoading" class="auth">
    <div class="spinner" v-if="isLoading"></div>
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
        :disabled="!username || !password"
        @click="login"
        class="login-btn"
      >
        Login
      </button>
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

export default {
  data() {
    return {
      username: "",
      password: "",
      authenticatedUser: null,
      authError: "",
      isLoading: true,
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
      try {
        await Auth.login(this.username, this.password);
        this.authError = "";
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
.spinner {
  border: 4px solid #f3f3f3; /* Light gray background */
  border-top: 4px solid #3498db; /* Blue color for the spinning part */
  border-radius: 50%; /* Make it circular */
  width: 40px; /* Set the width of the spinner */
  height: 40px; /* Set the height of the spinner */
  animation: spin 1s linear infinite; /* Animation to make it spin */
  position: absolute;
  left: 50%;
  top: 50%;
}

.auth-error {
  color: red;
  text-align: center;
  height: 5%;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  } /* Start at 0 degrees */
  100% {
    transform: rotate(360deg);
  } /* End at 360 degrees */
}
</style>
