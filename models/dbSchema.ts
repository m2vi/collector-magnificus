import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  isActive: {
    type: Boolean,
    required: false,
    unique: false,
    default: true,
  },
  isAccountVerified: {
    type: Boolean,
    required: false,
    unique: false,
    default: false,
  },
  username: {
    type: String,
    required: [true, "Enter a valid username."],
    unique: true,
    trim: true,
    maxlength: [40, "Username cannot be longer than 40 chars."],
  },
  password: {
    type: String,
    required: [true, "Enter a valid password."],
    unique: false,
    trim: true,
  },
  accountCreated: {
    type: Number,
    required: false,
    unique: false,
    trim: true,
    default: new Date().getTime(),
  },
  image_url: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    default: "%placeholder_account_image%",
  },
});

export default mongoose.models.users || mongoose.model("users", userSchema);
