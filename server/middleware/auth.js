const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        console.log("before decoded : " + token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decoded");
        console.log("decoded: " + decoded._doc.first_name);
        req.user = decoded._doc;

        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = verifyToken;