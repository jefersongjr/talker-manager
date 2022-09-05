const express = require('express');
const validateAge = require('../middlewares/validateAge');
const validateName = require('../middlewares/validateName');
const { validateTalkWatchedAt, validateTalkRate } = require('../middlewares/validateTalk');
const validateToken = require('../middlewares/validateToken');
const { readTalkerFile,
        getAllTalkers, getTalkerById, updateTalker,
         postTalker } = require('../utils/readAndWriteFiles');

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
  validateTalkRate, async (request, response) => {
    const { name, age, talk } = request.body;

    const lastId = await readTalkerFile();
    const id = lastId.length + 1;

    await postTalker({ name, age, id, talk });

    response.status(201).json({ id, name, age, talk });
    }); 

  routeTalker.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalkWatchedAt,
  validateTalkRate,
   async (request, response) => {
    const changedTalker = request.body;
    const { id } = request.params;

    const changeTalker = await updateTalker(changedTalker, Number(id));
    return response.status(200).json(changeTalker);
 }); 

module.exports = routeTalker;  
