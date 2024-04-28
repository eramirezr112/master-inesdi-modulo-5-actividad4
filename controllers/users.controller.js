const User = require("../models/users.model");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password,
    verified: true,
  })
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          {
            sub: user.idl,
            exp: Date.now() / 1000 + 60,
          },
          process.env.JWT_SECRET
        );
        res.json({ token });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(console.error);
};

const verifyUser = (req, res) => {
  const token = req.query.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    User.findByIdAndUpdate(decoded.sub, { verified: true }, { new: true })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: "user not found" });
        }
      })
      .catch(console.error);
  } catch (error) {
    res.status(401).json({ message: "unable to verify" });
  }
};

function listUsers(req, res) {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
    });
}

function detailUser(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function createUser(req, res) {
  User.create(req.body)
    .then((user) => {
      const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);

      const verifyUrl = `http://localhost:8000/users/verify?token=${token}`;

      console.log(verifyUrl);

      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

module.exports = {
  login,
  verifyUser,
  listUsers,
  detailUser,
  createUser,
};
