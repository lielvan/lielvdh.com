const express = require('express');
const router = express.Router();
const Book = require('../../models/book');
const middleware = require('../../middleware');

// INDEX - Get all books
router.get('/', async (req, res) => {
  const books = await Book.find({});
  res.status(200).send(books);
});

// CREATE - Add a book
router.post('/', async (req, res) => {
  const newBook = {
    title: req.body.title,    
    author: req.body.author,
    description: req.body.description,
    image: req.body.image,
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
});

// EDIT - send book to edit form
router.get('/:id/edit', (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    if(err) {
      console.log(err);
    }
    console.log(`Found Book: ${foundBook}`);
    res.send(foundBook);
  })
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
  await Book.findByIdAndUpdate({ _id: req.params.id }, book, {new: true}, (err, updatedBook) => {
    if(err) {
      console.log(err);
    }
    else {
      console.log(`Updated Book: ${updatedBook}`);
      res.status(200).send(updatedBook);
    }
  })
});


// DESTROY - Delete a book
router.delete('/:id', middleware.isLoggedIn, async (req, res) => {
  await Book.findOneAndDelete({ _id: req.params.id }, (err, bookDeleted) => {
    if(err) {
      console.log(err);
    } else {
      console.log(bookDeleted);
      res.status(200).send();
    }
  })
});


module.exports = router;