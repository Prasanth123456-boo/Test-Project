import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import loadPDFAndRenderOnScreen from "../functions/uploadAndShow"
import downloadPDF from '../functions/downLoad';
import { useNavigate } from 'react-router-dom';
import handleSelectedPages from '../functions/handleSelectedPages';
import { Document, Page } from 'react-pdf';
import "./css/Home.css"
import Button from 'react-bootstrap/Button';
import { CaretRightFill, CaretLeftFill } from "react-bootstrap-icons";
import Form from 'react-bootstrap/Form';
import axios from "axios"


const Home = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedPages, setSelectedPages] = useState([])
  const [uri, setUri] = useState('');
  const [showLogin, setShowLogin] = useState(true)
  const [selectedSavedPdf, setSelectedSavedPdf] = useState('')
  const [isFromBackend, setIsFromBackend] = useState(false)


  useEffect(() => {
    const load = async () => {
      try {
        if (selectedFile) {
          setLoading(true);
          setIsFromBackend(false)
          // Show loading message

          await loadPDFAndRenderOnScreen(selectedFile, setUri, setPdf, setTotalPages, setPdfPages, setLoading, showLogin, setShowLogin)
        }
      } catch (error) {
        setLoading(false); // Hide loading message in case of error
      }
    }
    load()
  }, [selectedFile]);

  const handleDownload = async () => {

    await downloadPDF(selectedPages, uri)
  }
  const handleFileChange = (e) => {
    // ensures previous settings dont mess with new uploads
    setCurrentPage(1)
    setPdf(null)
    setPdfPages([])
    setSelectedPages([])
    setTotalPages(0)

    const file = e.target.files[0];
    console.log("file: " + file, e.target)
    setSelectedFile(file);
    e.preventDefault()
  };


  async function handleUpload() {
    setSelectedSavedPdf('');

    if (!selectedFile) {
      Toast({ title: 'Select a file...', duration: 3000, isClosable: true, status: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await axios.post("http://localhost:7000/pdf/pdfupload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',

        },
        withCredentials: false,
      });

      const savedPdfData = response.data;

      if (response.status === 201) {


        const token = id.token;
        localStorage.removeItem('userid');
        const newUser = savedPdfData.message;
        newUser.token = token;
        localStorage.setItem('user', JSON.stringify(newUser));
        user = savedPdfData.message;



      } else {
        console.log("error");
      }
    } catch (err) {
      console.error(err, 'error uploading');

    }
  }

  // changes selected page
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  function isPageSelected(currentPage, selectedPages) {
    if (!selectedPages) return false
    for (let x = 0; x < selectedPages.length; x++) {
      if (selectedPages[x] == currentPage) return true
    }
    return false
  };

  return (
    <div>
      <Navbar />
      <p className='mainHead'>Extract PDF file</p>
      <p className='subHead'>Separate one page or a whole set for easy conversion into Single PDF files.</p>

      <label for="images" class="drop-container" id="dropcontainer">
        <span className="drop-title">Drop files here</span>
        or
        <input className='input-file' name='pdfFile' type="file" id="images" onChange={handleFileChange} accept="pdf/*" required />
      </label>

      {loading && <p>Loading...</p>}

      {pdfPages.length > 0 && !loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className='pdf-display '>
            <p className='pdf-head'>Select page You want to download</p>
            <div className='d-flex justify-content-center align-items-center'>
              <button onClick={() => goToPage(currentPage - 1)} className='cont-btn'><CaretLeftFill style={{ fontSize: "30px" }} /></button>

              <div className='position-relative'>
                <img
                  className='pdf-image '
                  src={pdfPages[currentPage - 1]}
                  alt={`Page ${currentPage}`} />


                <Form.Check
                  style={{

                    position: "absolute",
                    borderColor: "black",
                    top: "4%",
                    right: "7%",

                    backgroundColor: "white",
                    color: "green",
                  }} aria-label="option 1"
                  onChange={(e) => {

                    handleSelectedPages(e.target.checked, selectedPages, currentPage, setSelectedPages)

                  }}
                  checked={isPageSelected(currentPage, selectedPages)}
                  id="custom-checkbox" />

              </div>
              <button onClick={() => goToPage(currentPage + 1)} className='cont-btn'><CaretRightFill style={{ fontSize: "30px" }} /></button>
            </div>
            <div>
              <label htmlFor="pageNumber" style={{ fontSize: "18px", fontWeight: "bold", marginLeft: "20px", marginRight: "15px", color: "#fff", marginTop: "20px" }}>{"Page number:    "}</label>      <select my="8" mx="5" style={{ fontSize: "18px", fontWeight: "bold", border: "1px solid black", borderColor: "black", padding: "6px" }} onChange={(e) => setCurrentPage(Number(e.target.value))} value={currentPage} id="pageNumber">
                {
                  pdfPages.map((page, i) => <option key={i} value={i + 1}>{i + 1}</option>)
                }
              </select>
            </div>
          </div>
        </div>




      )}
      <div className='center-container1'>
        <button
          style={{
            display: selectedPages.length ? "block" : "none",

          }}
          className='dwd-btn'
          onClick={handleDownload}
        >
          <span>
            Generate New PDF
          </span>
        </button>
      </div>


    </div>
  )
}



export default Home
