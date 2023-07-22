const errorHandler = (err, req, res, next) => {
  const error = {
    status: req.status || 500,
    message: req.message || "Internal Server Error",
  };
  res.status(error.status).render("error", { error });
};

export default errorHandler;
