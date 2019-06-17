const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const chapters = require('./routes/api/chapters');
app.use('/api/chapters', chapters);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));