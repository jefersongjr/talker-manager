const express = require('express');
const { getAllTalkers } = require('../utils/readAndWriteFiles');

const routeTalker = express.Router();

routeTalker.get('/talker', async (request, response) => {
    const talker = await getAllTalkers();
     return response.status(200).json(talker);
  });

  module.exports = routeTalker;