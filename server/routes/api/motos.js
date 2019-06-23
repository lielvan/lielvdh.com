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
      res.status(201).send();
    }
  });
});

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