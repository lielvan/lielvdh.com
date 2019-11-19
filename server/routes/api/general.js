const express  = require('express'),
      router = express.Router(),
      General = require('../../models/general');
      middleware = require('../../middleware');
      multer = require('multer');
      fs = require('fs');

// File upload setup
const storage = multer.diskStorage({
  destination: './server/public/doc',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// INDEX - Get all general entries
router.get('/', async (req, res) => {
  const generals = await General.find({});
  return res.status(200).send(generals);
});

// CREATE - Add new general entry
router.post('/', middleware.isLoggedIn, upload.single('file'), async (req, res) => {
  let newGeneral = {
    label: req.body.label,
    is_file: req.body.is_file,
    createdAt: new Date()
  }
  try {
    (req.file === undefined) ? (newGeneral.text = req.body.text) : (newGeneral.text = req.file.originalname);
    await General.create(newGeneral, (err, general) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`General Entry Created: ${general}`);
        return res.status(201).send(general);
      }
    });
  } catch(err) {
    console.log(err);
  }
});

// Find general entry by label
router.get('/:label', async (req, res) => {
  General.findOne({ label: req.params.label }, (err, foundGeneral) => {
    if(err) {
      console.log(err);
    } else {
      console.log(`General Entry Found By Label - ${req.params.label}: ${foundGeneral}`);
      res.status(200).send(foundGeneral);
    } 
  });
});

// EDIT - Get general entry info and send to frontend
router.get('/:id/edit', async (req, res) => {
  await General.findById(req.params.id, (err, general) => {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(`Found General Entry: ${general}`);
      res.status(200).send(general);
    }
  });
});

// UPDATE - Update general entry
router.put('/:id', middleware.isLoggedIn, upload.single('file'), async (req, res) => {
  const general = {
    label: req.body.label,
    is_file: req.body.is_file
  }
  try {
    (req.file === undefined) ? general.text = req.body.text : general.text = req.file.originalname; 
    await General.findByIdAndUpdate({ _id: req.params.id }, general, { new: true }, (err, updatedGeneral) => {
      if(err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(`Updated General Entry: ${updatedGeneral}`);
        res.status(200).send(updatedGeneral);
      }
    });
  }
  catch(err) {
    console.log(err);
  }
});

// DELETE - Delete a general entry
router.delete('/:id', middleware.isLoggedIn, async (req, res) => {
  try {
    await General.findOneAndDelete({ _id: req.params.id }, (err, deletedGeneral) => {
      if(err || deletedGeneral === null) throw { error: err, message: 'Error has occurred', general: deletedGeneral };
      else {
        if(deletedGeneral.is_file) {
          fs.unlink(`./server/public/doc/${deletedGeneral.text}`, (err) => {
            if(err) throw err;
            console.log(`${deletedGeneral.text} was deleted`);
          });
        }
        console.log(`Deleted General Entry: ${deletedGeneral}`);
        res.status(200).send();
      }
    });
  } catch(err) {
    console.error(err);
  }
});

module.exports = router;