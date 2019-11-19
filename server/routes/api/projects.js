const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../../models/project');
const middleware = require('../../middleware');
const fs = require('fs');

// File upload setup
const storage = multer.diskStorage({
  destination: './server/public/images/projects',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// INDEX - Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find({});
  res.status(200).send(projects);
});

// CREATE - Add a project
router.post('/', middleware.isLoggedIn, upload.fields([{ name: 'code_image', maxCount: 1 }, { name: 'gif_image', maxCount: 1 }]), async (req, res) => {
  if(req.files === undefined) {
    console.log('No files found');
    res.send('No files found');
  } else {
    const newProject = {
      title: req.body.title,    
      github_link: req.body.github_link,
      text: req.body.text,
      language: req.body.language,
      createdAt: new Date()
    }
    if(req.files['code_image']) newProject.code_image = req.files['code_image'][0].originalname;
    if(req.files['gif_image']) newProject.gif_image = req.files['gif_image'][0].originalname;
    await Project.create(newProject, (err, project) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`Project Created: ${project}`);
        res.status(201).send(project);
      }
    })
  }
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
router.put('/:id', middleware.isLoggedIn, upload.fields([{ name: 'code_image', maxCount: 1 }, { name: 'gif_image', maxCount: 1 }]), async (req, res) => {
  if(req.files === undefined) {
    console.log('No files found');
    res.send('No files found');
  } else {
    const project = {
      title: req.body.title,
      github_link: req.body.github_link,
      text: req.body.text,
      language: req.body.language,
    }
    if(req.files['code_image']) project.code_image = req.files['code_image'][0].originalname;
    if(req.files['gif_image']) project.gif_image = req.files['gif_image'][0].originalname;
    await Project.findByIdAndUpdate({ _id: req.params.id }, project, {new: true}, (err, updatedProject) => {
      if(err) {
        console.log(err);
      }
      else {
        console.log(`Updated Project: ${updatedProject}`);
        res.status(200).send(updatedProject);
      }
    })
  }
});

// DESTROY - Delete a project
router.delete('/:id', middleware.isLoggedIn, async (req, res) => {
  try {
    await Project.findOneAndDelete({ _id: req.params.id }, (err, deletedProject) => {
      if(err || deletedProject === null) throw { error: err, message: 'Error has occurred', project: deletedProject };
      else {
        fs.unlink(`./server/public/images/projects/${deletedProject.code_image}`, (err) => {
          if(err) throw err;
          console.log(`${deletedProject.code_image} was deleted`);
        });
        fs.unlink(`./server/public/images/projects/${deletedProject.gif_image}`, (err) => {
          if(err) throw err;
          console.log(`${deletedProject.gif_image} was deleted`);
        });
        console.log(deletedProject);
        res.status(200).send();
      }
    });
  } catch(err) {
    console.error(err);
  }
});


module.exports = router;