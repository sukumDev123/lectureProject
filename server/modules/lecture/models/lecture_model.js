'use strict'
import mongoose from 'mongoose';
const Schema = mongoose.Schema


const LectureShcema = new Schema({
    nameProject: {
        type: String,
        required: 'Please require name project.',
    },
    stepWork: [],
    id_user: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    }
})

mongoose.model("Lecture", LectureShcema)


