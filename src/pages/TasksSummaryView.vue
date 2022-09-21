<template>
  <v-main class="overflow-hidden mt-4">
    <v-app-bar app color="#fb2784">
      <Navbar
        :loggedUser="loggedUser"
        :loggedUsername="loggedUsername"
        v-show="show"
        @logout="logout()"
      />
    </v-app-bar>
    <v-container margin="auto">
      <h2>Resumo das tarefas</h2>
      <v-container class="taskContainer">
        <div v-for="item in data" :key="item.group">
          <h3>
            {{ item.group }} <v-chip class="ma-2"> {{ item.tasks }} </v-chip>
          </h3>
          <v-card class="summaryCard" elevation="0">
            <v-progress-circular
              :rotate="360"
              :size="100"
              :width="15"
              :value="item.percent"
              color="pink"
            >
            </v-progress-circular>
            <p>
              Done:{{ summary[item.group].done }} <br />
              Working:{{ summary[item.group].working }}<br />
              Pending:{{ summary[item.group].pending }}
            </p>
          </v-card>
        </div>
      </v-container>
      <div class="my-4">
        <v-btn rounded color="primary" dark :to="{ name: 'tasks' }">
          Ver todas tarefas
        </v-btn>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import TasksApi from "@/api/taskApi.js";
import Navbar from "@/components/Navbar.vue";

export default {
  components: { Navbar },
  data: () => {
    return {
      summary: {},
      data: [],
      show: true,
      loggedUser: "",
      loggedUsername: "",
    };
  },
  methods: {
    getSummary() {
      TasksApi.summary().then((data) => {
        this.summary = data;
        for (const [key, value] of Object.entries(data)) {
          const totalTasks = value.pending + value.working + value.done;
          let obj = {
            group: key,
            tasks: totalTasks,
            percent: 100 - (value.pending / totalTasks) * 100,
          };
          this.data.push(obj);
        }
      });
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
    logout() {
      window.localStorage.clear;
      this.$router.push({ name: "login" });
    },
  },
  created() {
    console.log("carregando 1");
    this.getSummary();
    this.carregaLoggedser();
  },
};
</script>

<style scoped>
.summaryCard {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: flex-start;
}
.taskContainer {
  display: flex;
  gap: 100px;
  max-width: 100%;
}
</style>
