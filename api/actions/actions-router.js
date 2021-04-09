// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')
const {checkActionId, checkAction} = require('../../middleware/middleware')

const router = express.Router()

router.get('/', (req, res) => {
   Actions.get()
   .then((actions) => {
       res.status(200).json(actions);
   })
   .catch(error => {
       console.log(error);
       res.status(500).json({
           message: 'Error retrieving actions'
       });
   });
})

router.get('/:id', checkActionId, (req, res, next) => {
    Actions.get(req.params.id)
    .then((action) => {
        res.status(200).json(action);
    })
    .catch(next)
})

router.post('/', checkAction, (req, res, next) => {
    Actions.insert(req.body)
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch(next);
})

router.put('/:id', checkAction, checkActionId, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then((action) => {
        res.status(200).json(action);
    })
    .catch(next)
});

router.delete('/:id', checkActionId, (req, res ) => {
    Actions.remove( req.params.id )
        .then( () => {
            res.status(200).json({
                message: 'Action Deleted.'
            })
        })
        .catch( () => {
            res.status(500).json({
                message: 'Failed to delete action'
            })
        })
})

module.exports = router