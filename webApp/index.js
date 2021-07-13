const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const port = 8000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});

app.get('/', (req, res) => res.send('My first REST API!'));
