// Main function to compare files and log differences in HTML
function compareFilesAndLogDifferences() {
  const prodFilePath = "C:\\Users\\wisse\\Documents\\fileComparison\\New_Demo_File_French.docx";
  const betaFilePath = "C:\\Users\\wisse\\Documents\\fileComparison\\New Demo File_fr.docx";
  const outputFilePath = "C:\\Users\\wisse\\Documents\\fileComparison\\differences.html";
  
  
  //txt_TM_TB_sample_EN_Beta.txt
  //txt_TM_TB_sample_EN_Prod.txt
  
  //New_Demo_File_French.docx
  //New Demo File_fr.docx     
   
  //csv_sample_EN_French.csv 
  //csv_sample_EN_fr.csv
  
  
  //xlsx_sample_EN_fr.xlsx
  //xlsx_sample_EN_French.xlsx
  
  //pptx_sample_EN_French.pptx
  //pptx_sample_EN_fr.pptx
  
  //pptx_sample_EN_French.potx
  //pptx_sample_EN_fr.potx
  
  //prioritze docx and pptx
  
  
  
  

  const prodFileExtension = getFileExtension(prodFilePath);
  const betaFileExtension = getFileExtension(betaFilePath);

  if (prodFileExtension !== betaFileExtension) {
    Log.Error("Files have different extensions.");
    return;
  }

  try {
    switch (prodFileExtension) {
      case "docx":
        compareWordFiles(prodFilePath, betaFilePath, outputFilePath);
        break;
      case "xlsx":
        compareExcelFiles(prodFilePath, betaFilePath, outputFilePath);
        break;
      case "txt":
        compareTextFiles(prodFilePath, betaFilePath, outputFilePath);
        break;
      case "csv":
        compareCSVFiles(prodFilePath, betaFilePath, outputFilePath);
        break;
      case "pptx":
      case "potx":
        comparePowerPointFiles(prodFilePath, betaFilePath, outputFilePath);
        break;
      default:
        Log.Error("Unsupported file extension.");
    }
  } catch (e) {
    Log.Error("Error comparing files: " + e.message);
  }
}


// Function to find differences between two strings
function findDifferences(text1, text2) {
  const differences = [];
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');

  const maxLength = Math.max(lines1.length, lines2.length);

  for (let i = 0; i < maxLength; i++) {
    const line1 = lines1[i] || '';
    const line2 = lines2[i] || '';

    if (line1 !== line2) {
      differences.push({
        line: i + 1,
        prod: line1,
        beta: line2
      });
    }
  }

  return differences;
}

// Helper function to get file extension
function getFileExtension(filePath) {
  return filePath.split('.').pop().toLowerCase();
}

// Function to compare text files
function compareTextFiles(prodFilePath, betaFilePath, outputFilePath) {
  const fs = Sys.OleObject("Scripting.FileSystemObject");

  try {
    const prodFile = fs.OpenTextFile(prodFilePath, 1);
    const betaFile = fs.OpenTextFile(betaFilePath, 1);

    const text1 = prodFile.ReadAll();
    const text2 = betaFile.ReadAll();

    prodFile.Close();
    betaFile.Close();

    const differences = findDifferences(text1, text2);

    logDifferencesToHTML(differences, outputFilePath, prodFilePath, betaFilePath);

    Log.Message("Text files compared successfully and differences logged to " + outputFilePath);
  } catch (e) {
    Log.Error("Error comparing text files: " + e.message);
  }
}

