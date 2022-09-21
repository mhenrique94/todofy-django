<template>
  <div>
    <v-main class="adjust-footer">
      <router-view />
      <v-btn
        fab
        large
        class="zIndex ma-8 pink white--text lighten-1"
        fixed
        bottom
        right
        v-show="loggedUser"
        @click="scrollToTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "BaseLayout",

  data() {
    return {
      loggedUsername: "",
      loggedUser: "",
    };
  },

  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    carregaLoggedser() {
      try {
        let usertInfo = JSON.parse(
          window.localStorage.getItem("loggedUserInfos")
        );
        this.loggedUser = window.localStorage.getItem("loggedUser");
        this.loggedUsername =
          usertInfo.username.charAt(0).toUpperCase() +
          usertInfo.username.slice(1);
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.carregaLoggedser();
  },
};
</script>

<style scoped>
.adjust-footer {
  min-height: calc(100vh - 161px - 48px);
}

.zIndex {
  z-index: 2;
}
</style>
