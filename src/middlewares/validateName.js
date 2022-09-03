const validateName = (req, res, next) => {
    const { name } = req.body;
    const nameEmpty = { message: 'O campo "name" é obrigatório' };
    const nameLength = { message: 'O "name" deve ter pelo menos 3 caracteres' };

    if (!name) return res.status(400).json(nameEmpty); 

    if (name.length < 4) return res.status(400).json(nameLength);

    next();
};

module.exports = validateName;