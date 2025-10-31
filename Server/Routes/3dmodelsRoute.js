import { Router } from "express";
import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import { Model3D } from "../Models/modelSchema.js";
import upload from "../Middleware/upload.js";

const router = Router();

router.post("/upload3dModels", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { originalname, mimetype, buffer, size } = req.file;
    const { name, category, thumbnail } = req.body;

    const db = mongoose.connection.db;
    const modelBucket = new GridFSBucket(db, { bucketName: "models3d" });

    const uploadStream = modelBucket.openUploadStream(originalname, {
      contentType: mimetype,
    });
    const gridFsId = uploadStream.id;

    uploadStream.end(buffer);

    uploadStream.on("finish", async () => {
      const newModel3D = new Model3D({
        name: name || originalname,
        category: category || "",
        filename: originalname,
        fileSize: size,
        contentType: mimetype,
        gridFsId,
        thumbnailUrl: thumbnail || "",
        uploadDate: new Date(),
      });

      await newModel3D.save();

      res.status(201).json({
        id: newModel3D._id,
        gridFsId,
        message: "3D model uploaded successfully",
      });
    });

    uploadStream.on("error", (err) => {
      console.error("GridFS Upload Error:", err);
      res.status(500).json({ error: "GridFS upload failed" });
    });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/getAll3dModels", async (req, res) => {
  try {
    const list = await Model3D.find({}, { data: 0 }).sort({ uploadDate: -1 });

    if (list.length === 0) {
      return res.status(200).json({
        message: "No 3D models found",
        models: [],
      });
    }

    res.status(200).json({
      message: "3D models fetched successfully",
      models: list,
    });

  } catch (err) {
    console.error("Fetch all models error:", err);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});


router.get("/get3dModels/:id", async (req, res) => {
  try {
    const doc = await Model3D.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Model not found" });

    if (!doc.gridFsId) {
      return res.status(404).json({ error: "GridFS file reference missing" });
    }

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "models3d" });

    const downloadStream = bucket.openDownloadStream(new ObjectId(doc.gridFsId));

    res.set("Content-Type", doc.contentType);
    res.set("Content-Disposition", `inline; filename="${doc.filename}"`);

    downloadStream.pipe(res);

    downloadStream.on("error", (err) => {
      console.error("Error streaming GridFS file:", err);
      res.status(500).json({ error: "Error retrieving file from GridFS" });
    });
  } catch (error) {
    console.error("Error fetching model:", error);
    res.status(500).json({ error: "Error retrieving file from GridFS" });
  }
});

router.get("/get3dModelsFile/:id/file", async (req, res) => {
  try {
    const doc = await Model3D.findById(req.params.id, { data: 0 });
    if (!doc) return res.status(404).json({ error: "Model not found" });

    res.status(200).json({
      id: doc._id,
      name: doc.name,
      category: doc.category,
      filename: doc.filename,
      fileSize: doc.fileSize,
      uploadDate: doc.uploadDate,
      contentType: doc.contentType,
      gridFsId: doc.gridFsId,
      downloadUrl: `/api/models/get3dModels/${encodeURIComponent(doc._id)}`,
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

export { router };
