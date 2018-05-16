
/** create information  */

'use strict'
import mongoose from 'mongoose'
const Lecture = mongoose.model('Lecture')


function allLecture(req, res) {
    if (req.user) {
        Lecture.findById({ id_user: req.user._id }).then(suc => {
            return res.json(suc)
        }).catch(err => {
            return res.status(400).json({
                message : 'Require err'
            })
        })
    }

}

function createLecture(req, res) {
    if (req.user) {
        let lecture_status = true
        let lecture = new Lecture(req.body);
        if (!lecture.stepWork || lecture.stepWork.length === 0) {
            lecture.stepWork.push({ status: false })
            lecture_status = false
        }
        lecture.id_user = req.user._id
        lecture.save(err => {
            if (err) {
                return res.status(404).json({
                    status: 404,
                    message: 'required err'
                })
            } else {
                return res.json({
                    message: `Created lecture success status step word : ${lecture_status}`,
                    lecture: lecture
                })
            }
        })


    } else {
        return res.status(401).json({
            status: 401,
            message: 'Not allow'
        })
    }
}
function removeAddLecture(req, res) {
    if (req.user && req.lecture) {
        Lecture.findById({ _id: req.lecture._id }).then(suc => {
            let lecture = suc
            let lectureStep = lecture.stepWork
            lectureStep.splice(req.body.stepWork, 1)
            lecture.set({ stepWork: lectureStep })
            lecture.save(err => {
                if (err) {
                    return res.status(404).json({
                        message: "remove step not success"
                    })
                } else {
                    return res.json({
                        message: "remove step success",
                        lecture: lecture
                    })
                }
            })
        })
    }
}
function stepAddLecture(req, res) {
    if (req.user && req.lecture) {
        Lecture.findById({ _id: req.lecture._id }).then(suc => {
            let lecture = suc
            let lectureStep = lecture.stepWork
            lectureStep.push(req.body.stepWork)
            lecture.set({ stepWork: lectureStep })
            lecture.save(err => {
                if (err) {
                    return res.status(404).json({
                        message: "Add step not success"
                    })
                } else {
                    return res.json({
                        message: "Add step success",
                        lecture: lecture
                    })
                }
            })
        })
    }
}

function removeLecture(req, res) {
    if (req.user && req.lecture) {
        let lecture = req.lecture
        lecture.remove(err => {
            if (err) {
                return res.status(404).json({
                    message: 'remove info not success',
                    status: false
                })
            } else {
                return res.json({
                    message: 'remove info sucess',
                    status: true
                })
            }
        })
    }
}
function paramLec(req, res, next, id) {
    if (req.user) {
        Lecture.findById({ _id: id }).then(suc => {
            req.lecture = suc
            next()
        }).catch(err => {
            return res.status(404).json({
                status: 404,
                message: 'required err'
            })
        })
    } else {
        return res.status(401).json({
            status: 401,
            message: 'Not allow'
        })
    }
}



export { removeLecture, createLecture, stepAddLecture, paramLec, allLecture , removeAddLecture }