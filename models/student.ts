import mongoose from 'mongoose';
import validator from 'validator';

const studentSchema = new mongoose.Schema({
    id: { type: String, index: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true },
    class: { type: String, required: true, index: true },
    publicEmail: { 
        type: String, 
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    socialNetworks: {
        type: [String],
        validate: {
            validator: function(v: string[]) {
                return v.every(url => validator.isURL(url));
            },
            message: 'Invalid URL format in socialNetworks'
        }
    },
    avatar: {
        type: String,
        validate: {
            validator: validator.isURL,
            message: 'Invalid URL format for avatar'
        }
    },
    description: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
