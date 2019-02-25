const constants = require('../constants');
const fileMerger = require('./middlewares/file-merger');
const express = require('express');
const app = express();

app.use(fileMerger);

app.get('/', function (req, res) {
    res.json(res.finalObject);
});

app.listen('3000', () => {
    console.log('listening on 3000 port');
}); 