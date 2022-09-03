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
    const data = await readTalkerFile();
    return data
    .find((talker) => talker.id === id);
};

const getLastId = async () => {
    const data = await readTalkerFile();
    return data.length;   
};

const postTalker = async (talk) => {
    try {
        const talkers = await readTalkerFile();

    talkers.push(JSON.parse(talk));
    const content = await fs.writeFile(path, JSON.stringify(talkers));
    return content;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

const updateTalker = async (id, update) => {
   try {
    const talkers = await readTalkerFile();
    let changedTalker;
    for (let i = 0; i < talkers.posts.length; i += 1) {
      if (talkers[i].id === Number(id)) {
        talkers[i].name = update.name;
        talkers[i].age = update.age;
        talkers[i].talk.watchedAt = update.talk.watchedAt;
        talkers[i].talk.rate = update.talk.rate;
        changedTalker = talkers[i];
      }
    }
    await fs.writeFile(path, JSON.stringify(talkers));
    return changedTalker;
  } catch (error) {
    return null;
  } 
};

module.exports = {
    getTalkerById,
    getAllTalkers,
    readTalkerFile,
    getLastId,
    postTalker,
    updateTalker,
};