
import express from 'express'
import { removeLecture, createLecture, updateStep, paramLec, allLecture, removeAddLecture , updateStepStatus } from '../controllers/lecture_controller'
import { checkAuth } from '../../checkAuth'



export function lectureRoute() {
    const router_lecture = express()

    router_lecture.get('/all', checkAuth, allLecture)
    router_lecture.post('/create',checkAuth, createLecture)
    router_lecture.route('/updateStep/:idLecture').put(checkAuth, updateStep).delete(checkAuth, removeAddLecture)
    router_lecture.delete('/remove/:idLecture', checkAuth, removeLecture)
    router_lecture.put('/updateStepStatus/:idLecture', checkAuth , updateStepStatus )
    router_lecture.param('idLecture', paramLec)



    return router_lecture
}