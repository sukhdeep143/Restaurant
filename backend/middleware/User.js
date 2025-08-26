

const logMiddleware = (req, res, next) => {
 console.log("This is the middleware!!!");
 
  next();
};

module.exports = logMiddleware;
