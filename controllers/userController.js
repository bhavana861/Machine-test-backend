// import usermodel
const users = require('../models/userModel')
// import bcrypt for password hashing
const bcrypt = require('bcryptjs')
// import validator
const validator = require('validator')
// import jwt token
const jwt = require('jsonwebtoken')

// registration logic
const registerController = async (req,res)=>{
  const {username,email,password,profilephoto} = req.body
    try{
        if(!username || !email || !password ) {
            return res.json("Missing Some Fileds")
        }
        // validating email 
        if(!validator.isEmail(email)) {
            return res.json("Enter valid email")
        }
        // validating a strong password
        if(password.length < 8) {
            return res.json("Enter a strong password")
        }

        // check if user already exists
        const existingUser = await users.findOne({ email })
        if(existingUser) {
          return res.status(406).json("User Already exist.Please Login...")
        }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

     // create new user
     const newUser = new users({
        username,email,password: hashedPassword,profilephoto: ""
      })
      await newUser.save()
      res.status(200).json(newUser)

    }catch(err) {
            console.error(err)
            res.status(401).json(err)
          }   
}



// login logic
const loginController = async (req, res) => {
  const {email, password} = req.body
   try{
    if(!email || !password) {
      return res.status(400).json("Please fill in all fields")
    }

    // check if user exists
    const existingUser = await users.findOne({ email })
    if(!existingUser) {
      return res.status(401).json("User not found,Register=>")
    }

    // compare password
    const isMatch = await bcrypt.compare(password, existingUser.password)
    if(!isMatch) {
      return res.status(401).json("Invalid credentials")
    }

    // create Access Token (expires in 15 minutes)
    const accessToken = jwt.sign({userId: existingUser._id},process.env.ACCESS_SECRT_KEY,{expiresIn: '15m'})

    // create Refresh Token (expires in 7 days)
    const refreshToken = jwt.sign({userId: existingUser._id},process.env.REFRESH_SECRT_KEY,{expiresIn: '7d'})

    // save refresh token to MongoDB
    existingUser.refreshtoken = refreshToken
    await existingUser.save()

    res.status(201).json({
      message: "Login successful",
      existingUser: {
        id: existingUser._id,
        username: existingUser.username,
        email:  existingUser.email,
        profilephoto: existingUser.profilephoto
      },
      accessToken,
      refreshToken
    })
  } catch (err) {
    res.status(401).json(err)
  }
}




// API for token refresh
const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body
  if(!refreshToken) {
    return res.status(401).json("Refresh token missing")
  }

  try{
    // find user with this refresh token
    const user = await users.findOne({ refreshtoken: refreshToken })
    if (!user) {
      return res.status(403).json("Invalid refresh token")
    }

    // verify refresh token
    jwt.verify(refreshToken, process.env.REFRESH_SECRT_KEY, (err, decoded) => {
      if(err){ 
        return res.status(403).json("Token expired or invalid")
      }

      // generate new access token
      const newAccessToken = jwt.sign({userId: decoded.userId},process.env.ACCESS_SECRT_KEY,{expiresIn: '15m'})

      res.status(200).json({ accessToken: newAccessToken })
    })
  }catch (err) {
    res.status(500).json(err)
  }
}


// user profile updation
const updateProfileController = async (req, res) => {
  const userIdFromToken = req.userId;
  const userIdToUpdate = req.params.id;

  if(userIdFromToken !== userIdToUpdate) {
    return res.status(403).json("Unauthorized:You can only update your own profile");
  }
  // multer will active in this route
  // 2. get text data from req.body, file data from req.file
  const {username,email,password,profilephoto} = req.body
  const uploadProfileImgFile = req.file?req.file.filename:profilephoto
  // 3. update user - findbyidandupdate
  try{
      const updateUser = await users.findByIdAndUpdate({_id:userIdToUpdate},{
          username,email,password,profilephoto:uploadProfileImgFile
      },{new:true})
      await updateUser.save()
      res.status(200).json(updateUser)
  }catch(err){
      res.status(401).json(err)
  }

};


// user profile deletion
const deleteProfileController = async (req, res) => {
  const userIdFromToken = req.userId;
  const userIdToDelete = req.params.id;

  // Allow deletion only if the user owns the profile
  if(userIdFromToken !== userIdToDelete) {
    return res.status(403).json("Unauthorized: You can only delete your own profile");
  }

  try{
    await users.findByIdAndDelete(userIdToDelete);
    res.status(200).json("Profile deleted successfully");
  } catch(err) {
    res.status(500).json(err);
  }
};


// blocking users
const blockUserController = async (req, res) => {
  const userId = req.userId
  const userToBlockId = req.params.id

  if(userId === userToBlockId) {
    return res.status(400).json("You cannot block yourself")
  }

  try{
    const user = await users.findById(userId)
    if (!user.blockedUsers.includes(userToBlockId)) {
      user.blockedUsers.push(userToBlockId)
      await user.save()
    }
    res.status(201).json("User blocked successfully")
  }catch (err) {
    res.status(501).json(err)
  }
}


// unblocking users
const unblockUserController = async (req, res) => {
  const userId = req.userId
  const userToUnblockId = req.params.id

  try {
    await users.findByIdAndUpdate(userId, {
      $pull: { blockedUsers: userToUnblockId }
    })
    res.status(201).json("User unblocked successfully")
  } catch (err) {
    res.status(501).json(err)
  }
}







module.exports = {registerController,loginController,refreshTokenController,updateProfileController,deleteProfileController,blockUserController,unblockUserController};











