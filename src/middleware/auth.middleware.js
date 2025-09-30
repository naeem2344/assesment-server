const jwt = require('jsonwebtoken');


const saltRound = 9;
const secrateKey = 'sdhj@werkjh4564';
const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).send("Access denied.");
        
        const decoded = jwt.verify(token, secrateKey);
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message || 'Check in middleware'
        });
    }
}

module.exports = {
    authMiddleware
}