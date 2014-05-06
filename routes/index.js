var express = require('express');
var router = express.Router();
if (process.env.NODE_ENV === 'production'){
  var gpio = require('pi-gpio');
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Cumplo Door' });
});

router.post('/abrir', function(req, res){
  if (process.env.NODE_ENV === 'production') {
    gpio.open(11, "output", function(err) {
      return gpio.write(11, 1, function() {
        return setTimeout(closeOutput, 500);
      });
    });

    closeOutput = function() {
      return gpio.write(11, 0, function() {
        return gpio.close(11);
      });
    };
  }
  res.redirect('/');
});
module.exports = router;
