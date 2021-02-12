const express = require("express");
const helmet = require("helmet");

const actionsRouter = require("./actions/actions-router.js");
// const projectsRouter = require("./projects/projects-router.js");

// Complete your server here!
const server = express();

server.use(express.json());
server.use(helmet())

server.use("/api/actions", actionsRouter)
// server.use("/api/projects", projectsRouter)

// server.use((req, res, next) => {
//   console.log("checking next, welcome to the app!")
//   next()
//   //this works
// })

// server.get('/', (req, res) => {
//   const workingInsert = (req.name) ? `${req.name}` : ""
//   res.send(`We're Reciving Information, Welcome${workingInsert}!`)
//   //this works
// })



module.exports = server;

// Do NOT `server.listen()` inside this file!
