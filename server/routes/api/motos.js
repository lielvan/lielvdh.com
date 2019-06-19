const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Motos
router.get('/', async (req, res) => {
  const motos = await loadMotosCollection();
  res.send(await motos.find({}).toArray());
});

// Add Moto
router.post('/', async (req, res) => {
  const motos = await loadMotosCollection();
  await motos.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Moto
router.delete('/:id', async (req, res) => {
  const motos = await loadMotosCollection();
  await motos.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});


async function loadMotosCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://lvdh:lvdH1856@lielvdh-cluster-8naqb.mongodb.net/lielvdh?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

  return client.db('lielvdh').collection('motos');
}

module.exports = router;