const Actions = require('../api/actions/actions-model');
const Projects = require('../api/projects/projects-model');


async function checkActionId(req, res, next){
    try{
        const action = await Actions.get(req.params.id);
        if(!action){
            res.status(404).json({
                message: "Action not found."
            });
        } else{
            req.action = action;
            next();
        }
    } catch(err) {
        next(err);
    }
}

 async function checkAction(req, res, next) {
    const project = await Actions.get(req.body.project_id);
    if (!project) {
      res.status(400).json({
        message: "project with that ID doesn't exist",
      });
    } else {
      if (!req.body) {
        res.status(400).json({
          message: "missing action data",
        });
      } else if (
        !req.body.project_id ||!req.body.description ||!req.body.notes
      ) {
        res.status(400).json({
          message:
            "Project_id, description, notes, and completed are required fields",
        });
      } else {
        next();
      }
    }
  }

  async function checkProjectId(req, res, next){
    try {
        const id = await Projects.get(req.params.id);
        if (!id) {
          res.status(404).json({
            message: "Project not found.",
          });
        } else {
          req.id = id;
          next();
        }
      } catch (err) {
        next(err);
      }
    }

    function checkProject(req, res, next) {
     if ( !req.body.name || ! req.body.description ) {
        res.status(400).json({
            message: "Name and description are required"
        })
    } else {
        next();
    }
}

module.exports = {
    checkActionId,
    checkAction,
    checkProjectId,
    checkProject
}