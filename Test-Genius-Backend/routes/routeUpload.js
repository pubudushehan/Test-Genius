/*const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const cloudinary = require("../config/cloudinary");

router.post("/upload", upload.single("image"), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (error, result) {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Error uploading image" });
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: result,
    });
  });
});

module.exports = router; */
