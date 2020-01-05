const express = require('express');
const router = express.Router();
const Chapter = require('../../models/chapter');
const middleware = require('../../middleware');
const aws = require('aws-sdk');

// INDEX - Get all chapters
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.find({});
    res.status(200).send(chapters);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  
});

// CREATE - Add a chapter
router.post('/', middleware.isLoggedIn, async (req, res) => {
  const newChapter = {
    title: req.body.title,
    title_link: req.body.title_link,
    subtitle: req.body.subtitle,
    text: req.body.text,
    image: req.body.image,
    location: req.body.location,
    time_frame: req.body.time_frame,
    createdAt: new Date()
  }
  try {
    await Chapter.create(newChapter, (err, chapter) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`Chapter Created: ${chapter}`);
        res.status(201).send(chapter);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// EDIT - send chapter to edit form
router.get('/:id/edit', (req, res) => {
  try {
    Chapter.findById(req.params.id, (err, foundChapter) => {
      if(err) {
        console.log(err);
      }
      console.log(`Found Chapter: ${foundChapter}`);
      res.send(foundChapter);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  
});

// UDPATE - Update chapter
router.put('/:id', middleware.isLoggedIn, async (req, res) => {
  const chapter = {
    title: req.body.title,
    title_link: req.body.title_link,
    subtitle: req.body.subtitle,
    text: req.body.text,
    image: req.body.image,
    location: req.body.location,
    time_frame: req.body.time_frame,
  }
  try {
    await Chapter.findByIdAndUpdate({ _id: req.params.id }, chapter, {new: true}, (err, updatedChapter) => {
      if(err) {
        console.log(err);
      }
      else {
        console.log(`Updated Chapter: ${updatedChapter}`);
        res.status(200).send(updatedChapter);
      }
    });
  } catch (err) {
   console.log(err);
   res.status(500).send(err); 
  }
});

// DESTROY - Delete a chapter
router.delete('/:id', middleware.isLoggedIn, async (req, res) => {
  const s3 = new aws.S3();
  try {
    await Chapter.findOneAndDelete({ _id: req.params.id }, (err, chapterDeleted) => {
      if(err || chapterDeleted === null) console.log(err);
      else {
        let params = {
          Bucket: process.env.S3_BUCKET,
          Key: `chapters/${chapterDeleted.image}`,
        }
        s3.deleteObject(params, (err, data) => {
          if(err) console.log(err, err.stack);
          else console.log(`Chapter image ${chapterDeleted.image} deleted from AWS S3 - ${data.DeleteMarker}`);
        });
        console.log(chapterDeleted);
        res.status(200).send();
      }
    })
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
});


module.exports = router;