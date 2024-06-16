import { User } from "../users/users.model.js";
import { Follower } from "./followers.model.js";

export const postFollowUserCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;
    const { followedUserId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json("User not found. Please register.");

    const followedUser = await User.findById(followedUserId);
    if (!followedUser) return res.status(400).json("Could not follow user. User does not exist.");

    const alreadyfollowed = await Follower.findOne({ userId, followedUserId });
    if (alreadyfollowed) return res.status(400).json("You already follow this user.");

    await Follower.create({ userId, followedUserId });
    res.json({ userId, followedUserId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not follow user." });
  }
};
