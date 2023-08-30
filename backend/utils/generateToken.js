import jwt from 'jsonwebtoken'


const generateToken = (res,userId) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'30d'})
    
    
    //Set jwt as HTTP-Only cookie
    res.cookie('jwt',token,{
        httpOnly:true, 
        secure:process.env.NODE_ENV !== 'development', // if it is not in development, ie, it is in production, then it will be set to true.(https)
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000 // '30d'
    })

}

export default generateToken


