import User from "../db/models/user.model.js";
import { convertBufferToBase64 } from "../utils/imageUtils.js"; 

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    
        const usersWithBase64Pic = users.map(user => ({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            profilePic: convertBufferToBase64(user.profilePic.data, user.profilePic.contentType)
        }));

        res.status(200).json(usersWithBase64Pic);
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

