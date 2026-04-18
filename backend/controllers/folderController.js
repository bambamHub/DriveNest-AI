// controllers/folderController.js
const Folder = require("../models/Folder");
const File = require("../models/File");

exports.createFolder = async (req, res) => {
  const folder = await Folder.create({
    name: req.body.name,
    parent: req.body.parent || null,
    user: req.user.id,
  });
  res.json(folder);
};

exports.getFolders = async (req, res) => {
  const folders = await Folder.find({ user: req.user.id });
  res.json(folders);
};

// 🔥 Recursive Size Calculation
async function getFolderSize(folderId) {
  const files = await File.find({ folder: folderId });
  let size = files.reduce((acc, f) => acc + f.size, 0);

  const children = await Folder.find({ parent: folderId });

  for (let child of children) {
    size += await getFolderSize(child._id);
  }

  return size;
}

exports.getFolderSize = async (req, res) => {
  const size = await getFolderSize(req.params.id);
  res.json({ size });
};