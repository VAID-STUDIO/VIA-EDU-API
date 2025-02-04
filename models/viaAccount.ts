import mongoose from 'mongoose';
import validator from 'validator';

const viaAccountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        },
        index: true
    },
    role: { type: String, required: true },
    class: { type: String, index: true },
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
    description: { type: String },
});

const VIA_Account = mongoose.model('VIA_Account', viaAccountSchema);

export default VIA_Account;
