'use strict'
import mongoose from 'mongoose';
const Schema = mongoose.Schema


const LectureShcema = new Schema({
    nameProject: {
        type: String,
        required: 'Please require name project.',
    },
    stepWork: [],
    time_set: {
        type: Date,
        required: "Set Time Project ."
    },
    id_user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    }
})

mongoose.model("Lecture", LectureShcema)


