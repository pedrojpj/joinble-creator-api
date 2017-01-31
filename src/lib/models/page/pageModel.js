import mongoose  from 'mongoose'

const PageSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: false
    },
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'page'
    },
    name: {
        type: String,
        trim: true
    },
    slug: {
        type: String
    },
    widgets: {
        type: []
    },
    active: {
        type: Boolean
    },
    primary: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date
    }
})

export default mongoose.model('page', PageSchema);
