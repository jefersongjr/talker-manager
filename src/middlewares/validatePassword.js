const PassEmpty = { message: 'O campo "password" é obrigatório' };
const PassWrongPattern = { message: 'O "password" deve ter pelo menos 6 caracteres' };

module.exports = (req, res, next) => {
    const { password } = req.body;
   
    if (!password) return res.status(400).json(PassEmpty);

    if (password > 6) return res.status(400).json(PassWrongPattern);

    next();
};