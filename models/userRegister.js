import mongoose from "mongoose";

const registerModal = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});
const userSchema =
  mongoose.models.users || mongoose.model("users", registerModal);

export default userSchema;
