const mongoose  = require('mongoose');
const schema =  mongoose.Schema;

const Financas = new schema({
    name:{
        trim: true,
        type: String,
        required: true
    },
    desc: {
        type: String,
        trim: true
    },
    initialDate:{
        type: Date,
        required: true,
    },
    deadline:{
        type: Date,
        required: true,
    },
    type: {
        type: String,
        default: "R$"
    },
    value:[{
        value:{
            type: Number,            
        }
    }, {timestamps:true}]


}, {timestamps:true} )

module.exports = mongoose.model("Financa", Financas);