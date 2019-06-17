const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Chapters
router.get('/', async (req, res) => {
  const chapters = await loadChaptersCollection();
  res.send(await chapters.find({}).toArray());
});

// Add Chapter
router.post('/', async (req, res) => {
  const chapters = await loadChaptersCollection();
  await chapters.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Chapter
router.delete('/:id', async (req, res) => {
  const chapters = await loadChaptersCollection();
  await chapters.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});


async function loadChaptersCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://lvdh:lvdH1856@lielvdh-cluster-8naqb.mongodb.net/lielvdh?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

  return client.db('lielvdh').collection('chapters');
}

module.exports = router;