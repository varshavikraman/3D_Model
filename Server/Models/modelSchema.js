import { Schema, model } from "mongoose";

const modelSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String },
  filename: String,
  originalName: String,
  filePath: String,
  fileSize: Number,
  contentType: String,
  gridFsId: { type: Schema.Types.ObjectId, required: true },
  thumbnailUrl: { type: String }, 
  uploadDate: { type: Date, default: Date.now }
});

const Model3D = model('Model3D', modelSchema);

export { Model3D };
