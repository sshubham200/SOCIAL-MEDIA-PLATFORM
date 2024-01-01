const { response } = require('express');
const User = require('../models/user');

module.exports.profile = function (req,res){
   
    // if(req.cookies.user_id){
        // User.findById(req.cookies.user_id,function(err,user){
        //     if(user){
        //         return res.render('user_profile',{
        //             title : "Profile",
        //             user : user
        //         })
        //     }
        //     else res.redirect('../users/sign-in');
        // })
        if(req.isAuthenticated()){
            return res.render('user_profile',{
                            title : "Profile"
        })
    }
    else {
        return res.redirect('../users/sign-in');
    }
    
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated() ){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title : "Sign-Up" 
    });
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated() ){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title : "Sign-In"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log("failed here ....!")
        return res.redirect('back');
    }  

    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('error in finding the user');return;}

        if(!user){
            User.create(req.body, function(err,body){
                if(err){console.log('error in finding the user');return}
                console.log("redirecting...");
                return res.redirect('../users/sign-in');
            })
        }
        
        else {
            alert('Email already exists');z
            console.log("user exists");
            return res.redirect('back');}
    })
    }
/*
//get the sign in data
module.exports.createSession = function(req,res){
    //find the user
    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('error in finding the user');return;}
        //handle user found
        res.cookie('user_id',user.id);
        return res.redirect('../users/profile');

        if(user){
             //handle pasword which don't match
             if(user.password != req.body.password){
                 return res.redirect('back');
             }
              //handle session creation
        }
    })
    //handle user not found
}
*/
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.signOut =function(req,res){
    
    User.findById(req.cookies.user_id,function(err,user){
        if(err){console.log(err); return ;
        }
        if(user){
            res.cookie('user_id','');
            req.cookies.user_id = "";
            return res.redirect('../users/sign-in');
            }
        })
    
}

module.exports.destroySession=function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
    });
       return res.redirect('/');
}


