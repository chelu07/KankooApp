var express = require("express");
const usersControllers = require("../controllers/usersControllers");
var router = express.Router();
//http://localhost:3000/users

router.post("/registeruser", usersControllers.registerUser);
router.post("/login", usersControllers.login);
router.get("/otheruser:id", usersControllers.otherUser);
router.get("/userprofile", usersControllers.viewProfile);
router.get("/mytours", usersControllers.ownTours);
router.get("/favtours", usersControllers.favTours);
router.get("/boughttours", usersControllers.boughtTours);
router.get("/terms", usersControllers.terms);
router.get("/privacy", usersControllers.privacy);
router.put("/edituser", usersControllers.editUser);

module.exports = router;
