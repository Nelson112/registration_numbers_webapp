var mongoose = require('mongoose');
var mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/registrations";

mongoose.connect(mongoURL, {
  useMongoClient: true,
});
exports.numberPlates = mongoose.model('numberPlates', {
  plate: String
});
