const error404 = (req, res, next) => {
  res
    .status(404)
    .render("error", {title: "Error 404", message: "Resource not found"}); // Renderiza la vista error.pug
};

export default {error404};
