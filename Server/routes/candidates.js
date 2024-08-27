const express = require("express");
const router = express.Router();
const Candidate = require("../models/candidate");
const XLSX = require("xlsx");
const multer = require("multer");
const async = require("async");

router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("xlsx"), (req, res, next) => {
  try {
    let path = req.file.path;
    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    let jsonData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    if (jsonData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Sheet has no data",
      });
    }

    let count = 0;
    let duplicateCount = 0;
    async.eachSeries(
      jsonData,
      (item, callback) => {
        Candidate.findOne({ Email: item.Email }).count(function (err, num) {
          if (num > 0) {
            duplicateCount++;
            console.log(`Skipping duplicate item: ${item["Email"]}`);
            return callback();
          }

          const candidate = new Candidate(item);
          candidate.save(function (err) {
            if (!err) count++;
            callback(err);
          });
        });
      },
      (err) => {
        if (err) {
          console.error(err);
        } else {
          let message =
            count === 0
              ? "No unique items found!"
              : `${count} unique items saved successfully!`;
          message +=
            duplicateCount === 1
              ? "  1 duplicate!"
              : `  ${duplicateCount} duplicates!`;

          console.log(`${count} unique items saved successfully!`);
          return res.status(201).json({
            success: true,
            message: message,
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
