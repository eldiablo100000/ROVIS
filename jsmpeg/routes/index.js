const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
routes.get('/merda', (req, res) => {
    res.status(200).json({ message: 'merda!' });
  });
  

module.exports = routes;