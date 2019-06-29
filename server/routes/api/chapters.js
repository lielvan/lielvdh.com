const express = require('express');
const router = express.Router();
const Chapter = require('../../models/chapter');

// INDEX - Get all chapters
router.get('/', async (req, res) => {
  const chapters = await Chapter.find({});
  res.send(chapters);
});

// CREATE - Add a chapter
router.post('/', async (req, res) => {
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
  await Chapter.create(newChapter, (err, chapter) => {
    if(err) {
      console.log(err);
    } else {
      console.log(`Chapter Created: ${chapter}`);
      res.status(201).send(chapter);
    }
  })
});

// EDIT - send chapter to edit form
router.get('/:id/edit', (req, res) => {
  Chapter.findById(req.params.id, (err, foundChapter) => {
    if(err) {
      console.log(err);
    }
    console.log(`Found Chapter: ${foundChapter}`);
    res.send(foundChapter);
  })
});

// UDPATE - Update chapter
router.put('/:id', async (req, res) => {
  console.log(`Request Body: ${req.body.title}`);
  console.log(`Param ID: ${req.params.id}`);
  const chapter = {
    title: req.body.title,
    title_link: req.body.title_link,
    subtitle: req.body.subtitle,
    text: req.body.text,
    image: req.body.image,
    location: req.body.location,
    time_frame: req.body.time_frame,
  }
  await Chapter.findByIdAndUpdate({ _id: req.params.id }, chapter, {new: true}, (err, updatedChapter) => {
    if(err) {
      console.log(err);
    }
    else {
      console.log(`Updated Chapter: ${updatedChapter}`);
      res.status(200).send(updatedChapter);
    }
  })
});


// DESTROY - Delete a chapter
router.delete('/:id', async (req, res) => {
  await Chapter.findOneAndDelete({ _id: req.params.id }, (err, chapterDeleted) => {
    if(err) {
      console.log(err);
    } else {
      console.log(chapterDeleted);
      res.status(200).send();
    }
  })
});


module.exports = router;