const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send('Heyo');
});

// Catch all other routes
router.all('*', (req, res) => {
  res.sendStatus(404);
});

module.exports = router;