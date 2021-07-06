const express = require("express");
const router = express.Router();
const Lebenslauf = require('../../models/Lebenslauf')
const jwt = require("jsonwebtoken");

// GET the lebenslauf from Database for display.
router.get('/', async (req, res) => {
    try {
        const items = await Lebenslauf.find()
        res.status(200).json(items[0])
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const items = await Lebenslauf.find();
        if (req.body.ident) {
            let cv = items[req.body.ident]

            if (req.body.values) {
                req.body.values.forEach(element => {
                    setValue(cv, element.location, element.value); 
                });
                cv.save();
                //console.log(cv)
                res.status(200).json({ req: req.body });
            } else {
                res.status(401).json({ message: error.message }); 
            }
        } else {
            res.status(404).json({ message: error.message }); 
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/addItem', authenticateToken, async (req, res) => {
    try {
        const items = await Lebenslauf.find();
        if (req.body.ident) {
            let cv = items[req.body.ident];
            if (typeof req.body.item === 'object') {
                addItem(cv, req.body)
                await cv.save();
                //console.log(cv)
                res.status(200).json({ req: req.body });
            } else {
                res.status(401).json({ message: error.message }); 
            }
        }
        else {
            res.status(404).json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


function setValue(obj, locationString, value) {
    let string = locationString;
    let items = string.split(".");
    let len = items.length;
    for (let i = 0; i < len - 1; i++) {
        let elem = items[i];
        if (!obj[elem]) obj[elem] = {};
        obj = obj[elem];
    }
    obj[items[len - 1]] = value;
    //console.log(obj);
}

function addItem(cv, obj) {
    let string = obj.location;
    let items = string.split(".");
    let len = items.length;
    for (let i = 0; i < len - 1; i++) {
        let elem = items[i];
        if (!cv[elem]) cv[elem] = {};
        cv = cv[elem];
    }
    cv[items[len - 1]].push(obj.item);
    //console.log(obj);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    //console.log(err)

    if (err) return res.status(403).json(err)

    next()
  })
}

module.exports = router;