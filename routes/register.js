import {Router} from 'express';
const router = Router();
import * as userData from '../data/users.js';
import * as helper from '../helpers.js';

router
    .route('/register')
    .get(async (req, res) => {
        try{
            res.render('register', {
                layout: 'main',
                nav: 'publicNav'
            });
        } catch(e){
            return res.status(404).render('errors', {
                layout: 'main',
                nav: 'publicNav',
                message: e
            });
        };
    })
    .post(async (req, res) => {
        const userInput = req.body;
        let errors = {};

        //Validate First Name
        try{
            userInput.firstName = helper.checkIsProperFirstOrLastName(userInput.firstName, 'First name');
        } catch(e){
            errors.firstName = e;
        }

        //Validate Last Name
        try{
            userInput.lastName = helper.checkIsProperFirstOrLastName(userInput.lastName, 'Last name');
        } catch(e) {
            errors.lastName = e;
        };

        //Validate City
        try{
            userInput.city = helper.checkCity(userInput.city);
        } catch(e) {
            errors.city = e;
        };

        //Validate State
        try{
            if(!checkIsValidState(userInput.state)){
                errors.state = "Error: State is not valid.";
            }
        }catch(e){
            errors.state = e;
        };

        //Validate Desired Position
        try{
            if(userInput.desiredPosition){
                userInput.desiredPosition = helper.checkIsProperString(userInput.desiredPosition, 'Desired position');
            } 
        }catch(e){
            errors.desiredPosition = e;
        };

        //Validate Dream Job
        try{
            if(userInput.dreamJob){
                userInput.dreamJob = helper.checkIsProperString(userInput.dreamJob, 'Dream job');
            }
        }catch(e){
            errors.dreamJob = e;
        };

        //Validate Email
        try{
            userInput.email = helper.validateEmail(userInput.email);
        }catch(e){
            errors.email = e;
        };

        //Validate Password 
        try{
            userInput.password = helper.checkPassword(userInput.password);
        }catch(e){
            errors.password = e;
        };

        //Validate Confirm password
        try{
            userInput.confirmPassword = helper.checkPassword(userInput.confirmPassword);
            if(userInput.password !==  userInput.confirmPassword){
                errors.confirmPassword = "Error: Password and Confirm Password do not match. Please try again.";
            }
        }catch(e){
            errors.confirmPassword = e;
        };

        //Check for Errors; if errors, respond with status 400
        if(Object.keys(errors).length !== 0){
            res.status(400).render('register', {
                errors: errors,
                user: userInput,
            });
            return;
        }

        //Register User
        try{
            const registerUser = await userData.registerUser(
                userInput.firstName,
                userInput.lastName,
                userInput.city,
                userInput.state,
                userInput.desiredPosition,
                userInput.dreamJob,
                userInput.email,
                userInput.password
            );
            if(registerUser.signupCompleted){
                res.render('login', {
                    layout:'main',
                    nav: 'publicNav'
                });
            } else{
                res.status(500).render('error', {
                    layout: 'main',
                    nav: 'publicNav',
                    message: 'Internal Server Error'
                });
            }
        }catch(e){
            res.status(400).render('error', {
                layout: 'main',
                nav: 'publicNav',
                message: e
            });
        };
    });

    export default router;
