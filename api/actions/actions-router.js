// Write your "actions" router here!
const express = require("express");

const Actions = require('./actions-model');
const { checkActionId } = require("../middleware/middleware.js")

const route = express.Router();


// - [ ] Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_: GET, GETID, POST, PUT, DELETE

route.get('/', async (__, res, next) => {
  try {
    const action = await Actions.get()
    //the query was already ran
      res.status(200).json(action)
      console.log(action)
  }
  catch (error) {
  next(error)
  }
})

route.get("/:id", (req, res) => {
  const idVar = req.params.id
  Actions.get(idVar)
    .then(action => {
     res.status(200).json(action)   
    })
    .catch(error => {
      res.status(500).json({message: "Error, action not found."})
    }) 
})

route.post("/", (req, res) => {
  Actions.insert(req.body)
    .then(resActions => {
    res.status(201).json(resActions)
    })
    .catch(error => {
    res.status(500).json({message: "Error adding the action."})
  })
})

route.put("/:id", (req, res) => {
  const idVar = req.params.id
  const changes = req.body
  Actions.update(idVar, changes)
    .then(resAction => {
    res.status(200).json(resAction)
    })
    .catch(error => {
    res.status(500).json({message: "Error updating the actions"})
  })
})

route.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      res.status(200).json( {message:`The action on ${req.params.id} has been removed`})
    })
    .catch(error => {
      res.status(500).json({message: "Error deleting the action."})
    })
})
module.exports = route;