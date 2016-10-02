import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
    active: {
        type: Boolean
    },
    seo: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        keywords: {
            type: Array
        }
    },
    name: {
        type: String,
        trim: true
    },
    slug: {
        type: String
    },
    widgets: {
        type: Array
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
