const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},function(req,email,password,done){
//find a user and establish the identity
    User.findOne({email:email}).then(user=>{
        
        if(!user||user.password!=password)
        {
            req.flash('error',"Invalid username/password");
            return done(null,false);
        }
        req.flash('success','Signed in Successfully');
        return done(null,user);
    })
}));
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id).then(user=>{
     
     return done(null,user);
    })
})
//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if the user is signed in then pass the request to next function that is controller's action
    if(req.isAuthenticated()){
     return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;