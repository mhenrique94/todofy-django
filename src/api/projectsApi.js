import api from "@/api/index";

export default {
  getProjects: (callback) => {
    api
      .get("api/projects")
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  },
  addProject: (project) => {
    api.post("api/projects", project);
  },
  delProject(callback, id) {
    api.delete(`api/projects/${id}`).then(() => callback());
  },
};
