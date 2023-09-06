const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let admins = [];

const generateID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

app.post("/admins", (req, res) => {
  const adminData = req.body;
  adminData.adminID = generateID();
  admins.push(adminData);
  res.status(201).json(adminData);
});

app.patch("/admins/:adminID", (req, res) => {
  const adminID = req.params.adminID;
  const updatedData = req.body;

  const adminIndex = admins.findIndex((admin) => admin.adminID === adminID);

  if (adminIndex === -1) {
    return res.status(404).json({ error: "Admin not found" });
  }

  admins[adminIndex] = { ...admins[adminIndex], ...updatedData };
  res.status(200).json(admins[adminIndex]);
});

app.delete("/admins/:adminID", (req, res) => {
  const adminID = req.params.adminID;

  const adminIndex = admins.findIndex((admin) => admin.adminID === adminID);

  if (adminIndex === -1) {
    return res.status(404).json({ error: "Admin not found" });
  }

  admins.splice(adminIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Admin server is running on port ${port}`);
});
