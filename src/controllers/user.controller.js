import { usermodel, userdetailmodel } from "../models";
import bcrypt from "bcryptjs";
const multer = require("multer");
const path = require("path");
const pat = "./upload";
require("dotenv").config();

const storage = multer.diskStorage({
  destination: pat,
  filename: (req, file, cd) => {
    return cd(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  limit: { Filesize: 15 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    checkfiletype(file, cb);
  },
}).single("profile");

function checkfiletype(file, cb) {
  const filetype = /jpeg|jpg|png|pdf/;
  const extname = filetype.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetype.test(file.mimetype);

  if (file == null) {
    console.log("select file");
  }

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("images only");
  }
}

const Register = async (req, res) => {
  let user = {};
  bcrypt.hash(req.body.password, 10, function (err, hashPass) {
    console.log(`req.body.password`, req.body.password);
    console.log(`hashPass`, hashPass);
    if (err) {
      res.json({
        message: err.message,
      });
    }
    user = new usermodel({
      email: req.body.email,
      password: hashPass,
    });
    user
      .save()
      .then((user) => {
        res.json({ message: "User Registered." });
      })
      .catch((errror) => {
        // res.json({ message: "Error occur." });
      });
  });
  let filepath,
    userdetail = {};

  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      filepath = `/upload/${req.file.filename}`;
      userdetail = new userdetailmodel({
        userid: user._id,
        name: req.body.name,
        additionalinfo: req.body.additionalinfo,
        phone: req.body.phone,
        country: req.body.country,
        filepath: filepath,
      });
      userdetail.save();
    }
  });
};

const getAllUser = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = page ? page : 1;
    limit = limit ? limit : 2;
    const allUser = await usermodel
      .find()
      .limit(parseInt(limit))
      .skip(parseInt(page) * parseInt(limit));
    res.status(200).json(allUser);
  } catch (error) {
    console.log(`error`, error);
    res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    let { _id } = req.query;
    const user = await usermodel.findOne({ _id });
    if (!user) {
      throw new Error(`cann not find this id:${_id}`);
    }

    const removeUser = await usermodel.findByIdAndDelete(_id, (err) => {
      if (err) {
        throw new Error("User cannot deleted");
      }

      res.status(200).json({
        success: true,
        message: "User Deleted",
      });
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};

export default { Register, removeUser, getAllUser };
