import mongoose from 'mongoose';

const revokedTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    revokedAt: { type: Date, default: Date.now }
});

const RevokedToken = mongoose.model('RevokedToken', revokedTokenSchema);

export default RevokedToken;
