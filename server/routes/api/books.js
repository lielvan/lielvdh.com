const express = require('express');
const router = express.Router();
const Book = require('../../models/book');
const middleware = require('../../middleware');
const aws = require('aws-sdk');

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
router.post('/', middleware.isLoggedIn, async (req, res) => {
  const newBook = {
    title: req.body.title,    
    author: req.body.author,
    description: req.body.description,
    image: req.body.image,
    isbn: req.body.isbn,
    createdAt: new Date()
  }
  try {
    await Book.create(newBook, (err, book) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`Book Created: ${book}`);
        res.status(201).send(book);
      }
    })
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
router.put('/:id', middleware.isLoggedIn, async (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    image: req.body.image,
    isbn: req.body.isbn,
  }
  try {
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
  const s3 = new aws.S3();
  try {
    await Book.findOneAndDelete({ _id: req.params.id }, (err, bookDeleted) => {
      if(err || bookDeleted === null) console.log(err);
      else {
        let params = {
          Bucket: process.env.S3_BUCKET,
          Key: `books/${bookDeleted.image}`,
        }
        s3.deleteObject(params, (err, data) => {
          if(err) console.log(err, err.stack);
          else console.log(`Book image ${bookDeleted.image} deleted from AWS S3 - ${data.DeleteMarker}`);
        });
        console.log(`Deleted Book: ${bookDeleted}`);
        res.status(200).send();
      }
    });
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
});


module.exports = router;