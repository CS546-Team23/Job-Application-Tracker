import {Router} from 'express';
const router = Router();
import * as userData from '../data/users.js';
import * as helper from '../helpers.js';

router
    .route('/login')
    .get(async (req, res) => {
        try{
            res.render('login', {layout: 'main'});
        }catch(e){
            return res.status(404).render('errors', {
                layout: 'main',
                message: e
            });
        };
    })
    .post(async (req, res) => {
        const userInput  = req.body;
        let errors = {};

        //Validate email
        try{
            userInput.email = helper.validateEmail(userInput.email);
        }catch(e){
            errors.email = e;
        };

        //Validate password
        try{
            userInput.password = helper.checkPassword(userInput.password);
        }catch(e){
            errors.password = e;
        };

        //Check for errors; if errors, respond with status 400
        if(Object.keys(errors).length !== 0){
            res.status(400).render('login',{
                layout: 'main',
                errors: errors
            });
        }

        //Login in user
        try{
            const loginUser = await userData.loginUser(
                userInput.email,
                userInput.password
            );
            if(loginUser){
                req.session.user = {
                    firstName: loginUser.firstName,
                    lastName: loginUser.lastName,
                    city: loginUser.city,
                    state: loginUser.state,
                    desiredPosition:loginUser.desiredPosition,
                    dreamJob: loginUser.dreamJob,
                    email: loginUser.email
                };
                res
                    .cookie('AuthenticationState', 'Authenticated')
                    .redirect('/dashboard');
            } else {
                res.status(400).render('login', {
                    layout: 'main',
                    message: 'Incorrect username and/or password. Please try again.'
                });
            }
        }catch(e){
            res.status(400).render('error', {
                layout: 'main',
                message: e
            });
        };
    });

    export default router;