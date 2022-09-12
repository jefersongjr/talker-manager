const express = require('express');
const validateAge = require('../middlewares/validateAge');
const validateName = require('../middlewares/validateName');
const { validateTalkWatchedAt, validateTalkRate } = require('../middlewares/validateTalk');
const validateToken = require('../middlewares/validateToken');
const { readTalkerFile,
        getAllTalkers, getTalkerById, updateTalker,
         postTalker, removeTalker, findTalkerByName } = require('../utils/readAndWriteFiles');

const routeTalker = express.Router();

routeTalker.get('/talker/search', validateToken, async (request, response) => {
  const { q } = request.query;
  const AllTalkers = await readTalkerFile();
  const filteredTalk = await findTalkerByName(q);

  if (!q) {
    return response.status(200).json(AllTalkers);
  }
  return response.status(200).json(filteredTalk);
});

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

    const changeTalker = await updateTalker(Number(id), changedTalker);
    return response.status(200).json(changeTalker);
 });

 routeTalker.delete('/talker/:id', validateToken, async (req, res) => {
    try {
     const { id } = req.params;
     const x = removeTalker(id);
     
     res.status(204).json(x);
 } catch (error) {
  console.log(error.message);
 }
});

module.exports = routeTalker;  
