const express = require('express');
const router = express.Router();
const users = require('../models/users');

router.get('/', async (req, res) => {
    try {
        const resps = await users.find();
        res.json(resps);
    } catch (err) {
        console.error('Error: ' + err);
    }
})

router.delete('/:id', async (req, res) => {
    const Uid = req.params.id;
    try {
        const resp = await users.deleteOne({ _id: Uid });
        // res.json(resp);
        if (resp.acknowledged) {
            resp.send('user deleted successfully.');
        }
        else {
            resp.send('user couldn\'t deleted successfully!');
        }
    }
    catch (err) {
        res.status(500).send('Error: ' + err);
    }
})

router.put('/', async (req, res) => {
    const Uid = req.body._id;
    const isExist = await users.find({ _id: Uid }).count()>0;
    console.log(isExist);
    
    if (isExist) {
        const result = await users.updateOne({ _id: Uid }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender
            }
        })
        if(result.acknowledged)
        {
            res.send("user updated successfully.");
        }
        else{
            res.send("user couldn't udated successfully.");
        }
    }
    else {
        res.send('User Doesn\'t Exist With This Id!!');
    }
})

router.get('/:id', async (req, res) => {
    const Pid = req.params.id;
    try {
        const resps = await users.find({ _id: Pid });
        res.json(resps);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const user = new users({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender
    })
    try {
        const resp = await user.save();
        res.status(200).json(resp);
    }
    catch (err) {
        res.status(500).send('Error: ' + err);
    }
})

module.exports = router;