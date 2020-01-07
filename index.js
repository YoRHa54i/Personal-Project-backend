const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const userService = require('./services/user')
const mediaService = require('./services/media')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const app = express()

// import passport
const passport = require('passport')

// use the strategy
app.use(passport.initialize())
app.use(cors())
app.use(fileUpload({
  createParentPath: true
}));

app.use(express.static('uploads'))

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// import config of passport
require('./config/passport/passport')

db.sequelize.sync({ force: false }).then(() => {
  userService(app, db);
  mediaService(app, db);

  app.listen(8080, () => console.log("Server is running on port 8080"))
})