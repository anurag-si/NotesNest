import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notesSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  date_of_creation: {
    type: String,
  },
  date_of_updation: {
    type: String,
  },
});

const labelSchema = new Schema({
  label_type: {
    type: String,
  },
  label_name: {
    type: String,
  },
  notes: [notesSchema],
  pinned_notes: [notesSchema],
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
  label: [labelSchema],
});

export default mongoose.model("User", userSchema);
