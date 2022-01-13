const router = require('express').Router();

const pollController = require('./controllers/poll.controller');

router.post('/polls', pollController.createPoll);
router.get('/polls/:code', pollController.getPoll);
router.put('/polls/:code/vote', pollController.addResponse)

// Catch all other routes
router.all('*', (req, res) => {
  res.sendStatus(404);
});

module.exports = router;