// Function to compare CSV files
function compareCSVFiles(prodFilePath, betaFilePath, outputFilePath) {
  const fs = Sys.OleObject("Scripting.FileSystemObject");

  try {
    const prodFile = fs.OpenTextFile(prodFilePath, 1);
    const betaFile = fs.OpenTextFile(betaFilePath, 1);

    const prodContent = prodFile.ReadAll();
    const betaContent = betaFile.ReadAll();

    prodFile.Close();
    betaFile.Close();

    const prodLines = prodContent.split("\n");
    const betaLines = betaContent.split("\n");

    const differences = [];
    const maxLength = Math.max(prodLines.length, betaLines.length);

    for (let i = 0; i < maxLength; i++) {
      const prodLine = prodLines[i] || '';
      const betaLine = betaLines[i] || '';

      if (prodLine !== betaLine) {
        const prodCells = prodLine.split(",");
        const betaCells = betaLine.split(",");

        for (let j = 0; j < Math.max(prodCells.length, betaCells.length); j++) {
          const prodCell = prodCells[j] || '';
          const betaCell = betaCells[j] || '';

          if (prodCell !== betaCell) {
            differences.push({
              row: i + 1,
              column: j + 1,
              prod: prodCell,
              beta: betaCell
            });
          }
        }
      }
    }

    logDifferencesToHTML(differences, outputFilePath, prodFilePath, betaFilePath);

    Log.Message("CSV files compared successfully and differences logged to " + outputFilePath);
  } catch (e) {
    Log.Error("Error comparing CSV files: " + e.message);
  }
}

// Function to log differences to HTML with highlighting for differing words
function logDifferencesToHTML(differences, outputFilePath, prodFilePath, betaFilePath) {
  const fso = Sys.OleObject("Scripting.FileSystemObject");
  const outputFile = fso.CreateTextFile(outputFilePath, true);

  let htmlContent = `
    <html>
    <head>
      <title>Differences Report</title>
      <style>
        .highlight { background-color: yellow; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid black; padding: 8px; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
    <h1>Differences Report</h1>
    <p>Comparing files:</p>
    <ul>
      <li>Production file: ${prodFilePath}</li>
      <li>Beta file: ${betaFilePath}</li>
    </ul>
    <table>
    <tr><th>Line/Row</th><th>Column</th><th>Production</th><th>Beta</th></tr>
  `;

  differences.forEach(diff => {
    if (diff.line !== undefined) { // for text files
      htmlContent += `
        <tr>
          <td>${diff.line}</td>
          <td>-</td>
          <td>${highlightDifferences(diff.prod, diff.beta)}</td>
          <td>${highlightDifferences(diff.beta, diff.prod)}</td>
        </tr>
      `;
    } else if (diff.row !== undefined && diff.column !== undefined) { // for CSV files
      htmlContent += `
        <tr>
          <td>${diff.row}</td>
          <td>${diff.column}</td>
          <td>${highlightDifferences(diff.prod, diff.beta)}</td>
          <td>${highlightDifferences(diff.beta, diff.prod)}</td>
        </tr>
      `;
    }
  });

  htmlContent += `
    </table>
    </body>
    </html>
  `;

  outputFile.Write(htmlContent);
  outputFile.Close();
}

// Function to highlight differences between two strings
function highlightDifferences(text1, text2) {
  // Split text into words
  const words1 = text1.split(/\s+/);
  const words2 = text2.split(/\s+/);

  let highlightedText = '';

  // Compare words and highlight differences
  for (let i = 0; i < Math.max(words1.length, words2.length); i++) {
    const word1 = words1[i] || '';
    const word2 = words2[i] || '';

    if (word1 !== word2) {
      highlightedText += `<span class="highlight">${word1}</span> `;
    } else {
      highlightedText += `${word1} `;
    }
  }

  return highlightedText.trim();
}

// Function to compare Word files
function compareWordFiles(prodFilePath, betaFilePath, outputFilePath) {
  let wordApp, doc1, doc2;

  try {
    // Initialize Word application
    wordApp = Sys.OleObject("Word.Application");
    wordApp.Visible = false;

    // Open the production and beta documents
    doc1 = wordApp.Documents.Open(prodFilePath);
    doc2 = wordApp.Documents.Open(betaFilePath);

    // Get the text content of both documents
    const text1 = doc1.Content.Text;
    const text2 = doc2.Content.Text;

    // Compare the text content
    const differences = findDifferencesDocx(text1, text2);

    // Log the differences to HTML with highlighting
    logDifferencesToHTML_DocxVersion(differences, outputFilePath, prodFilePath, betaFilePath);

    Log.Message("Word documents compared successfully and differences logged to " + outputFilePath);
  } catch (e) {
    Log.Error("Error comparing Word files: " + e.message);
  } finally {
    if (doc1) {
      doc1.Close(false);
    }
    if (doc2) {
      doc2.Close(false);
    }
    if (wordApp) {
      wordApp.Quit();
    }
  }
}

