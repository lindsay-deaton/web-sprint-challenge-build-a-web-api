// Write your "projects" router here!
const express = require("express");

const Projects = require('./projects-model');
const { validateProjectId } = require("../middleware/middleware.js")

const route = express.Router();

// - [ ] Inside `api/projects/projects-router.js` build endpoints for performing CRUD operations on _projects_: GET, GETID, POST, PUT, DELETE


route.get('/', async (__, res, next) => {
  try {
    const project = await Projects.get()
    //the query was already ran
      res.status(200).json(project)
      console.log(project)
  }
  catch (error) {
  next(error)
  }
})

route.get("/:id", validateProjectId, (req, res) => {
  console.log(req.params.id)
  const idVar = req.params.id
  Projects.get(idVar)
    .then(project => {
     res.status(200).json(project)   
    })
    .catch(error => {
      res.status(500).json({message: "Error, project not found."})
    }) 
})

route.post("/", (req, res) => {
  Projects.insert(req.body)
    .then(resProjects => {
    res.status(201).json(resProjects)
    })
    .catch(error => {
    res.status(500).json({message: "Error adding the project."})
  })
})

route.put("/:id", validateProjectId, (req, res) => {
  const idVar = req.params.id
  const changes = req.body
  Projects.update(idVar, changes)
    .then(resProject => {
    res.status(200).json(resProject)
    })
    .catch(error => {
    res.status(500).json({message: "Error updating the projects"})
  })
})

route.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      res.status(200).json( {message:`The project on ${req.params.id} has been removed`})
    })
    .catch(error => {
      res.status(500).json({message: "Error deleting the project."})
    })
})

module.exports = route;