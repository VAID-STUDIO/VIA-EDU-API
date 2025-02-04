import mongoose from 'mongoose';
import validator from 'validator';

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    specialization: { type: String, required: true },
    workExperience: { type: Number, required: true },
    description: { type: String, required: true },
    email: { 
        type: String, 
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    phone: { 
        type: String, 
        validate: {
            validator: function(v: string) {
                return validator.isMobilePhone(v, 'any', { strictMode: true });
            },
            message: 'Invalid phone number format'
        }
    },
    address: { type: String, required: true },
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
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
