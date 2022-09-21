const data = require("../data");

module.exports = {
  find: (req, res) => {
    const { id } = req.params;
    if (id != undefined) {
      const project = data.projects.find((t) => t.id == id);
      if (!project) {
        res.status(404).end();
        return;
      }
      res.send(project);
      return;
    }
    res.send(data.projects);
  },
  add: (req, res) => {
    const { name, color } = req.body;
    const id =
      data.projects[data.projects.length - 1] === undefined
        ? 1
        : data.projects[data.projects.length - 1]?.id + 1;
    const newProject = {
      id,
      name,
      color,
    };
    data.projects.push(newProject);
    res.send(newProject);
  },
  remove: (req, res) => {
    const { id } = req.params;
    const projects = data.projects.find((t) => t.id == id);
    const index = data.projects.indexOf(projects);
    data.projects.splice(index, 1);
    res.send(projects);
  },
};
