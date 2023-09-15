exports.verifyToken = function (req, res, next) {

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