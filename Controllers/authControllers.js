import getDataUrl from "../utils/urlGenrator.js";
import bcrypt from "bcrypt"
import cloudinary from "cloudinary"
import generateToken from "../utils/tokenGenrator.js";
export const registerUser = async (req, res) => {
    try {
        const { name, email, password,gender} = req.body;
        const file = req.file;
        if( !name|| !email|| !password||!gender ||!file){
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({ message: "User Already Exist" }); 
        }
        const fileUrl = getDataUrl(file);
        const hashedPassword = await bcrypt.hash(password, 10);
        const mycloud = cloudinary.v2.uploader.upload(fileUrl.content)
        user = await User.create({
            name,
            email,
            password : hashedPassword,
            gender,
            profilePic:{
                id: mycloud.public_id,
                url: mycloud.secure_url,
            },
        })
        generateToken(user._id,res)
        res.status(201).json({
            message: "User Created Successfully",
            user: user

        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}