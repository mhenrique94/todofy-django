import api from "@/api/index";

export default {
  getTasks: (callback) => {
    api
      .get("/api/tasks")
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        return error;
      });
  },
  removeTask: (taskId) => {
    return new Promise((resolve, reject) => {
      api
        .delete(`/api/tasks/${taskId}`)
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  },
  postTasks: (task) => {
    const data = task;
    const headers = { "Content-Type": "application/json" };
    const dataJson = JSON.stringify(data);
    api.post("/api/tasks", dataJson, {
      headers: headers,
    });
  },
  updateTasks(task) {
    const dataJson = JSON.stringify(task);
    const headers = { "Content-Type": "application/json" };
    api.patch(`/api/tasks/${task.id}`, dataJson, {
      headers: headers,
    });
  },
  editTasks: (callback) => {
    api
      .get(`/api/tasks/${this.task.id}`)
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  },
  summary: () => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/tasks/summary")
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  },
};
