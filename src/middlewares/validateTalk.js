const talkNull = { message: 'O campo "talk" é obrigatório' };
const watchedAtNull = { message: 'O campo "watchedAt" é obrigatório' };
const isDatePattern = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
const rateNull = { message: 'O campo "rate" é obrigatório' };
const rateLength = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
const datePattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

const validateTalkWatchedAt = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) return res.status(400).json(talkNull);
    if (!talk.watchedAt) return res.status(400).json(watchedAtNull);
    if (!datePattern.test(talk.watchedAt)) return res.status(400).json(isDatePattern);
 
    next();
};

const validateTalkRate = (req, res, next) => {
    const { talk } = req.body;
    if (talk.rate < 1 || talk.rate > 5) return res.status(400).json(rateLength);
    if (!talk.rate) return res.status(400).json(rateNull);

    next();
};

module.exports = {
    validateTalkWatchedAt,
    validateTalkRate,
};