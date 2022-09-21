<template>
  <div class="loginPageWrapper">
    <div class="loginPageLeft">
      <p>
        <v-row> <h2 class="pt-4 pb-3 display-3">todofy</h2></v-row>
        <v-row
          ><h3>
            your <span class="white--text"> to-do-list </span> in vuetify
          </h3></v-row
        >
      </p>
    </div>
    <v-container class="loginPageRight">
      <!-- snackbar -->
      <v-snackbar
        v-model="snackbar.show"
        :value="true"
        absolute
        left
        shaped
        top
      >
        {{ snackbar.message }}
      </v-snackbar>
      <v-row class="text-center">
        <v-col md="6" offset-md="3">
          <v-card class="pa-4 rounded mt-6 card" outlined tile>
            <h2>Login</h2>
            <v-form v-model="valid">
              <v-text-field
                v-model="username"
                label="Usuário"
                required
                outlined
                append-icon="fa-user"
                v-on:keyup.enter="login"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                required
                outlined
                append-icon="fa-key"
                v-on:keyup.enter="login"
              ></v-text-field>

              <v-btn
                :loading="loading"
                :disabled="!valid"
                color="primary"
                class="mr-4"
                x-large
                block
                @click="login"
                >Continuar <v-icon class="pl-3">fa-arrow-right</v-icon></v-btn
              >
            </v-form>
            <p class="ma-4">
              <span class="subtitle-1"
                >Não tenho conta! Fazer
                <router-link to="/register">Cadastro</router-link></span
              >
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AuthApi from "@/api/auth.api.js";

export default {
  data: () => {
    return {
      loading: false,
      valid: false,
      username: "",
      password: "",
      snackbar: {
        show: false,
        message: "",
      },
    };
  },
  //
  methods: {
    login() {
      this.loading = true;
      AuthApi.login(this.username, this.password)
        .then((user) => {
          console.log("login ok", user);
          this.saveLoggedUser(user);
          this.$router.push({ name: "taskSummary" });
        })
        .catch((error) => {
          console.log("login falhou", error);
          this.snackbar.message = "Usuario ou senha invalida";
          this.snackbar.show = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    saveLoggedUser(user) {
      window.localStorage.setItem("loggedUser", user.id);
      window.localStorage.setItem("loggedUserToken", user.token);
      window.localStorage.setItem("loggedUserInfos", JSON.stringify(user));
    },
  },
};
</script>

<style scoped>
.loginPageWrapper {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
.loginPageLeft {
  background-image: url("/src/assets/cool-background.png");
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 40vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginPageRight {
  width: 60vw;
  display: flex;
  align-items: center;
}
.card {
  max-width: 400px;
}
</style>
