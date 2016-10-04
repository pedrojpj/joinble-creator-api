import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt: Date
});

TokenSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model('token', TokenSchema);
