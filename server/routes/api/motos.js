const express = require('express');
const router = express.Router();
const Moto = require('../../models/moto');


// INDEX - Show all motos
router.get('/', async (req, res) => {
  const motos = await Moto.find({});
  res.send(motos);
});

// CREATE - Add new moto
router.post('/', async (req, res) => {
  const newMoto = {
    text: req.body.text,
    createdAt: new Date()
  };
  await Moto.create(newMoto, (err, moto) => {
    if(err) {
      console.log(err);
    } else {
      res.status(201).send(moto);
    }
  });
});

// EDIT - send moto to edit form
router.get('/:id/edit', (req, res) => {
  Moto.findById(req.params.id, (err, foundMoto) => {
    if(err) {
      console.log(err);
    }
    console.log(`Found Moto: ${foundMoto}`);
    res.send(foundMoto);
  })
});

// UDPATE - Update moto
router.put('/:id', async (req, res) => {
  console.log(`Request Body: ${req.body.text}`);
  console.log(`Param ID: ${req.params.id}`);
  const moto = {
    text: req.body.text
  }
  await Moto.findByIdAndUpdate({ _id: req.params.id }, moto, {new: true}, (err, updatedMoto) => {
    if(err) {
      console.log(err);
    }
    else {
      console.log(`Updated Moto: ${updatedMoto}`);
      res.status(200).send(updatedMoto);
    }
  })
})

// DESTROY - Delete a moto
router.delete('/:id', async (req, res) => {
  await Moto.findOneAndDelete({ _id: req.params.id }, (err, motoDeleted) => {
    if(err) {
      console.log(err);
    } else {
      console.log(motoDeleted);
      res.status(200).send();
    }
  })
}); 

module.exports = router;