const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let doctorSchema = new Schema({
    name: {
        type: String
    },
    specialty: {
        type: String
    },
    dob: {
        type: Date
    }
}, {
    collection: 'doctors'
})

module.exports = mongoose.model('DoctorSchema', doctorSchema)