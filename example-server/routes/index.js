var express = require("express");
var router = express.Router();
const getExample = require("../controllers/exampleController");

/* GET example */
router.get("/", getExample);

module.exports = router;
