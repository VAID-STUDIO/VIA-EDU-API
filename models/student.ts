import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    id: String,
    name: String,
    age: Number,
    grade: String,
    class: String,
    publicEmail: String,
    socialNetworks: [String],
    avatar: String,
    description: String,
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