// Function to find differences between two strings
function findDifferencesDocx(text1, text2) {
  const differences = [];
  const lines1 = text1.split('\r');
  const lines2 = text2.split('\r');

  const maxLength = Math.max(lines1.length, lines2.length);

  for (let i = 0; i < maxLength; i++) {
    const line1 = lines1[i] || '';
    const line2 = lines2[i] || '';

    if (line1 !== line2) {
      differences.push({
        line: i + 1,
        prod: line1,
        beta: line2
      });
    }
  }

  return differences;
}


// Function to log differences to an HTML file
function logDifferencesToHTML_DocxVersion(differences, outputFilePath, prodFilePath, betaFilePath) {
  const fs = Sys.OleObject("Scripting.FileSystemObject");
  const outputFile = fs.CreateTextFile(outputFilePath, true);

  outputFile.WriteLine("<html><head><title>Differences Report</title></head><body>");
  outputFile.WriteLine("<h1>Differences Report</h1>");

  // Add filenames being compared
  outputFile.WriteLine(`<p><strong>Production File:</strong> ${extractFileName(prodFilePath)}</p>`);
  outputFile.WriteLine(`<p><strong>Beta File:</strong> ${extractFileName(betaFilePath)}</p>`);
  outputFile.WriteLine("<hr>"); // Add a horizontal line for separation

  if (differences.length === 0) {
    outputFile.WriteLine("<p>No differences found.</p>");
  } else {
    differences.forEach((difference, index) => {
      if (difference.line) {
        outputFile.WriteLine(`<p><strong>Difference ${index + 1}:</strong> Line ${difference.line}</p>`);
        const prodHighlighted = highlightDifferencesInText(difference.prod, difference.beta);
        const betaHighlighted = highlightDifferencesInText(difference.beta, difference.prod);

        outputFile.WriteLine(`<p><span style="background-color: #ffcccc;">Production:</span> ${prodHighlighted}</p>`);
        outputFile.WriteLine(`<p><span style="background-color: #ccffcc;">Beta:</span> ${betaHighlighted}</p>`);
        outputFile.WriteLine("<hr>");
      } else {
        outputFile.WriteLine(`<p><strong>Difference ${index + 1}:</strong> Row ${difference.row}, Column ${difference.column}</p>`);
        outputFile.WriteLine(`<p><span style="background-color: #ffcccc;">Production:</span> ${difference.prod}</p>`);
        outputFile.WriteLine(`<p><span style="background-color: #ccffcc;">Beta:</span> ${difference.beta}</p>`);
        outputFile.WriteLine("<hr>");
      }
    });
  }

  outputFile.WriteLine("</body></html>");
  outputFile.Close();
}


// Helper function to extract filename from the file path
function extractFileName(filePath) {
  const parts = filePath.split("\\");
  return parts[parts.length - 1];
}

// Helper function to highlight differences in text
function highlightDifferencesInText(text, comparisonText) {
  const words1 = text.split(" ");
  const words2 = comparisonText.split(" ");
  const maxLength = Math.max(words1.length, words2.length);
  let highlightedText = "";

  for (let i = 0; i < maxLength; i++) {
    const word1 = words1[i] || "";
    const word2 = words2[i] || "";

    if (word1 !== word2) {
      if (word1) {
        highlightedText += `<span style="background-color: yellow; font-weight: bold;">${word1}</span> `;
      }
    } else {
      highlightedText += `${word1} `;
    }
  }

  return highlightedText.trim();
}


