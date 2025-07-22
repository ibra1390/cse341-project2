const express = require('express');
const router = express.Router();

const actorsController = require('../controllers/actors');
const { validateActor } = require('../middleware/validateActor');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', actorsController.getAll);
router.get('/:id', actorsController.getSingle);
router.post('/', isAuthenticated, validateActor, actorsController.createActor);
router.put('/:id', isAuthenticated, validateActor, actorsController.updateActor);
router.delete('/:id', isAuthenticated, actorsController.deleteActor);

module.exports = router;
