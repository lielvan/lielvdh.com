const express = require('express');
const router = express.Router();
const multer = require('multer');
const Book = require('../../models/book');
const middleware = require('../../middleware');
const fs = require('fs');

// File upload setup
const storage = multer.diskStorage({
  destination: './server/public/images/books',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// INDEX - Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send(books);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// CREATE - Add a book
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if(req.file === undefined) {
      console.log(req.file);
      console.log('No file selected.');
      res.send('No file found');
    } else {
      const newBook = {
        title: req.body.title,    
        author: req.body.author,
        description: req.body.description,
        image: req.file.originalname,
        isbn: req.body.isbn,
        createdAt: new Date()
      }
      await Book.create(newBook, (err, book) => {
        if(err) {
          console.log(err);
        } else {
          console.log(`Book Created: ${book}`);
          res.status(201).send(book);
        }
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// EDIT - send book to edit form
router.get('/:id/edit', (req, res) => {
  try {
    Book.findById(req.params.id, (err, foundBook) => {
      if(err) {
        console.log(err);
      }
      console.log(`Found Book: ${foundBook}`);
      res.send(foundBook);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// UDPATE - Update book
router.put('/:id', middleware.isLoggedIn, upload.single('image'), async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      image: req.file == undefined ? req.body.image : req.file.originalname,
      isbn: req.body.isbn,
    }
    await Book.findByIdAndUpdate({ _id: req.params.id }, book, {new: true}, (err, updatedBook) => {
      if(err) {
        console.log(err);
      }
      else {
        console.log(`Updated Book: ${updatedBook}`);
        res.status(200).send(updatedBook);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// DESTROY - Delete a book
router.delete('/:id', middleware.isLoggedIn, async (req, res) => {
  try {
    await Book.findOneAndDelete({ _id: req.params.id }, (err, bookDeleted) => {
      if(err || bookDeleted === null) throw { error: err, message: 'Error has occurred', book: bookDeleted };
      else {
        fs.unlink(`./server/public/images/books/${bookDeleted.image}`, (err) => {
          if(err) throw err;
          console.log(`${bookDeleted.image} was deleted`);
        });
        console.log(bookDeleted);
        res.status(200).send();
      }
    });
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
});


module.exports = router;