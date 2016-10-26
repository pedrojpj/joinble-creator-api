import mongoose from 'mongoose';

const WidgetSchema = new moongose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    content: mongoose.Schema.Types.Mixed,
    styles: {},
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
