const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const passport = require('passport');
const config = require('../config/passport/passport');
const _ = require('lodash');

module.exports = (app, db) => {
  app.get("/products", (req, res) => {
    db.product
      .findAll({ include: [db.media] })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      })
  })


  app.post("/upload-photo",
    // passport.authenticate('jwt', { session: false }),
    async (req, res) => {
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

  app.post(
    "/upload",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.role === "admin") {
        if (!req.files) {
          res.status(400).send({ message: 'no photo is uploaded' })
        } else {
          let picture = req.files.photos
          const fileName = (new Date()).getTime()
          picture.mv(`./uploads/${fileName}.jpeg`)
          await db.media.create({
            photo: `http://localhost:8080/${fileName}.jpeg`,
            media_url_1: req.body.media_url_1,
            media_url_2: req.body.media_url_2,
            media_url_3: req.body.media_url_3,
          }).then(result => {
            res.status(201).json(result);
            db.product.create({
              // product_id: req.body.product_id,
              product_name: req.body.product_name,
              price: req.body.price,
              detail: req.body.detail,
              category: req.body.category,
              media_id: result.media_id
            })
            // .then(result2 => {

            //   console.log('result', result.dataValues)
            //   console.log('result2', result2.dataValues)

            // })
            // .catch(err => {
            //   res.status(400).json({ errorMessage: err.message })
            //   console.error(err)
            // });
          })
            .catch(err => {
              console.error(err);
              res.status(400).json({ ErrorMessage: err.message });
            });
        }
      } else {
        res.status(401).send({
          message: "Unauthorized"
        });
      }
    }
  );
}