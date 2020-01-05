const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const middleware = require('../../middleware');
const aws = require('aws-sdk');

// INDEX - Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find({});
  res.status(200).send(projects);
});

// CREATE - Add a project
router.post('/', middleware.isLoggedIn, async (req, res) => {
  const newProject = {
    title: req.body.title,    
    github_link: req.body.github_link,
    text: req.body.text,
    language: req.body.language,
    code_image: req.body.code_image,
    gif_image: req.body.gif_image,
    createdAt: new Date()
  }
  try {
    await Project.create(newProject, (err, project) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`Project Created: ${project}`);
        res.status(201).send(project);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// EDIT - send project to edit form
router.get('/:id/edit', (req, res) => {
  try {
    Project.findById(req.params.id, (err, foundProject) => {
      if(err) {
        console.log(err);
      }
      console.log(`Found Project: ${foundProject}`);
      res.send(foundProject);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// UDPATE - Update project
router.put('/:id', middleware.isLoggedIn, async (req, res) => {
  const project = {
    title: req.body.title,
    github_link: req.body.github_link,
    text: req.body.text,
    language: req.body.language,
    code_image: req.body.code_image,
    gif_image: req.body.gif_image,
  }
  try {
    await Project.findByIdAndUpdate({ _id: req.params.id }, project, {new: true}, (err, updatedProject) => {
      if(err) {
        console.log(err);
      }
      else {
        console.log(`Updated Project: ${updatedProject}`);
        res.status(200).send(updatedProject);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// DESTROY - Delete a project
router.delete('/:id', middleware.isLoggedIn, async (req, res) => {
  const s3 = new aws.S3();
  try {
    await Project.findOneAndDelete({ _id: req.params.id }, (err, deletedProject) => {
      if(err || deletedProject === null) throw { error: err, message: 'Error has occurred', project: deletedProject };
      else {
        let params = {
          Bucket: process.env.S3_BUCKET,
          Delete: {
            Objects: [
              {
                Key: `chapters/${deletedProject.code_image}`
              },
              {
                Key: `chapters/${deletedProject.gif_image}`
              }
            ]
          }
        }
        s3.deleteObjects(params, (err, data) => {
          if(err) console.log(err, err.stack);
          else console.log(`Projects images ${deletedProject.code_image} & ${deletedProject.gif_image} deleted from AWS S3.`);
        });
        console.log(`Deleted Project: ${deletedProject}`);
        res.status(200).send();
      }
    });
  } catch(err) {
    console.error(err);
  }
});


module.exports = router;