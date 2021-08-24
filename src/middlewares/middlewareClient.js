export const auth =(req,res,next)=>{
  if(req.isAuthenticated()) {
  if(req.user.type=="client" || req.user.type=="admin" ){
      next()
  }else{
      res.redirect("/login") 
  }
  } else {
   res.redirect("/login")
}}