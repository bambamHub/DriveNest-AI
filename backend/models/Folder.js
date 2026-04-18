// models/Folder.js
const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
});

module.exports = mongoose.model("Folder", folderSchema);