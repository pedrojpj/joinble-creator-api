import mongoose  from 'mongoose'

const ElementSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true
    },
    selector: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date
    }
})

ElementSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model('element', ElementSchema);
