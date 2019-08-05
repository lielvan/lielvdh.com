const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const middleware = require('../../middleware');

// INDEX - Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find({});
  res.status(200).send(projects);
});

// CREATE - Add a project
router.post('/', async (req, res) => {
  const newProject = {
    title: req.body.title,    
    github_link: req.body.github_link,
    text: req.body.text,
    language: req.body.language,
    code_image: req.body.code_image,
    gif_image: req.body.gif_image,
    createdAt: new Date()
  }
  await Project.create(newProject, (err, project) => {
    if(err) {
      console.log(err);
    } else {
      console.log(`Project Created: ${project}`);
      res.status(201).send(project);
    }
  })
});

// EDIT - send project to edit form
router.get('/:id/edit', (req, res) => {
  Project.findById(req.params.id, (err, foundProject) => {
    if(err) {
      console.log(err);
    }
    console.log(`Found Project: ${foundProject}`);
    res.send(foundProject);
  })
});

// UDPATE - Update project
router.put('/:id', middleware.isLoggedIn, async (req, res) => {
  const book = {
    title: req.body.title,
    github_link: req.body.github_link,
    text: req.body.text,
    language: req.body.language,
    code_image: req.body.code_image,
    gif_image: req.body.gif_image,
  }
  await Project.findByIdAndUpdate({ _id: req.params.id }, book, {new: true}, (err, updatedProject) => {
    if(err) {
      console.log(err);
    }
    else {
      console.log(`Updated Project: ${updatedProject}`);
      res.status(200).send(updatedProject);
    }
  })
});


// DESTROY - Delete a project
router.delete('/:id', middleware.isLoggedIn, async (req, res) => {
  await Project.findOneAndDelete({ _id: req.params.id }, (err, deletedProject) => {
    if(err) {
      console.log(err);
    } else {
      console.log(deletedProject);
      res.status(200).send();
    }
  })
});


module.exports = router;