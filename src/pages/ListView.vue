<template>
  <div class="wrapper">
    <v-app-bar app color="#fb2784">
      <Navbar
        :loggedUser="loggedUser"
        :loggedUsername="loggedUsername"
        v-show="show"
        @logout="logout()"
      />
    </v-app-bar>
    <div class="wrapperPage">
      <v-btn
        class="mx-2 btn-floating"
        fab
        dark
        color="pink"
        @click="
          editIsEnabled = true;
          listIsEnabled = false;
        "
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>

      <div>
        <v-text-field
          v-show="!editIsEnabled"
          v-model="input"
          label="Buscar"
          height="40"
        ></v-text-field>
      </div>
      <formTask
        v-show="editIsEnabled"
        :key="componentKey"
        :task="task"
        :projects="projects"
        :statuses="statuses"
        :editingTask="editingTask"
        @to-index="
          editIsEnabled = false;
          editingTask = false;
          listIsEnabled = true;
        "
        @salva-task="
          (task) => {
            postTasks(task);
          }
        "
        @atualiza-task="
          (mytask) => {
            updateTasks(mytask);
          }
        "
      />
      <div
        v-for="(tarefa, index) in inputSearch"
        :key="index"
        v-show="listIsEnabled"
      >
        <cardTask
          :tarefa="tarefa"
          :task="task"
          @deleta-task="
            (id) => {
              removeTasks(id);
              getTasks();
            }
          "
          @edita-task="
            (receives) => {
              task = receives;
              editingTask = true;
              editIsEnabled = true;
              listIsEnabled = false;
              forceRenderer();
            }
          "
        />
      </div>
    </div>
    <Calendar v-show="show" class="calendar" />
  </div>
</template>

<script>
import formTask from "../components/Form.vue";
import cardTask from "../components/Card.vue";
import TaskApi from "@/api/taskApi";
import ProjectsApi from "@/api/projectsApi";
import Calendar from "@/components/Calendar.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "ListView",

  components: {
    formTask,
    cardTask,
    Calendar,
    Navbar,
  },
  data() {
    return {
      show: true,
      editIsEnabled: false,
      listIsEnabled: true,
      editingTask: false,
      tasks: [],
      task: {
        id: "",
        title: "",
        date: "",
        project: "",
        status: "",
      },
      projects: [],
      componentKey: null,
      input: "",
      statuses: ["done", "pending", "working"],
      loggedUser: "",
      loggedUsername: "",
    };
  },
  methods: {
    carregaLoggedser() {
      let usertInfo = JSON.parse(
        window.localStorage.getItem("loggedUserInfos")
      );
      this.loggedUser = window.localStorage.getItem("loggedUser");
      this.loggedUsername =
        usertInfo.username.charAt(0).toUpperCase() +
        usertInfo.username.slice(1);
    },
    getTasks() {
      TaskApi.getTasks((respostaApi) => {
        this.tasks = respostaApi;
      });
    },
    getProjects() {
      ProjectsApi.getProjects((response) => {
        for (let each of response) {
          this.projects.push(each.name);
        }
      });
    },
    postTasks(task) {
      TaskApi.postTasks(task);
      this.reload();
    },
    removeTasks(id) {
      TaskApi.removeTask(id);
      this.reload();
    },
    updateTasks(mytask) {
      TaskApi.updateTasks(mytask);
      this.$router.push({ name: "tasks" });
    },
    editTasks() {
      TaskApi.editTasks((respostaApi) => {
        this.task = respostaApi;
      });
      this.reload();
    },
    forceRenderer() {
      this.componentKey += 1;
    },
    reload() {
      window.location.href = "/";
    },
    exhibs() {
      console.log("base=== exibe se foi chamado");
      if (
        this.$route.name == "login" ||
        this.$route.name == "taskSummary" ||
        this.$route.name == "register"
      ) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
  },
  created() {
    this.getTasks();
    this.getProjects();
    this.carregaLoggedser();
  },
  computed: {
    inputSearch() {
      return this.tasks.filter((elem) =>
        elem.title.toLowerCase().includes(this.input.toLowerCase())
      );
    },
  },
};
</script>

<style>
.wrapperPage {
  max-width: 50vw;
  margin-left: 20%;
}

.btn-floating {
  position: fixed;
  left: 2%;
  top: 15%;
}
@media (max-width: 600px) {
  .calendar {
    display: none;
  }
  .wrapperPage,
  .wrapper {
    max-width: 100vw;
  }
}
</style>
