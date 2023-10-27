import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'; // Remove 'version' and 'PDFJS'
// const PDFJS = window.pdfjsLib;
// GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;

const pdfjs = await import('pdfjs-dist/build/pdf');
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
async function loadPDFAndRenderOnScreen(
  selectedFile,
  setUri,
  setPdf,
  setTotalPages,
  setPdfPages,
  setLoading,
  showLogin
) {
  try {
    if (selectedFile) {
      setLoading(true); // Show loading message

      // Check for user existence and handle login
      if (!showLogin) {
        // Handle login logic if showLogin is false
        // ...
      }

      // Create a FormData object and append the PDF file to it
      const uri = URL.createObjectURL(selectedFile);
      setUri(uri);

      // Load PDF document
      const pdfData = await getDocument({ url: uri }).promise;

      setPdf(pdfData); // Set the PDF document object

      // Get the total number of pages in the PDF
      setTotalPages(pdfData.numPages);

      // Load individual pages and store them in the `pdfPages` state
      const loadedPages = [];

      for (let pageNumber = 1; pageNumber <= pdfData.numPages; pageNumber++) {
        const page = await pdfData.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 3.0 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        loadedPages.push(canvas.toDataURL("image/png"));
      }

      setPdfPages(loadedPages); // Set the loaded pages
      setLoading(false); // Hide loading message
    }
  } catch (error) {
    console.error("Error loading PDF:", error);
    setLoading(false); // Hide loading message in case of error
  }
}

export default loadPDFAndRenderOnScreen;
