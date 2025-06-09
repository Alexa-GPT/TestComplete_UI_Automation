function CompareDocxFiles() {
  // Paths to the DOCX files
  var file1Path = "C:\\Users\\wisse\\Documents\\fileComparison\\DOCX\\New_Demo_File_French.docx";
  var file2Path = "C:\\Users\\wisse\\Documents\\fileComparison\\DOCX\\New Demo File_fr.docx";
  var resultFilePath = "C:\\Users\\wisse\\Documents\\fileComparison\\DOCX\\resultFile.docx";
  var htmlOutputPath = "C:\\Users\\wisse\\Documents\\fileComparison\\DOCX\\comparison.html";
  
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

    // Save the comparison as HTML with images and formatting
    comparisonDoc.SaveAs(htmlOutputPath, 8); // 8 is the format for HTML
    
    // Ensure images are saved
    var filteredHtmlPath = htmlOutputPath.replace(".html", "_filtered.html");
    comparisonDoc.SaveAs(filteredHtmlPath, 10); // 10 is the format for Filtered HTML

    // Close the comparison document
    comparisonDoc.Close(false);
  } catch (e) {
    Log.Error("An error occurred: " + e.message);
  } finally {
    // Quit the Word application
    wordApp.Quit();
  }

  Log.Message("Comparison complete. HTML file generated at: " + htmlOutputPath);
}







