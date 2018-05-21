'use strict';
import express from 'express';
import * as uedit from '../controllers/userEdit';
import { checkAuth } from '../../checkAuth';
export function userEdit(){
    const router = express.Router();

    router.post('/edit/information' , checkAuth , uedit.UserEdit  );
    
    return router;
}