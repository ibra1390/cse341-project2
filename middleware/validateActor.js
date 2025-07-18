const validator = require('../helpers/validate');

const validateActor = (req, res, next) => {
  const rules = {
    name: 'required|string',
    birthdate: 'required|string',
    age: 'required|integer|min:0|max:130',
    nationality: 'required|string'
  };

  validator(req.body, rules, {}, (err, status) => {
    if (!status) {
      return res.status(422).json({ success: false, message: 'Validation failed', errors: err });
    }
    next();
  });
};

module.exports = { validateActor };
