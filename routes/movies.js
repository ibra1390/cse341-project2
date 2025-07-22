const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const { validateMovie } = require('../middleware/validateMovie');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);
router.post('/', isAuthenticated, validateMovie, moviesController.createMovie);
router.put('/:id', isAuthenticated, validateMovie, moviesController.updateMovie);
router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;