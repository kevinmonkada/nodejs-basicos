const error404 = (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "Resource not found",
  });
};

export default {error404};
