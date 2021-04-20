const mongoose = require('mongoose')

//user profile data
const user =  new mongoose.Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userlogin',
            required: true
        },
        firstname: {
            type: String,
            required: true,
            maxlength: 100
        },
        middlename: {
            type: String,
            required: true,
            maxlength: 100 
        },
        lastname: {
            type: String,
            required: true,
            maxlength: 100
        },
        gender: {
            type: String,
            required: true,
            maxlength: 1
        },
        dob: {
            type: Date,
            required: false
        },
        address1: {
            type: String,
            required: false,
            maxlength: 250
        },
        address2: {
            type: String,
            required: false,
            maxlength: 250
        },
        countryId: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "Country",
            type: String,
            required: false
        },
        stateId: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "State",
            type: String,
            required: false,
        },
        cityId: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "City",
            type: String,
            required: false,
        },
        zipcode: {
            type: String,
            required: false
        },
        disablility: {
            type: String,
            required: false
        },
        maritalstatus: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', user)

module.exports = { User }