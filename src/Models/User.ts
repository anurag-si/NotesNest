import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notesSchema = new Schema({
  data: String,
});

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
  notes: [
    {
      _id: false, // This line tells Mongoose not to generate ObjectId for this subdocument
      note: String,
      // other fields in your notes subdocument
    },
  ],
});

export default module.exports = mongoose.model("User", userSchema);
