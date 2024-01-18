const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class usersControllers {
  registerUser = (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    let saltRounds = 8;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          let sql = `INSERT INTO user (first_name, last_name, email, password) VALUES ("${first_name}", "${last_name}", "${email}", "${hash}")`;

          connection.query(sql, (error, result) => {
            console.log(error);
            error
              ? res.status(500).json({ error })
              : res.status(200).json(result);
          });
        }
      });
    });
    console.log(req.body);
  };

  viewProfile = (req, res) => {
    console.log("este es tu perfil personal");
  };
  ownTours = (req, res) => {
    console.log("estas son mis guías");
  };
  favTours = (req, res) => {
    console.log("estas son mis guías favoritas");
  };
  boughtTours = (req, res) => {
    console.log("estas son mis guías adquiridas");
  };
  editUser = (req, res) => {
    console.log("aqui puedes editar tu usuario");
  };

  login = (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email = '${email}'`;
    connection.query(sql, (error, result) => {
      if (error) return res.status(500).json(error);
      console.log(result);

      if (!result || result.length === 0 || result[0].is_deleted == 1) {
        res.status(401).json("Email no registrado");
      } else {
        const user = result[0];
        const hash = user.password;
        bcrypt.compare(password, hash, (error, response) => {
          if (error) return res.status(500).json(error);
          if (response == true) {
            const token = jwt.sign(
              {
                user: {
                  id: user.user_id,
                  type: user.type,
                },
              },
              process.env.SECRET,
              { expiresIn: "1d" }
            );

            res.status(200).json({ token, user });
          } else {
            res.status(401).json("Contraseña no válida");
          }
        });
      }
    });
  };
}

module.exports = new usersControllers();
