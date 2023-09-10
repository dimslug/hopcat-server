const Admin = require("../models/AdminModel");

const createAdmin = async (req, res) => {
  try {
    const adminData = req.body;
    const newAdmin = new Admin(adminData);
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ error: "Could not create the admin" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve admins" });
  }
};

const getAdminById = async (req, res) => {
  try {
    const adminID = req.params.adminID;
    const admin = await Admin.findOne({ adminID });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve the admin" });
  }
};

const updateAdminById = async (req, res) => {
  try {
    const adminID = req.params.adminID;
    const updatedData = req.body;
    const updatedAdmin = await Admin.findOneAndUpdate(
      { adminID },
      updatedData,
      {
        new: true,
      }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: "Could not update the admin" });
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const adminID = req.params.adminID;
    const deletedAdmin = await Admin.findOneAndDelete({ adminID });
    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Could not delete the admin" });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
