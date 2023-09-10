const express = require("express");
const router = express.Router();
const Admin = require("../models/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT;

const errorResponse = (res, error) => {
  return res.status(500).json({
    error: error.message,
  });
};

//! Signup POST
router.post("/admin/signup", async (req, res) => {
  try {
    const admin = new Admin({
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 13),
    });

    const newAdmin = await admin.save();

    const token = jwt.sign({ id: newAdmin._id }, SECRET, {
      expiresIn: "1 day",
    });

    res.status(200).json({
      admin: newAdmin,
      message: "success",
      token,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Login POST
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email });

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!admin || !passwordMatch)
      throw new Error("Email or Password does not match");

    const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: "1 day" });

    res.status(200).json({
      message: "success",
      admin,
      token,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Get all
router.get("/admin/", async (req, res) => {
  try {
    const getAllAdmins = await Admin.find();

    getAllAdmins
      ? res.status(200).json({
          getAllAdmins,
        })
      : res.status(404).json({
          message: `No admin(s) Found`,
        });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Get One by ID
router.get("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getAdmin = await Admin.findOne({ _id: id });

    getAdmin
      ? res.status(200).json({
          getAdmin,
        })
      : res.status(404).json({
          message: "No admin found",
        });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Update by ID
router.patch("/admin/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const filter = { _id: id };
    const info = req.body;
    const returnOption = { new: true };

    const update = await Admin.findOneAndUpdate(filter, info, returnOption);

    res.status(200).json({
      message: `${update.username} Updated!`,
      update,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Delete by ID
router.delete("/admin/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteAdmin = await Admin.deleteOne({ _id: id });

    deleteAdmin.deletedCount
      ? res.status(200).json({ message: "Admin Deleted" })
      : req.status(404).json({ message: "No Admin Found" });
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;