// Function to convert Excel to CSV
function convertExcelToCSV(excelFilePath, csvFilePath) {
  const excelApp = Sys.OleObject("Excel.Application");
  let workbook;

  try {
    // Open the Excel file
    workbook = excelApp.Workbooks.Open(excelFilePath);

    // Save the file as CSV
    workbook.SaveAs(csvFilePath, 6); // 6 = xlCSV

    Log.Message("Excel file converted to CSV successfully: " + csvFilePath);
  } catch (e) {
    Log.Error("Error converting Excel to CSV: " + e.message);
  } finally {
    // Close the workbook and quit Excel
    if (workbook) {
      workbook.Close(false);
    }
    excelApp.Quit();
  }
}

// Function to compare Excel files
function compareExcelFiles(prodFilePath, betaFilePath, outputFilePath) {
  const prodCsvFilePath = prodFilePath.replace(/\.[^/.]+$/, ".csv");
  const betaCsvFilePath = betaFilePath.replace(/\.[^/.]+$/, ".csv");

  try {
    // Convert Excel files to CSV
    convertExcelToCSV(prodFilePath, prodCsvFilePath);
    convertExcelToCSV(betaFilePath, betaCsvFilePath);

    // Compare the generated CSV files
    compareCSVFiles(prodCsvFilePath, betaCsvFilePath, outputFilePath);

    // Delete the CSV files after comparison
    deleteFile(prodCsvFilePath);
    deleteFile(betaCsvFilePath);
  } catch (e) {
    Log.Error("Error comparing Excel files: " + e.message);
  }
}

// Function to delete a file
function deleteFile(filePath) {
  const fs = Sys.OleObject("Scripting.FileSystemObject");

  try {
    if (fs.FileExists(filePath)) {
      fs.DeleteFile(filePath);
      Log.Message("Deleted file: " + filePath);
    } else {
      Log.Warning("File not found: " + filePath);
    }
  } catch (e) {
    Log.Error("Error deleting file: " + e.message);
  }
}


// Function to compare PowerPoint files (including POTX)
function comparePowerPointFiles(prodFilePath, betaFilePath, outputFilePath) {
  const prodTextFilePath = prodFilePath.replace(/\.[^/.]+$/, ".txt");
  const betaTextFilePath = betaFilePath.replace(/\.[^/.]+$/, ".txt");

  try {
    // Convert PPTX/POTX files to TXT
    convertPPTXToText(prodFilePath, prodTextFilePath);
    convertPPTXToText(betaFilePath, betaTextFilePath);

    // Compare the generated TXT files
    compareTextFiles(prodTextFilePath, betaTextFilePath, outputFilePath);

    // Delete the TXT files after comparison
    deleteFile(prodTextFilePath);
    deleteFile(betaTextFilePath);
  } catch (e) {
    Log.Error("Error comparing PowerPoint files: " + e.message);
  }
}

// Function to convert PPTX/POTX to Text
function convertPPTXToText(pptFilePath, textFilePath) {
  const pptApp = Sys.OleObject("PowerPoint.Application");
  let presentation, textFile;

  try {
    // Open the PowerPoint file (PPTX or POTX)
    presentation = pptApp.Presentations.Open(pptFilePath, false, true, false);

    // Create a new text file
    const fs = Sys.OleObject("Scripting.FileSystemObject");
    textFile = fs.CreateTextFile(textFilePath, true);

    // Extract text from each slide
    for (let i = 1; i <= presentation.Slides.Count; i++) {
      const slide = presentation.Slides.Item(i);
      textFile.WriteLine("Slide " + i + ":");

      // Iterate over each shape on the slide
      for (let j = 1; j <= slide.Shapes.Count; j++) {
        const shape = slide.Shapes.Item(j);
        if (shape.HasTextFrame && shape.TextFrame.HasText) {
          textFile.WriteLine(shape.TextFrame.TextRange.Text);
        }
      }
      textFile.WriteLine(""); // Add a blank line between slides
    }

    Log.Message("PowerPoint file converted to text successfully: " + textFilePath);
  } catch (e) {
    Log.Error("Error converting PowerPoint to text: " + e.message);
  } finally {
    if (presentation) {
      presentation.Close();
    }
    if (pptApp) {
      pptApp.Quit();
    }
    if (textFile) {
      textFile.Close();
    }
  }
}


