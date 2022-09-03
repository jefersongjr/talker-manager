const express = require('express');
const validateAge = require('../middlewares/validateAge');
const validateName = require('../middlewares/validateName');
const { validateTalkWatchedAt, validateTalkRate } = require('../middlewares/validateTalk');
const validateToken = require('../middlewares/validateToken');
const { getAllTalkers, getTalkerById, postTalker } = require('../utils/readAndWriteFiles');

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

routeTalker.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalkWatchedAt,
  validateTalkRate,
  async (request, response) => {
    const talker = request.body;

   const inserted = await postTalker({ id: 5, ...talker });
   console.log('inserted', inserted);

    return response.status(201).json(talker);
   }); 
module.exports = routeTalker;