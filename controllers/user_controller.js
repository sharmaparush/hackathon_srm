const User=require('../models/user');
module.exports.profile=function(req,res)
{
   
        console.log(req.user);
        return res.render('user_profile',{t:{profile_user:req.user}});
}
   
    


module.exports.signUp=function(req,res){
    
    return res.render('signup',{title:"sign Up"});
}
module.exports.signIn=function(req,res){
    
    return res.render('login',{title:"login"});
}
//get the sign up data

module.exports.create=function(req,res){
    
    if(req.body.password!=req.body.confirm_password){
        req.flash('error','Password mismatch');
        return res.redirect('back');
    }
     User.findOne({email:req.body.email}).then (user=>{
        
        if(!user){
            User.create(req.body).then (user=>{
                req.flash('success','profile created successfully');
                return res.redirect('/users/sign-in');
            })
        }
        else
        {
            
            return res.redirect('back');
        }
    })
    
    
}
//sign in and create a session for the user
module.exports.createSession=function(req,res){
req.flash('success','logged in successfully');
return res.redirect('/users/profile');

}
module.exports.destroySession=function(req,res){
req.logout(function(err){
    req.flash('success','Logged out succesfully');
return res.redirect('/');
});




}
module.exports.update=async function(req,res){
    
    if(req.user.id==req.params.id)
    {
        
        try{
       let user=await User.findById(req.params.id);
           User.uploadedAvatar(req,res,function(err){
            user.name=req.body.name;
            user.email=req.body.email;
            
            user.save();
            return res.redirect('back');
           })
           
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }

}