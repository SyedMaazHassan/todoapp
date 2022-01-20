const mongoose = require('mongoose');
const Task = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    is_completed: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('Task', Task);

