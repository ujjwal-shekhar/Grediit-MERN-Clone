const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        console.log('verifyToken called');

        let token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('decoded: ' + decoded);
        next();

    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = verifyToken;