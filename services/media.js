const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
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
}