const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

const { 
    getAllSneakers,
    createSneaker,
    updateSneaker,
    deleteSneaker
} = require("../controllers/sneakerController")

router.use(authenticateToken);

router.get("/", getAllSneakers);
router.post("/", createSneaker);
router.put("/:id", updateSneaker);
router.delete("/:id", deleteSneaker);

module.exports = router;
