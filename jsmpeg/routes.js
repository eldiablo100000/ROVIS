const routes = require('express').Router();

routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
  res.sendFile('public/index.html',{root: __dirname});
});
routes.get('/position', (req, res) => {
    res.status(200).json({ message: 'position' });
});
routes.get('/pic', (req, res) => {
  res.send({
    cats: [{ name: 'lilly' }, { name: 'lucy' }]
  });
});
routes.route('/sensors/ultrasound/:side').get((req, res) => {
  const requestedUltrasoundSide = req.params['side']
});
routes.route('/sensors/ultrasound').post((req, res) => {
  res.send(201, req.body);
});

module.exports = routes;