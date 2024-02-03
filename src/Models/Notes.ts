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

export default mongoose.model("Notes", notesSchema);
