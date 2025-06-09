
function ExtractContentFromPptx(pptxFilePath) {
  var pptApp = Sys.OleObject("PowerPoint.Application");
  pptApp.Visible = true; // Run PowerPoint in the background

  var presentation = pptApp.Presentations.Open(pptxFilePath, false, false, false);
  var slidesContent = [];

  for (var i = 1; i <= presentation.Slides.Count; i++) {
    var slide = presentation.Slides.Item(i);
    var slideContent = "";

    // Extract text from each shape
    for (var j = 1; j <= slide.Shapes.Count; j++) {
      var shape = slide.Shapes.Item(j);
      if (shape.HasTextFrame && shape.TextFrame.HasText) {
        slideContent += shape.TextFrame.TextRange.Text + "\n";
      }
    }
    slidesContent.push(slideContent.trim());
  }

  presentation.Close();
  pptApp.Quit();

  return slidesContent;
}


function CompareSlidesContent(content1, content2) {
  var differences = [];

  for (var i = 0; i < Math.max(content1.length, content2.length); i++) {
    var slideContent1 = content1[i] || "";
    var slideContent2 = content2[i] || "";

    if (slideContent1 !== slideContent2) {
      differences.push({
        slideNumber: i + 1,
        content1: slideContent1,
        content2: slideContent2
      });
    }
  }

  return differences;
}


function GenerateComparisonPptx(differences, outputPptxPath) {
  var pptApp = Sys.OleObject("PowerPoint.Application");
  pptApp.Visible = true; // Show PowerPoint to see what happens
  var comparisonPresentation = pptApp.Presentations.Add();

  for (var i = 0; i < differences.length; i++) {
    var diff = differences[i];
    var slide = comparisonPresentation.Slides.Add(i + 1, 1); // Add new slide

    var textBox1 = slide.Shapes.AddTextbox(1, 0, 0, 720, 200);
    textBox1.TextFrame.TextRange.Text = "Original Slide " + diff.slideNumber + ":\n" + diff.content1;
    textBox1.TextFrame.TextRange.Font.Color = RGB(0, 0, 0);

    var textBox2 = slide.Shapes.AddTextbox(1, 0, 200, 720, 200);
    textBox2.TextFrame.TextRange.Text = "Compared Slide " + diff.slideNumber + ":\n" + diff.content2;
    textBox2.TextFrame.TextRange.Font.Color = RGB(255, 0, 0);
  }

  try {
    // Attempt to save with a different method or location
    comparisonPresentation.SaveAs(outputPptxPath);
    Log.Message("File saved successfully at: " + outputPptxPath);
  } catch (e) {
    Log.Error("An error occurred while saving the file: " + e.message);
    // Attempt a fallback location or method
    var fallbackPath = "C:\\Users\\Public\\Documents\\fallback_presentation.pptx";
    try {
      comparisonPresentation.SaveAs(fallbackPath);
      Log.Message("File saved successfully at fallback location: " + fallbackPath);
    } catch (e) {
      Log.Error("Fallback save attempt also failed: " + e.message);
    }
  } finally {
    comparisonPresentation.Close();
    pptApp.Quit();
  }
}

function RGB(r, g, b) {
  return (b << 16) | (g << 8) | r;
}





function ComparePptxFilesAndGenerateComparisonPptx() {
var pptxFile1Path = "C:\\Users\\wisse\\Documents\\fileComparison\\PPTX\\pptx_sample_EN_fr.pptx";
  var pptxFile2Path = "C:\\Users\\wisse\\Documents\\fileComparison\\PPTX\\pptx_sample_EN_French.pptx";
  var pptxOutputPath = "C:\\path\\to\\output\\comparisonResult.pptx";

  var content1 = ExtractContentFromPptx(pptxFile1Path);
  var content2 = ExtractContentFromPptx(pptxFile2Path);

  // Compare the content and find differences
  var differences = CompareSlidesContent(content1, content2);

  // Generate a comparison PPTX file highlighting the differences
  GenerateComparisonPptx(differences, pptxOutputPath);

  Log.Message("Comparison complete. PPTX file generated at: " + pptxOutputPath);
}


