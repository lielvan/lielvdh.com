const express = require('express');
const router = express.Router();
const multer = require('multer');
const Chapter = require('../../models/chapter');
const middleware = require('../../middleware');
const fs = require('fs');

// File upload setup
const storage = multer.diskStorage({
  destination: './server/public/images/chapters',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// INDEX - Get all chapters
router.get('/', async (req, res) => {
  const chapters = await Chapter.find({});
  res.status(200).send(chapters);
});

// CREATE - Add a chapter
router.post('/', middleware.isLoggedIn, upload.single('image'), async (req, res) => {
  if(req.file === undefined) {
    console.log(req.file);
    console.log(`No file selected.`);
  } else {
    const newChapter = {
      title: req.body.title,
      title_link: req.body.title_link,
      subtitle: req.body.subtitle,
      text: req.body.text,
      image: req.file.originalname,
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
  }
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
router.put('/:id', middleware.isLoggedIn, upload.single('image'), async (req, res) => {
  if(req.file === undefined) {
    console.log(req.file);
    console.log(`No file selected.`);
  } else {
    const chapter = {
      title: req.body.title,
      title_link: req.body.title_link,
      subtitle: req.body.subtitle,
      text: req.body.text,
      image: req.file.originalname,
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
  }
});

// DESTROY - Delete a chapter
router.delete('/:id', middleware.isLoggedIn, async (req, res) => {
  try {
    await Chapter.findOneAndDelete({ _id: req.params.id }, (err, chapterDeleted) => {
      if(err || chapterDeleted === null) throw { error: err, message: 'Error has occurred', chapter: chapterDeleted };
      else {
        fs.unlink(`./server/public/images/chapters/${chapterDeleted.image}`, (err) => {
          if(err) throw err;
          console.log(`${chapterDeleted.image} was deleted`);
        });
        console.log(chapterDeleted);
        res.status(200).send();
      }
    })
  } catch(err) {
    console.error(err);
  }
});


module.exports = router;