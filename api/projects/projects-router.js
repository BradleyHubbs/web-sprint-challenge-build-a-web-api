// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const {checkProjectId, checkProject} = require('../../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
    .then((projects) => {
        res.status(200).json(projects);
    })
    .catch( () => {
        res.status(500).json({
            message:"Could not retrieve projects"
        })
    });
})

router.get("/:id", checkProjectId, (req, res, next) => {
    Projects.get(req.params.id)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch(next);
  });
  

router.post('/', checkProject, (req, res) => {
    Projects.insert(req.body)
    .then(() => {
        res.status(201).json(req.body);
    })
    
    .catch( () => {
        res.status(500).json({
            message: 'Failed to add project'
        })
    });
});

router.put('/:id', checkProjectId, checkProject, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then( project => {
        res.status(200).json(project)
    })
    .catch( err => {
        res.status(500).json(err);
    })
})

router.delete('/:id', checkProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then( ()=>{
        res.status(201).json({
            message: 'Project Deleted'
        })
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id/actions', checkProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then((actions) => {
        res.status(200).json(actions);
    })
    .catch( () => {
        res.status(500).json({
            message: 'Failed to get project actions'
        })
    })
})


module.exports = router;