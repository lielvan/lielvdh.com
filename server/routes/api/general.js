const express  = require('express'),
      router = express.Router(),
      General = require('../../models/general'),
      middleware = require('../../middleware'),
      aws = require('aws-sdk');

// INDEX - Get all general entries
router.get('/', async (req, res) => {
  try {
    const generals = await General.find({});
    res.status(200).send(generals);
  } catch (err) {
    res.status(500).send(err);
  }
});

// CREATE - Add new general entry
router.post('/', middleware.isLoggedIn, async (req, res) => {
  const newGeneral = {
    label: req.body.label,
    is_file: req.body.is_file,
    text: req.body.text,
    createdAt: new Date()
  }
  try {
    await General.create(newGeneral, (err, general) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`General Entry Created: ${general}`);
        res.status(201).send(general);
      }
    });
  } catch(err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Find general entry by label
router.get('/:label', async (req, res) => {
  try {
    General.findOne({ label: req.params.label }, (err, foundGeneral) => {
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log(`General Entry Found By Label - ${req.params.label}: ${foundGeneral}`);
        res.status(200).send(foundGeneral);
      } 
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// EDIT - Get general entry info and send to frontend
router.get('/:id/edit', async (req, res) => {
  try {
    await General.findById(req.params.id, (err, general) => {
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log(`Found General Entry: ${general}`);
        res.status(200).send(general);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// UPDATE - Update general entry
router.put('/:id', middleware.isLoggedIn, async (req, res) => {
  const general = {
    label: req.body.label,
    is_file: req.body.is_file,
    text: req.body.text,
  }
  try {
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
    res.status(500).send(err);
  }
});

// DELETE - Delete a general entry
router.delete('/:id', middleware.isLoggedIn, async (req, res) => {
  const s3 = new aws.S3();
  try {
    await General.findOneAndDelete({ _id: req.params.id }, (err, deletedGeneral) => {
      if(err || deletedGeneral === null) throw { error: err, message: 'Error has occurred', general: deletedGeneral };
      else {
        if(deletedGeneral.is_file) {
          let params = {
            Bucket: process.env.S3_BUCKET,
            Key: `general/${deletedGeneral.text}`,
          }
          s3.deleteObject(params, (err, data) => {
            if(err) console.log(err, err.stack);
            else console.log(`General file ${deletedGeneral.text} deleted from AWS S3.`);
          });
        }
        console.log(`Deleted General Entry: ${deletedGeneral}`);
        res.status(200).send();
      }
    });
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;