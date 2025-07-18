const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const { validateMovie } = require('../middleware/validateMovie');

router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);
router.post('/', validateMovie, moviesController.createMovie);
router.put('/:id', validateMovie, moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;