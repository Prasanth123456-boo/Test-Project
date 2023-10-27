import Pdf from "../models/pdf.js"
import mongoose from "mongoose"




export const createpdf = async (req, res) => {
    try {
      const pdfobject = {
        pdf:req.file.buffer,
        user:req.user._id,
        fileName:req.file.originalname
      }
     
      const newPdf = await Pdf.create(pdfObject);
      req.user.pdfs.push({_id:newPdf._id,createdAt:newPdf.createdAt,fileName:newPdf.fileName})
      await req.user.save()
      console.log("req.user",req.user)
      req.user.pdfs.reverse()
      return res.status(201).send({message:req.user})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    };
  