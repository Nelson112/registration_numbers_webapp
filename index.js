var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
// var newPlate = [];

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

app.use(bodyParser.json());

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/reg_number/:number', function(req, res) {

  var numberPlate = req.params.number;

  // res.send(numberPlate);
  // newPlate.push(numberPlate);
  console.log(numberPlate);

  res.render("index", {
    plate: numberPlate
  });
});
var port = process.env.PORT || 3001

app.listen(port);
