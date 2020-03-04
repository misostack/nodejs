import express from 'express';
import { EnvironmentService, FirebaseService, LogService } from '../services'

var router = express.Router();
/* GET home page. */
router.get('/', async (req, res, next) => {
    try{

        let users = await Promise.resolve(FirebaseService.listAllUsers())        

        var tagline = "Users";

        res.render('pages/users', {
            appName: EnvironmentService.get('APP_ENV'),
            tagline: tagline,
            users: users,
        });
    }catch(err){
        LogService.logError(err)        
        res.error(err)
    }        
});

export default router;