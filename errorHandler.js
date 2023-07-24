const errorHandler = (err, req, res, next) => {
  const error = {
    status: err.statusCode ?? 500,
    message: err.message || "Internal Server Error",
  };
  res.status(error.status).render("pages/error", { error });
};

export default errorHandler;
