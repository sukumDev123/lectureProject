
import express from 'express'
import { removeLecture, createLecture, stepAddLecture, paramLec, allLecture, removeAddLecture , updateStep } from '../controllers/lecture_controller'
import { checkAuth } from '../../checkAuth'



export function lectureRoute() {
    const router_lecture = express()

    router_lecture.get('/all', checkAuth, allLecture)
    router_lecture.post('/create',checkAuth, createLecture)
    router_lecture.route('/stepAdd/:idLecture').put(checkAuth, stepAddLecture).delete(checkAuth, removeAddLecture)
    router_lecture.delete('/remove/:idLecture', checkAuth, removeLecture)
    router_lecture.put('/updateStep/:idLecture', checkAuth , updateStep )
    router_lecture.param('idLecture', paramLec)



    return router_lecture
}