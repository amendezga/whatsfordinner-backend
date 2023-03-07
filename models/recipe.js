const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    healthLabel: [{
        type: String,
    }],
    ingredients: [{
        type: String,
        required: true,
    }],
    nutrInfo: {
        cal: {
            type: Number,
            required: true,
        },
        fat: {
            type: Number,
            required: true,
        },
        chol: {
            type: Number,
            required: true,
        },
        sod: {
            type: Number,
            required: true,
        },
        carbs: {
            type: Number,
            required: true,
        },
        protein: {
            type: Number,
            required: true,
        },
    },
    eatenToday: {
        type: Boolean
    },
    addedBy: {
        type: String, // firebase user ID
        required: true,
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('Recipe', recipeSchema);