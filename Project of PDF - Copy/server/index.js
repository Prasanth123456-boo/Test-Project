import express from "express"
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import Auth from "./router/Auth.router.js"
import pdf from "./router/pdf.router.js"
import fs from "fs"
import path from "path";
import multer from "multer";

dotenv.config();
const app = express();

app.use(express.json());



app.use((req, res, next) => {
  
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST, PATCH, DELETE, OPTIONS");
  next();
});

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });


app.post('/uploadPDF', upload.single('pdfFile'), (req, res) => {
    const pdfBuffer = req.file.buffer; // Access the uploaded PDF as a Buffer
    dataExisting = pdfBuffer
    
    res.status(200).send('PDF file received and processed on the server');
  });
  app.get('/getfile', (req, res) => {
      const filePath = path.join(__dirname, "public", 'sample.pdf'); // Replace 'yourfile.ext' with your actual file name and extension
    
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error reading the file');
        } else {
          const buffer = Buffer.from(dataExisting||data, 'utf-8');
           
          res.status(200).send(buffer);
        }
      });
    });
    app.get("/",(req,res)=>{
        res.status(200).send("reached")
    })


app.use(cors());

app.use("/auth",Auth)
app.use("/pdf",pdf)



const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}|| Connected To Database Succesfully`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });