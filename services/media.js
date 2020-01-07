const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const passport = require('passport');
const config = require('../config/passport/passport');
const _ = require('lodash');

module.exports = (app, db) => {
  app.post("/upload-photo", function (req, res) {
    // console.log(mv)
    db.media.create
    try {
      if (!req.files) {
        res.send({
          status: false,
          message: "No file uploaded"
        });
      } else {
        //Use the name of the input field (i.e. "photo") to retrieve the uploaded file
        let photo = req.files.photos;
        let photoName = new Date().getTime() + ".jpeg";
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        photo.mv("./uploads/" + photoName);
        //send response
        res.send({
          status: true,
          message: "File is uploaded",
          data: {
            name: photoName,
            mimetype: photo.mimetype,
            size: photo.size
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  })

  // app.post('/create-uploadPic',
  //   passport.authenticate('jwt', { session: false }),
  //   function (req, res) {
  //     let url;
  //     if (!req.files) {
  //       res.send({
  //         status: false,
  //         message: "No file uploaded"
  //       });
  //     } else {
  //       //Use the name of the input field (i.e. "photo") to retrieve the uploaded file
  //       let photo = req.files.photos;
  //       let photoName = new Date().getTime() + ".jpeg";
  //       //Use the mv() method to place the file in upload directory (i.e. "uploads")
  //       photo.mv("./uploads/" + photoName);
  //       //send response
  //       url = `http://localhost:8080/${photoName}`
  //       db.media.create({
  //         user_id: req.user.user_id,
  //         media_url: url,
  //         media_name: req.body.media_name,
  //         text: req.body.text,
  //         status: "in-progress",
  //         reason: "",
  //         approve_date: "01-01-2000",
  //         number_of_download: "0"
  //       })
          // .then(mediaResult => {
          //   db.category.create({
          //     category_name: req.body.category_name
          //   }).then(categoryResult => {
          //     db.incate.create({
          //       media_id: mediaResult.media_id,
          //       category_id: categoryResult.category_id
          //     })
          //   })
          //   db.keywords.create({
          //     keyword_name: req.body.keyword_name
          //   })
          //     .then(keywordResult => {
          //       db.inkey.create({
          //         media_id: mediaResult.media_id,
          //         keyword_id: keywordResult.keyword_id
          //       })
          //     })
          //   res.status(201).send(mediaResult)
          // })
          // .catch(err => {
          //   console.log(err.message)
          //   res.status(400).send({ message: err.message })
          // })
      }
//     }
//   )

// }