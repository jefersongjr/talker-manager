const validateAge = (req, res, next) => {
    const { age } = req.body;
    const nameEmpty = { message: 'O campo "age" é obrigatório' };
    const ageLimit = { message: 'A pessoa palestrante deve ser maior de idade' };

    if (!age) return res.status(400).json(nameEmpty); 

    if (age <= 18) return res.status(400).json(ageLimit);

    next();
};

module.exports = validateAge;