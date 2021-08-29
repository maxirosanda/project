export const auth =(req,res,next)=>{
    if(req.isAuthenticated()) {
    
        res.status(200).redirect("/products")    

    } else {
        next()
}}