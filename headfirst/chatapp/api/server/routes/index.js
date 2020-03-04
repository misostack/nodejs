import express from 'express';
import { EnvironmentService, LogService } from '../services'

var router = express.Router();
/* GET home page. */
router.get('/', async (req, res, next) => {
    try{

        var drinks = [
            { name: 'Bloody Mary', drunkness: 3 },
            { name: 'Martini', drunkness: 5 },
            { name: 'Scotch', drunkness: 10 }
        ];
        var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

        res.render('pages/index', {
            appName: EnvironmentService.get('APP_ENV'),
            drinks: drinks,
            tagline: tagline
        });
    }catch(err){
        LogService.logError(err)  
        res.status(500).end()
    }        
});

export default router;