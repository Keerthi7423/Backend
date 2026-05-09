const express = require("express"); 
const router = express.Router(); 
const multer = require("multer"); 
// STORAGE CONFIG 
 const storage = multer.diskStorage({ destination: (req, file, cb) => { cb(null, "uploads/"); }, filename: (req, file, cb) => { cb(null, Date.now() + "-" + file.originalname); 

 } }); 
 const upload = multer({ storage }); 
 // SINGLE FILE UPLOAD 
 router.post( "/upload", upload.single("image"), (req, res) => { res.json({ message: "File uploaded successfully", file: req.file }); 
} ); 

module.exports = router;