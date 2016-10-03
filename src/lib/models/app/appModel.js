import mongoose from 'mongoose';

const AppSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        trim: true
    },
    code: {
        type: String
    },
    platform: {
        type: Array
    },
    domain: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date
    }
})

export default mongoose.model('app', AppSchema);
