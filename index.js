var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var newPlate = [];
var models = require('./models')

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

app.use(bodyParser.json());

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get("/", function(req, res) {
  res.render('index', {})
})

app.post("/registrations", function(req, res) {
  var registration = req.body.registration
  var options = req.body.town
  
  models.numberPlates.findOne({
    plate: registration
  }, function(err, numberPlate) {
    if (err) {
      return cb(err);
    } else if (numberPlate === null) {
      var plates = new models.numberPlates({
        plate: registration
      });
      plates.save()
    }
  })
  newPlate.push(registration);
  console.log(newPlate);

  res.render('index', {
    newPlate: newPlate
  })
})

function createQuery(town) {
  if (!town) {
    town = "."
  }
  var query = {
    "plate": {
      $regex: town,
      $options: "i"
    }
  };
  return query;
}

app.post("/registrations/filter", function(req, res, next) {
  var town = req.body.town
  models.numberPlates.find(createQuery(town), function(err, result) {
    if (err) {
      // console.log(err);
      return next(err);
    } else {
      res.render('index', {
        addPlate: result
      })
    }
  })
})
app.post("/registrations/reset", function(req, res, next) {

  models.numberPlates.remove({}, function(err, result) {
    if (err) {
      return next(err)
    } else {
      addPlate: result
      res.render('index', {});
    }
  });
});
var port = process.env.PORT || 3002

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err)
})

app.listen(port);
