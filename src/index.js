const express = require('express');
const bodyParser = require('body-parser');
const talkerFile = require('./readAndWriteFiles');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (request, response) => {
  const talker = await talkerFile.getAllTalkers();
  response.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
}); 
