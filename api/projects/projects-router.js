const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();

//get
router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})
//get /:id
router.get('/:id', (req, res, next) => {
    const {id} = req.params
    Projects.get(id)
        .then(projects => {
            if(!projects){
                res.status(404).json({message: "project with this ID does not exist"})
            } else {
                res.json(projects)
            }
        })
        .catch(next)

})
//post
router.post('/', (req, res, next) => {
    const newPost = req.body
    if(!newPost.name || !newPost.description){
        res.status(400).json({message: "Please provide name and description"})
    } else{
        Projects.insert(newPost)
            .then(projects => {
                res.status(201).json(projects)
            })
            .catch(next)
    }
})
//put /:id
router.put('/:id', async (req, res, next) => {
    const {id} = req.params
    const changes = req.body
    
    try{
        if(!changes.description || !changes.name){
            res.status(400).json({message: "Please provide description and name"})
        } else {
            const updatedProject = await Projects.update(id, changes)
            if(!updatedProject){
                res.status(404).json({message: "The project with specified ID does not exist"})
            } else {
                res.json(updatedProject)
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
        const deletedProject = await Projects.remove(id)
        if(!deletedProject){
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else {
            res.json(deletedProject)
        }
    }
    catch(err){
        next(err)
    }
})
//[GET] /api/projects/:id/actions
router.get('/:id/actions', async (req, res, next) => {
    try{
        const project = await Projects.get(req.params.id)
        if(!project){
            res.status(404).json({message: "The project with specified ID does not exist"})
        } else {
            const array = await Projects.getProjectActions(req.params.id)
            res.json(array)
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