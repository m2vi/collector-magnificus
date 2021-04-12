import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema({any: Schema.Types.Mixed}, {strict: false, collection: "item"});

export default mongoose.models.items || mongoose.model("items", itemSchema);
