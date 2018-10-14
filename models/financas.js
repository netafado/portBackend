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
    initialValue:{
        type: Number,
        default: 0
    },
    valueGoal:{
        type: Number,
        required: true
    },
    deadline:{
        type: Date,
        required: true,
    },
    type: {
        type: String,
        default: "R$"
    },
    values:[{
        value:{
            type: Number,
            required: "Um valor é necessario"            
        },
        desc: {
            type: String,
            default: 'nenhum'

        },
        createdAt:{
            type: Date,
            default: Date.now()
        }
    }
    ,]


}, {timestamps:true} )

module.exports = mongoose.model("Financa", Financas);