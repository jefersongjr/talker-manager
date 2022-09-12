const fs = require('fs').promises;
const { join } = require('path');

const path = '../talker.json';

const readTalkerFile = async () => {
    try {
        const content = await fs.readFile(join(__dirname, path), 'utf-8');
        return JSON.parse(content);
    } catch (error) { 
        return null;
    }
};

const getAllTalkers = async () => {
    const data = await readTalkerFile();
    return data;
};

const getTalkerById = async (id) => {
    const talkers = await readTalkerFile();
    return talkers
    .find((talker) => talker.id === id);
};

const getLastId = async () => {
    const talkers = await readTalkerFile();
    return talkers.length;   
};

const postTalker = async (talk) => {
    try {
        const talkers = await readTalkerFile();
        console.log(talk);
    talkers.push(talk);
    const content = await fs.writeFile(join(__dirname, path), JSON.stringify(talkers));
    return content;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

const updateTalker = async (id, update) => {
   try {
    const talkers = await readTalkerFile();
    for (let i = 0; i < talkers.length; i += 1) {
        if (talkers[i].id === Number(id)) {
            talkers[i].name = update.name;
            talkers[i].age = update.age;
            talkers[i].talk.watchedAt = update.talk.watchedAt;
            talkers[i].talk.rate = update.talk.rate;
        }
    }
    await fs.writeFile(join(__dirname, path), JSON.stringify(talkers));
    return { ...update, id: Number(id) };
  } catch (error) {
    return null;
  } 
};

const removeTalker = async (id) => {
    try {
      const talkers = await readTalkerFile();
      const deletedTalker = talkers.filter((talker) => talker.id !== Number(id));
      const content = await fs.writeFile(join(__dirname, path), JSON.stringify(deletedTalker));
      console.log(content);
    return content;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

const findTalkerByName = async (query) => {
    const talkers = await readTalkerFile();
    return talkers.filter((talker) => talker.name.includes(query));
  };

module.exports = {
    getTalkerById,
    getAllTalkers,
    readTalkerFile,
    getLastId,
    postTalker,
    updateTalker,
    removeTalker,
    findTalkerByName,
};