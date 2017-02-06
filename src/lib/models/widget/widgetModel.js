import mongoose from 'mongoose';

const WidgetSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String
    },
    repeat: {
        type: Boolean,
        default: false
    },
    content: [],
    styles: {},
    selector: {
        type: String,
        required: true,
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

WidgetSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model( 'widget', WidgetSchema);
