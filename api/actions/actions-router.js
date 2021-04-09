const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();

//Get
router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})
//get /:id
router.get('/:id', (req, res, next) => {
    const {id} = req.params
    Actions.get(id)
        .then(actions => {
            if(!actions){
                res.status(404).json({message: "action not found"})
            } else {
                res.json(actions)
            }
        })
        .catch(next)
})
//post
router.post('/', (req, res, next) => {
    const newAction = req.body
    if(!newAction.description || !newAction.notes){
        res.status(400).json({message: "Please provide description and notes"})
    } else {
        Actions.insert(newAction)
            .then(actions => {
                res.status(201).json(actions)
            })
            .catch(next)
    }
})

//put /:id
router.put('/:id', async (req, res, next) => {
    const {id} = req.params
    const changes = req.body
    try{
        if(!changes.description || !changes.notes){
            res.status(400).json({message: 'Please provide description and notes'})
        } else {
            const updateAction = await Actions.update(id, changes)
            if(!updateAction){
                res.status(404).json({message: "Action with this ID does not exist"})
            } else {
                res.json(updateAction)
            }
        }
    }
    catch(err){
        next(err)
    }
})

//delete /:id
router.delete('/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        const deleteAction = await Actions.remove(id)
        if(!deleteAction){
            res.status(404).json({message: "Action with specified ID does not exist"})
        } else {
            res.json(deleteAction)
        }
    }
    catch(err){
        next(err)
    }
})

router.use((err, req, res, next)=>{ //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: 'something tragic happened',
      message: err.message, 
      stack: err.stack,
    })
  })

module.exports = router;