/** create information  */

'use strict'
import mongoose from 'mongoose'
const Lecture = mongoose.model('Lecture')


function allLecture(req, res) {
    console.log(typeof (req.user._id))
    if (req.user) {
        Lecture.find({
            id_user: req.user._id
        }).sort('-create_at').then(suc => res.json(suc))
    }

}

function createLecture(req, res) {
    if (req.user) {
        let lecture_status = true
        let lecture = new Lecture()
        lecture.nameProject = req.body.nameL
        lecture.stepWork = req.body.step
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
    console.log(req.lecture)

    if (req.user && req.lecture) {
        Lecture.findById({
            _id: req.lecture._id
        }).then(suc => {
            let lecture = suc
            let lectureStep = lecture.stepWork
            lectureStep.splice(req.body.stepWork, 1)
            lecture.set({
                stepWork: lectureStep
            })
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

function updateStep(req, res) {
    if (req.user && req.lecture) {
        let lectureN = req.body;
 
        Lecture.update({ _id: req.lecture._id }, { $set: { stepWork : lectureN   } } , function(err,data) {
            if(err) return res.json({status : 404})
            res.json(lectureN)
        });

    }
}

function removeLecture(req, res) {
    console.log(req.lecture)
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

    Lecture.findById(id).then(suc => {
        req.lecture = suc
        next()
    }).catch(err => {
        return res.status(404).json({
            status: 404,
            message: 'required err'
        })
    })

}

function updateStepStatus(req, res, next) {
    let step = req.body.idStep;
    if (req.user && req.lecture) {
        let lectureN = req.lecture.stepWork
        lectureN[step].status = true
        Lecture.update({ _id: req.lecture._id }, { $set: { stepWork : lectureN   } } , function(err,data) {
            if(err) return res.json({status : 404})
            res.json(lectureN)
        });

    }
}


export {
    removeLecture,
    createLecture,
    updateStep,
    paramLec,
    allLecture,
    removeAddLecture,
    updateStepStatus
}