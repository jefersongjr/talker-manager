const validatePassword = (req, res, next) => {
    const { password } = req.body;
    const PassEmpty = { message: 'O campo "password" é obrigatório' };
    const PassWrongPattern = { message: 'O "password" deve ter pelo menos 6 caracteres' };

    if (!password) return res.status(400).json(PassEmpty);

    if (password.length <= 6) return res.status(400).json(PassWrongPattern);

    next();
};

module.exports = validatePassword;