const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unqiue: true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,                       
        },
        password: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true            
        }/* ,
        influencerID: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            required: true            
        } */
})

module.exports = mongoose.model('Influencer', UserSchema)