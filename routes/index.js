const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World')});

router.use('/movies', require('./movies'));

module.exports = router;