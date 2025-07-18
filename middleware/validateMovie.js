const validator = require('../helpers/validate');

const validateMovie = (req, res, next) => {
  const rules = {
    title: 'required|string',
    director: 'required|string',
    releaseYear: 'required|integer|min:1800|max:2100',
    duration: 'required|integer|min:1|max:500',
    genre: 'required|string',
    rating: 'required|numeric|min:0|max:10',
    synopsis: 'string'
  };

  validator(req.body, rules, {}, (err, status) => {
    if (!status) {
      return res.status(422).json({ success: false, message: 'Validation failed', errors: err });
    }
    next();
  });
};

module.exports = { validateMovie };
