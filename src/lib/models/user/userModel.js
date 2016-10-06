import mongoose from 'mongoose';
import { SecureService } from '~/src/lib/services';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validator: validator.isEmail
    },
    city: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt: Date
});

UserSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model( 'user', UserSchema);
