const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    const tokenNull = { message: 'Token não encontrado' };
    const tokenInvalid = { message: 'Token inválido' };

    if (!authorization) return res.status(401).json(tokenNull);
    if (authorization.length !== 16) return res.status(401).json(tokenInvalid);

    next();
};

module.exports = validateToken;