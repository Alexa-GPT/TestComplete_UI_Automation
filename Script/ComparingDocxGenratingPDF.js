function CompareDocxFilesAndGeneratePDF() {
  // Paths to the DOCX files
  var file1Path = "C:\\Users\\wisse\\Documents\\fileComparison\\DOCX\\New_Demo_File_French.docx";
  var file2Path = "C:\\Users\\wisse\\Documents\\fileComparison\\DOCX\\New Demo File_fr.docx";
  var resultFilePath = "C:\\Users\\wisse\\Documents\\fileComparison\\DOCX\\resultFile.docx";
  var pdfOutputPath = "C:\\Users\\wisse\\Documents\\fileComparison\\DOCX\\comparison.pdf";
  
  // Create Word application object
  var wordApp = Sys.OleObject("Word.Application");
  wordApp.Visible = false; // Run Word in the background

  try {
    // Open the first document
    var doc1 = wordApp.Documents.Open(file1Path);
    // Open the second document
    var doc2 = wordApp.Documents.Open(file2Path);

    // Compare the two documents
    var comparisonDoc = wordApp.CompareDocuments(doc1, doc2);
    comparisonDoc.SaveAs(resultFilePath);
    
    // Close the documents
    doc1.Close(false);
    doc2.Close(false);

    // Save the comparison as PDF
    comparisonDoc.SaveAs(pdfOutputPath, 17); // 17 is the format for PDF

    // Close the comparison document
    comparisonDoc.Close(false);
  } catch (e) {
    Log.Error("An error occurred: " + e.message);
  } finally {
    // Quit the Word application
    wordApp.Quit();
  }

  Log.Message("Comparison complete. PDF file generated at: " + pdfOutputPath);
}
