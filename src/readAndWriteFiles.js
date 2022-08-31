const fs = require('fs').promises;
const { join } = require('path');

const path = './talker.json';

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

module.exports = {
    readTalkerFile,
    getAllTalkers,
};