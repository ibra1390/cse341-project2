const express = require('express');
const router = express.Router();

const actorsController = require('../controllers/actors');
const { validateActor } = require('../middleware/validateActor');

router.get('/', actorsController.getAll);
router.get('/:id', actorsController.getSingle);
router.post('/', validateActor, actorsController.createActor);
router.put('/:id', validateActor, actorsController.updateActor);
router.delete('/:id', actorsController.deleteActor);

module.exports = router;
