<template>
  <nav class="navbar white--text">
    <router-link to="/" class="logo">
      <v-toolbar-title class="font-weight-bold white--text"
        >todofy</v-toolbar-title
      >
    </router-link>
    <v-spacer></v-spacer>
    <h4 class="white--text font-weight-light">
      <span class="font-weight-bold">{{ loggedUsername }}</span
      >, sua to-do list em vuetify
    </h4>
    <v-spacer></v-spacer>
    <ul class="navList">
      <router-link to="/"
        ><li v-show="this.$route.name != 'taskSummary'" class="link">
          Início
        </li></router-link
      >
      <router-link to="/tasks"
        ><li v-show="this.$route.path != '/tasks'">Tarefas</li></router-link
      >

      <router-link to="/manage"
        ><li v-show="this.$route.name != 'manage'">Gerenciar</li></router-link
      >

      <a><li v-if="loggedUser" @click="$emit('logout')">Sair</li></a>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: ["loggedUser", "loggedUsername"],
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.navList {
  display: flex;
  /* gap: 20px; */
  list-style: none;
  height: 100%;
  align-items: center;
  justify-content: center;
  line-height: 6vh;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: whitesmoke;
  line-height: 6vh !important;
  box-sizing: border-box;
  text-align: center;
}

li:hover {
  background-color: black;
  filter: invert();
  opacity: 80%;
  border-radius: 5px;
}
.logo:hover {
  filter: invert();
  opacity: 80%;
  border-radius: 5px;
  line-height: 6vh;
}

.logo {
  display: flex;
  align-items: center;
  gap: 30px;
}

li {
  padding: 0 10px;
  width: 90px;
  height: 6vh !important;
  color: white;
  justify-content: center;
}
@media (max-width: 600px) {
  h4 {
    display: none;
  }
}
</style>
