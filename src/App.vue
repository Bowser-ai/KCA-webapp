<template>
  <div class="main-bar">
    <h1 style="font-style=italic;font-size:50px">KCA</h1>
    <div id="nav">
      <router-link to="/">Hoofdscherm</router-link>
      <router-link to="/mededelingen">Mededelingen</router-link>
    </div>
  </div>
  <router-view/>
</template>

<style scoped>
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
  padding: 30px;
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
  border-bottom: blue 5px solid;
}
</style>
