import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notesSchema = new Schema({
  data: String
})

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
    type: [notesSchema]
  }
});

export default module.exports = mongoose.model("User", userSchema);