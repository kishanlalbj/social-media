const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError")
          return res.status(401).json({ message: "Unauthorized" });
        
        return res.status(401).json({ message: err.message });
      }

      req.user = payload;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyJwt
