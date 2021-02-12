const Actions = require("../actions/actions-model.js")

async function checkActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id)
    if (action)  {
    req.action = action
    next()
    } else {   
      res.status(400).json({ message: `No action with searched ${req.params.id}` })
    } 
  } catch (error) {
    res.status(500).json(`Server not available to checkActionID, ${error}.`)
  }
}

module.exports = {
  checkActionId,
}