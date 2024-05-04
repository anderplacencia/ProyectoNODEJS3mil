const mongoose = require ("mongoose");

const bikeSchema = mongoose.Schema({
    marca: {
        type: String,
        required: true
    }, 
    modelo: {
        type: String,
        required: true
    },
    cc: {
        type: Number,
        requird: true
    },
});

module.exports =mongoose.model("bike", bikeSchema);