<template>
  <div class="wrapperPage">
    <v-app-bar app color="#fb2784">
      <Navbar
        :loggedUser="loggedUser"
        :loggedUsername="loggedUsername"
        v-show="show"
        @logout="logout()"
      />
    </v-app-bar>
    <Drawer
      class="suspendMenu"
      @show="
        (receives) => {
          show = receives;
        }
      "
    />
    <v-container v-if="show == 'categoryShow'">
      <v-container fluid class="banner">
        <v-row justify="center" align="center">
          <v-text-field
            class="text-input"
            v-model="category.name"
            label="Digite e clique em + para adicionar uma nova categoria"
          ></v-text-field>
          <v-btn @click.stop="dialog = true" :color="category.color.hex">
            cor
          </v-btn>

          <v-dialog v-model="dialog" max-width="320">
            <v-color-picker
              class="ma-2"
              hide-inputs
              v-model="category.color"
            ></v-color-picker>
          </v-dialog>

          <v-btn
            class="mx-2 float"
            fab
            dark
            color="pink"
            @click="addProject(category)"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-row>
      </v-container>
      <v-card>
        <v-list class="list">
          <v-list-item
            class="catContainer"
            v-for="(cat, index) in categories"
            :key="index"
          >
            <i class="gg-zeit gg" :style="{ color: cat.color.hex }"></i>
            <v-list-item-content>
              <v-list-item-title
                >{{ cat.name
                }}<i @click="delProject(cat.id)" class="gg-trash gg"></i
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>

    <v-container v-if="show == 'userShow'">
      <v-container fluid class="banner">
        <v-row>
          <v-text-field
            v-model="user.name"
            label="Digite e clique em + para adicionar um novo usuário"
          ></v-text-field>
          <v-btn
            class="mx-2 float"
            fab
            dark
            color="pink"
            @click="pushUsers(user)"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-row>
      </v-container>
      <v-card>
        <v-list class="list">
          <v-list-item
            class="catContainer"
            v-for="(user, index) in users"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title
                >{{ user.name
                }}<i @click="deleteUser(user.id)" class="gg-trash gg"></i
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import callApi from "@/callApi";
import Drawer from "@/components/Drawer.vue";
import projectsApi from "@/api/projectsApi";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "ManageView",
  methods: {
    getProjects() {
      projectsApi.getProjects((respostaApi) => {
        for (var c of respostaApi) {
          this.categories.push(c);
        }
      });
    },
    addProject(cat) {
      projectsApi.addProject(cat);
      this.reload();
    },
    delProject(id) {
      projectsApi.delProject(id);
      this.reload();
    },
    getUsers() {
      callApi.getUsers((respostaApi) => {
        for (var u of respostaApi) {
          this.users.push(u);
        }
      });
    },
    pushUsers(cat) {
      callApi.pushUsers(cat);
      this.reload();
    },
    deleteUser(id) {
      callApi.deleteUser(id);
      this.reload();
    },
    reload() {
      this.$router.go();
    },
    carregaLoggedser() {
      let usertInfo = JSON.parse(
        window.localStorage.getItem("loggedUserInfos")
      );
      this.loggedUser = window.localStorage.getItem("loggedUser");
      this.loggedUsername =
        usertInfo.username.charAt(0).toUpperCase() +
        usertInfo.username.slice(1);
    },
  },
  data() {
    return {
      categories: [],
      users: [],
      category: {
        name: null,
        color: { hex: "#FFFFFF" },
      },
      user: {
        name: null,
      },
      show: "categoryShow",
      loggedUser: "",
      loggedUsername: "",
      types: ["hex", "hexa", "rgba", "hsla", "hsva"],
      type: "hex",
      hex: "#FF00FF",
      hexa: "#FF00FFFF",
      rgba: { r: 255, g: 0, b: 255, a: 1 },
      hsla: { h: 300, s: 1, l: 0.5, a: 1 },
      hsva: { h: 300, s: 1, v: 1, a: 1 },
      dialog: false,
    };
  },
  created() {
    this.getProjects();
    this.carregaLoggedser();
  },
  computed: {
    color: {
      get() {
        return this[this.type];
      },
      set(v) {
        this[this.type] = v;
      },
    },
    showColor() {
      if (typeof this.color === "string") return this.color;

      return JSON.stringify(
        Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2));
          return color;
        }, {}),
        null,
        2
      );
    },
  },
  components: { Drawer, Navbar },
};
</script>
<style>
.float {
  float: right;
}
.gg {
  width: 9px;
  height: 10px;
  float: right;
  margin-right: 10px;
  cursor: pointer;
}
.banner {
  margin: 20px auto;
}

.suspendMenu {
  position: relative;
}
.text-input {
  margin-right: 20px;
}
@media (max-width: 600px) {
  .wrapperPage,
  .wrapper {
    max-width: 100vw;
    margin: 0;
  }
}
</style>
