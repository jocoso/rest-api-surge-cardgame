module.exports = (req, res, next) => {
  // TODO: Convert into middleware
  if (!req.header("apiKey") || req.header("apiKey") !== process.env.API_KEY) {
    return res.status(401).json({ status: "error", message: "Unauthorized." });
  }
  next();
};
