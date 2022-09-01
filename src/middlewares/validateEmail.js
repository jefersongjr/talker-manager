const emailEmpty = { message: 'O campo "email" é obrigatório' };
const emailWrongPattern = { message: 'O "email" deve ter o formato "email@email.com"' };

module.exports = (req, res, next) => {
    const { email } = req.body;
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!email) return res.status(400).json(emailEmpty); 

    if (!emailPattern.test(email)) return res.status(400).json(emailWrongPattern);

    next();
};