import jwt from "jsonwebtoken";
const generateToken =(id,res)=>{
    const token = jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"15"});
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:15*24*60*60*1000,
        sameSite :"strict"

    })

}
export default generateToken