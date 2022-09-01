const express = require('express');
const { getAllTalkers, getTalkerById } = require('../utils/readAndWriteFiles');

const routeTalker = express.Router();

routeTalker.get('/talker', async (request, response) => {
    const talker = await getAllTalkers();
     return response.status(200).json(talker);
  });

routeTalker.get('/talker/:id', async (request, response) => {
    const { id } = request.params;
    const talker = await getTalkerById(Number(id));
    if (!talker) {
        return response.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
     response.status(200).json(talker);
    });

module.exports = routeTalker;