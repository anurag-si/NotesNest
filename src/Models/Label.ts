import mongoose from "mongoose";

const Schema = mongoose.Schema;

const labelSchema = new Schema({
  label_type: {
    type: String,
  },
  label_name: {
    type: String,
  },
  notes: [{ type: Schema.Types.ObjectId, ref: "Notes" }],
  pinned_notes: [{ type: Schema.Types.ObjectId, ref: "Notes" }],
});

export default mongoose.model("Label", labelSchema);
