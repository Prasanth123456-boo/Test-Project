import { createpdf } from "../controller/pdf.controller.js";
import multer from "multer";
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });
import express from "express"


const router = express.Router()

router.post('/pdfupload',upload.single("file"),createpdf);


export default router;