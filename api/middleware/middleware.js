const Actions = require("../actions/actions-model.js")
const Projects = require("../actions/actions-model.js")

const validateActionId = (req, res, next) => {
  const { id } = req.params;
  Actions.get(id)
    .then(action => {
      if (!action) {
        res.status(400).json({ message: "No action with the requested id was found." })
      } else {
        req.action = action
        next()
    }
    })
    .catch(error => {
    res.status(500).json({message: "Server error"})
  })
}

async function validateProjectId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then(project => {
      if (!project) {
        res.status(400).json({ message: "No project with the requested id was found." })
      } else {
        req.project = project
        next()
    }
    })
    .catch(error => {
    res.status(500).json({message: "Server error"})
  })
}

module.exports = {
  validateActionId,
  validateProjectId
}