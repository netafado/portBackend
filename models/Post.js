const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;
const express = require('express');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    content:{
        type: String,
        trim: true,
        required: true
    },
    desc:{
        type: String,
        trim: true
    },
    author:{
        type: Schema.Types.ObjectId,
        required: true
    },
    img:{
        type: String
    },
    thumb: {
        type: String
    },
    type:{
        type: String,
        default: 'post'
    }
}, {timestamps:true})

module.exports = mongoose.model("Post", PostSchema)