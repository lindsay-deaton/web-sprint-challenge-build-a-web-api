const db = require("../../data/dbConfig.js");
const mappers = require('../../data/helpers/mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
  getProjectActions,
};

//  - `[GET] /api/projects` returns an array of projects (or an empty array) as the body of the response.
//   - `[GET] /api/projects/:id` returns a project with the given `id` as the body of the _response_.
function get(id) {
  let query = db("projects as p");
  if (id) {
    query.where("p.id", id).first();
    const promises = [query, getProjectActions(id)]; // [ projects, actions ]
    return Promise.all(promises).then(function(results) {
      let [project, actions] = results;
      if (project) {
        project.actions = actions;
        return mappers.projectToBody(project);
      } else {
        return null;
      }
    });
  } else {
    return query.then(projects => {
      return projects.map(project => mappers.projectToBody(project));
    });
  }
}

  // - `[POST] /api/projects` returns the newly created project as the body of the _response_.
function insert(project) {
  return db("projects")
    .insert(project, "id")
    .then(([id]) => get(id));
}

//  - `[PUT] /api/projects/:id` returns the updated project as the body of the _response_.
function update(id, changes) {
  return db("projects")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

// - `[DELETE] /api/projects/:id` returns no _response_ body.
function remove(id) {
  return db("projects")
    .where("id", id)
    .del();
}

//  - `[GET] /api/projects/:id/actions` sends an array of actions (or an empty array) as the body of the response.
function getProjectActions(projectId) {
  return db("actions")
    .where("project_id", projectId)
    .then(actions => actions.map(action => mappers.actionToBody(action)));
}
