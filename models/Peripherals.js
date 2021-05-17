const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const peripheralsSchema = new Schema({
    uid: {
        type: Number,
        trim: true,
    },
    vendor: {
        type: String,
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now,
        trim: true,
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        dafault: 'online',
        trim: true,
    },
    gateway: {
        type: Schema.ObjectId,
        ref: 'Gateways',
    }
});

module.exports = mongoose.model('Peripherals', peripheralsSchema);