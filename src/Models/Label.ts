import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const labelSchema = new Schema({
  label_type: {
    type: String,
    required: true,
  },
  label_name: {
    type: String,
    required: true,
  },
  notes: {
    type: ObjectId,
    ref: "notes",
  },
});

export default module.exports = mongoose.model("Label", labelSchema);
