const express = require("express");
const router = express.Router();
const Lebenslauf = require("../../models/Lebenslauf");
const User = require("../../models/User");



router.post("/createDefault", async (req, res) => {
    try {
        let user = await User.exists({ username: process.env.API_USERNAME });
        if (!user) {
            let user = new User({
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD,
            });
            await user.save();
            res.status(201).json(user)
        }
        else {
            res.status(400).json({message: "Default Admin already exists in Database"})
        }
        

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/deleteDefault", async (req, res) => {
    try {
        let user = await User.exists({ username: process.env.API_USERNAME });
        if (!user) {
            res.status(400).json({message: "Default Admin User does not exist"});
        } else {
            await User.deleteOne({ username: process.env.API_USERNAME }, (err) => {
                if (err) return console.error(err)
                res.status(200).json({message: "Default Admin deleted"})
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/users", async (req, res) => {
    try {
        let users = await User.find();
        users.forEach(element => {
            element.password = undefined
            console.log(element)
        });
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newLebenslauf = req.body;
    try {
        console.log(newLebenslauf)
        await Lebenslauf.findByIdAndUpdate(id, newLebenslauf);
        res.status(200).json({message: "updated Lebenslauf"})
    } catch (error) {
        res.status(500).res.json({ message: "Failed to update Lebenslauf" })
    }
})

module.exports = router;
