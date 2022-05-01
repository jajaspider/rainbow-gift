const mongoose = require('mongoose');
const {
    Schema
} = require('mongoose');

// Define Schemes
const categorySchema = new mongoose.Schema({
    mainCategory: {
        type: Schema.Types.String
    },
    subCategory: {
        type: Schema.Types.String
    },
    alias: {
        type: Schema.Types.String,
        unique: true
    },
    active: {
        type: Schema.Types.Boolean,
        default: true
    }

}, {
    timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('Category', categorySchema);