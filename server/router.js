const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send('Heyo');
})

module.exports = router;