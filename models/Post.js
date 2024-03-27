import mongoose from "mongoose";

const PostScheme = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
      min: 3,
      max: 30,
    },
    lastName: {
      type: String,
      require: true,
      min: 3,
      max: 30,
    },
    location: String,
    descrption: String,
    picturePath: String,
    userPicturePath: String,
    likes: { type: Map, of: Boolean },
    coments: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostScheme);
export default Post;
