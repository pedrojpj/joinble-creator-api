import mongoose  from 'mongoose'

const ComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
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
        required: true
    },
    childs: {
        type: {}
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date
    }
})

ComponentSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model( 'component', ComponentSchema);
