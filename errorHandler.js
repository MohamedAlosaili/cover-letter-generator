const errorHandler = (err, req, res, next) => {
  console.log(err.message ?? err);
  const error = {
    status: req.status || 500,
    message: req.message || "Internal Server Error",
  };
  res.status(error.status).render("pages/error", { error });
};

export default errorHandler;
