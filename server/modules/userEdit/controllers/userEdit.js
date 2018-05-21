

export class UserEdit {
    editInformation(req,res){
        if(req.user){
            let user = req.user;
            user.set('firstname' , req.body.firstname );
            user.set('lastname' , req.body.lastname );
            
        }
    }
}