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
      res.status(201).send();
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