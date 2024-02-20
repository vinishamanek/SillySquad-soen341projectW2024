var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('./db');
var User = require('../models/User')


module.exports=function(passport){
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, cb) => {
        try {
            console.log("Beginning of Auth..");
            const user = await User.findOne({ email: email });
    
            if (!user) {
                return cb(null, false, { message: 'Incorrect email or password.' });
            }
    
            const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256');
            if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect email or password.' });
            }
    
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }
    ));
    
    passport.serializeUser(function(user,cb){
        process.nextTick(function(){
            cb(null,{id: user._id, email: user.email});
        });
    });
    
    passport.deserializeUser(function(user,cb){
        process.nextTick(function(){
            return cb(null,user)
        })
    })

}