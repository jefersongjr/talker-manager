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

const postTalker = async (talk) => {
    try {
         const data = await readTalkerFile();
   //     talk = { id: data.nexttalkId, ...talk };

       data.push(talk);
       data.nextPostId += 1;

       const content = await fs.writeFile(path, JSON.stringify(data));
       return content;
    } catch (error) {
      return null;
}
};

module.exports = {
    getTalkerById,
    getAllTalkers,
    readTalkerFile,
    postTalker,
};