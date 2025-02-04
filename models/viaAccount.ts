import mongoose from 'mongoose';

const viaAccountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    class: String,
    publicEmail: String,
    socialNetworks: [String],
    avatar: String,
    description: String,
});

const VIA_Account = mongoose.model('VIA_Account', viaAccountSchema);

export default VIA_Account;
