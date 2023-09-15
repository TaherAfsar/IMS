const jwt = require("jsonwebtoken")


exports.verifyToken = function (req, res, next) {
    // Get the JWT token from the request headers or query parameters
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    // Verify the token
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token verification failed ' + err });
        }

        // Token is valid, and 'decoded' contains the payload
        const { role, id } = decoded;

        req.role = role;
        req.id = id;

        next();
    });

}

exports.createToken = function (req, res, next) {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        role: req.role,
        id: req._id,
    }

    const token = jwt.sign(data, jwtSecretKey);

    req.token = token;
    next()
}