
export const auth =(req,res,next)=>{
    if(req.isAuthenticated()) {
    if( req.user.type=="admin" ){
        next()
    }else{
        res.status(200).render("nofound",{message:"Usted no es Administrador"})
    }
    } else {
        res.status(200).redirect("/login")
}}