
module.exports=function (req,res,next){

    if (!req.cookies) {
        return res.sendStatus(401);
     }

    try{
        req.user=sid;
        next();
    }catch(err){
        console.log("丢出错误")
        res.status(401).json({msg:'Token is not valid'});
    }

}