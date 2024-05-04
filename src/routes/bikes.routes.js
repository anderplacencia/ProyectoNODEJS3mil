const express = require("express");
const bikeSchema = require("../models/bike");

const router = express.Router();

//Creando ruta bikes
router.post("/bikes", (req, res) => {
    const bike = bikeSchema(req.body);
    bike
        .save()
        .then((data) => resjson(data))
        .catch((error) => res.json({message: error}));
});

//get all bikes
router.get("/bikes", (req, res) => {
    bikeSchema
        .find()
        .then((data) => resjson(data))
        .catch((error) => res.json({message: error}));
});

//get a bike
router.get("/bikes/:id", (req, res) => {
    const {id} = req.params;
    bikeSchema
        .findById(id)
        .then((data) => resjson(data))
        .catch((error) => res.json({message: error}));
});

//update a bike
router.put("/bikes/:id", (req, res) => {
    const {id} = req.params;
    const { marca, modelo, cc } = req.body;
    bikeSchema
        .updateOne({ _id: id },{ $set: {marca, modelo, cc }})
        .then((data) => resjson(data))
        .catch((error) => res.json({message: error}));
});

//delete a bike
router.put("/bikes/:id", (req, res) => {
    const {id} = req.params;
    const { marca, modelo, cc } = req.body;
    bikeSchema
        .remove({ _id: id })
        .then((data) => resjson(data))
        .catch((error) => res.json({message: error}));
});




module.exports = router;