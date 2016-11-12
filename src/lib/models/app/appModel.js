import mongoose  from 'mongoose'

const AppSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    code: {
        type: String
    },
    platform: {
        type: []
    },
    domain: {
        type: String
    },
    icon: {
        type: String
    },
    languages: {
        type: []
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
