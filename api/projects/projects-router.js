// Write your "projects" router here!
const express = require("express");

const Projects = require('./projects-model');

const route = express.Router();

// - [ ] Inside `api/projects/projects-router.js` build endpoints for performing CRUD operations on _projects_: GET, GETID, POST, PUT, DELETE


route.get('/', async (__, res) => {
  try {
    const project = await Projects.get()
    .then(projects => {
    res.status(200).json(projects)
  })
    .catch(error => {
      res.status(500).json({message: "Error retriving the projects requested."})
  })
})

// - [ ] Inside `api/projects/projects-router.js` add an endpoint for retrieving the list of actions for a project: GETprojectactions

module.exports = route;