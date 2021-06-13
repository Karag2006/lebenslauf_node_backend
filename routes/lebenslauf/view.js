const express = require("express");
const router = express.Router();
const Lebenslauf = require('../../models/Lebenslauf')

// GET the lebenslauf from Database for display.
router.get('/', async (req, res) => {
    try {
        const items = await Lebenslauf.find()
        res.json(items[0])
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;