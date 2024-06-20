import bcrypt from "bcryptjs";
import User from "../db/models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { convertBufferToBase64 } from "../utils/imageUtils.js";


export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    const profilePic = req.file ;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);


    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: {
        data: profilePic.buffer,
        contentType: profilePic.mimetype
      },
    });

    await newUser.save();

    // Generate JWT token and set cookie
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    
    const { username, password } = req.body
    console.log("use",username)
    const user = await User.findOne({username});
    console.log("ooo",user)
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    console.log("ooo",user,"ttt",isPasswordCorrect)

    if(!user || !isPasswordCorrect) {
        return res.status(400).json({error: "Invalid username or password"})
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: convertBufferToBase64(user.profilePic.data, user.profilePic.contentType)
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
try {
    res.cookie("jwt", "",{ maxAge: 0});
    res.status(200).json({ message: "Logged out successfully"});
} catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}
};
