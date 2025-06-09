





// Define XPaths for web elements used in document translation
const MediaXPaths = {
uploadElement: "//div[@class='MuiStack-root css-1eumy8e']",
translationProgress: "(//p[@class='MuiTypography-root MuiTypography-body2 css-1jpnvhz'][1])",
buttonMoreVert: "//span[normalize-space(text()) = 'more_vert']",
downloadTxtOption: "//li[contains(text(),'Download')][1]",
panelDownloadCompleted: "//div[contains(text(), 'Download completed')]",
sourceLanguageElement: "//li[contains(normalize-space(text()), '{sourceLanguage}')]",
targetLanguageElement: "//li[contains(normalize-space(text()), '{targetLanguage}')]",
buttonNext: "//button[contains(@class, 'MuiButtonBase-root MuiButton-root')]",
buttonNextElement:"//button[normalize-space()='Next']",
buttonTranslateElement:"//button[normalize-space()='Translate']",
fileElement: "//p[normalize-space(text())='{filename}']",
pElements: "//div[@class='MuiStack-root css-15ou9qk']/p[contains(@class, 'MuiTypography-root')]",
translatePages :"//div[@class='MuiStack-root css-hp68mp']//div[1]//div[1]//div[1]//p[1]",
sourceDropDown:"(//div[@class='MuiStack-root css-bssvs0'])[1]",
targetDropDown:"(//div[@class='MuiStack-root css-bssvs0'])[2]",



};


// Global browser instance
const browser = getBrowser();
const baseDirectory = Project.Variables.mediaFolder;





// Initialize the browser based on the browser name in Project Variables
function getBrowser() {
try {
const browserName = Project.Variables.browser.toLowerCase();
if (browserName === 'chrome') {
return Aliases.browser;
} else if (browserName === 'edge') {
return Aliases.msedge;
} else {
throw new Error(`Unsupported browser: ${browserName}`);
}
} catch (e) {
Log.Error(`Error in getBrowser: ${e.message}`);
throw e;
}
}



// This method logs all the file names inside a specific folder to a text file
function logFilenamesToFile() {
// Define the folder path and output file path

const language = "Chinese Simplified"; // or whichever language folder you need
const folderPath = `${baseDirectory}\\${language}`;

//provide your personal output file path to store the file names
const outputFilePath = Project.Variables.outputFilePath;
  
  
// Create a new file for writing
const fs = Sys.OleObject("Scripting.FileSystemObject");
const fileStream = fs.CreateTextFile(outputFilePath, true);
  
// Check if the folder exists
if (fs.FolderExists(folderPath)) {
// Get the folder object
const folder = fs.GetFolder(folderPath);
const files = folder.Files;
    
// Iterate through the files and log their names
for (let fileEnum = new Enumerator(files); !fileEnum.atEnd(); fileEnum.moveNext()) {
  const file = fileEnum.item();
  Log.Message(`Filename: ${file.Name}`);
  fileStream.WriteLine(file.Name); // Write filename to the text file
}
    
// Close the file stream
fileStream.Close();
Log.Message(`Filenames have been logged to ${outputFilePath}`);
} else {
Log.Error(`The folder does not exist: ${folderPath}`);
}
}


// Function to navigate to the document page
function navigateToMediaPage()
{
  let browser = Aliases.browser;
  let textNode = browser.pageDocumentTranslationAlexaTran.headerTranslate;
  let textNode2 = textNode.textnodeTranslate;
  aqObject.CheckProperty(textNode2, "Visible", cmpEqual, true);
  browser.BrowserWindow.Maximize();
  textNode2.Click();
  textNode2 = textNode.textnodeText.textnodeVideoAudio;
  aqObject.CheckProperty(textNode2, "Visible", cmpEqual, true);
  textNode2.Click();
  
  
}


function clickElementByXPath(xpath, timeout = 30000) {
  const page = Aliases.browser.pageLoginAlexaTranslationsAI; // Adjust this if your page object differs
  
  // Find the element using the provided XPath
  const element = page.FindElement(xpath);

  // Wait for the element to be visible and enabled before clicking
  if (element.WaitProperty("VisibleOnScreen", true, timeout) && element.WaitProperty("Enabled", true, timeout)) {
    // Click the element
    element.Click();
    Log.Message(`Successfully clicked the element located by XPath: ${xpath}`);
  } else {
    Log.Error(`Element located by XPath: ${xpath} is not clickable within the timeout period of ${timeout / 1000} seconds.`);
  }
}





/**
 * Uploads a file for translation based on the specified source and target languages.
 * 
 * Purpose:
 * - This function locates the specified file within the directory structure based on the source language.
 * - It checks if the file exists and logs a warning if it doesn't, setting a flag to indicate the file was not found.
 * - If the file exists, the function interacts with the web interface to upload the file and verifies the upload process.
 * - Handles exceptions during the upload process, ensuring the script can continue or appropriately log errors.
 */



// Function to upload a file for translation
function uploadMediaFile(sourceLanguage, targetLanguage, fileName) {
try {
// Determine the file path based on source and target languages
const filePath = `${baseDirectory}${sourceLanguage}\\${fileName}`;
Log.Message(`Uploading file: ${filePath}`);


      // Check if the file exists
      if (!aqFileSystem.Exists(filePath)) {
         Log.Warning(`File not found: ${filePath}. Skipping this file.`);
         Project.Variables.fileNotFound = true; // Set a flag for file not found
         return; // Exit 
      }

          
// Get the page element
const page = browser.pageAudioVideoTranslationAlexaTr;
browser.BrowserWindow.Maximize();
        
// Find and click the upload element
const uploadElement = page.FindElement(MediaXPaths.uploadElement);
aqObject.CheckProperty(uploadElement, "Visible", cmpEqual, true);
uploadElement.Click();

// Open the file dialog and set the file path
const dlgOpen = browser.dlgOpen;
const cbxFileName = dlgOpen.cbxFileName;
cbxFileName.ComboBox.Edit.SetText(filePath);
dlgOpen.btnOpen.ClickButton();
        
// Wait for the page to update
page.Wait();

// Check that the "Next" button is present and enabled
const button = page.FindElement(MediaXPaths.buttonNext);
aqObject.CheckProperty(button, "Exists", cmpEqual, true);
aqObject.CheckProperty(button, "Enabled", cmpEqual, true);
} catch (e) {
Log.Error(`Error in uploadFile: ${e.message}`);
}
}


// Function to translate the document with dynamic language assertions and switching
function translateMediaFile(sourceLanguage, targetLanguage) {
try {
const page = browser.pageAudioVideoTranslationAlexaTr;
page.Wait();


waitForElementToBeClickable(MediaXPaths.buttonNextElement);
clickElementByXPath(MediaXPaths.buttonNextElement);



// Switch languages if necessary
switchLanguages(sourceLanguage, targetLanguage);

// XPath for source and target languages
const sourceLanguageXPath = `//li[contains(normalize-space(text()), '${sourceLanguage}')]`;
const targetLanguageXPath = `//li[contains(normalize-space(text()), '${targetLanguage}')]`;

// Locate and verify the source language element
const sourceLanguageElement = page.FindElement(sourceLanguageXPath);
if (sourceLanguageElement) {
const sourceLanguageText = sourceLanguageElement.contentText.trim();
if (sourceLanguageText.includes(sourceLanguage)) {
Log.Message(`Source language '${sourceLanguage}' is correctly positioned.`);
} else {
Log.Error(`Expected source language '${sourceLanguage}' but found '${sourceLanguageText}' in the source language element.`);
}
} else {
Log.Error(`Source language element for '${sourceLanguage}' not found.`);
}

// Locate and verify the target language element
const targetLanguageElement = page.FindElement(targetLanguageXPath);
if (targetLanguageElement) {
const targetLanguageText = targetLanguageElement.contentText.trim();
if (targetLanguageText.includes(targetLanguage)) {
Log.Message(`Target language '${targetLanguage}' is correctly positioned.`);
} else {
Log.Error(`Expected target language '${targetLanguage}' but found '${targetLanguageText}' in the target language element.`);
}
} else {
Log.Error(`Target language element for '${targetLanguage}' not found.`);
}

const nextButton = page.FindElement(MediaXPaths.buttonNextElement);
aqObject.CheckProperty(nextButton, "Enabled", cmpEqual, true);

clickElementByXPath(MediaXPaths.buttonNextElement);

const translateElement= page.FindElement(MediaXPaths.buttonTranslateElement);
aqObject.CheckProperty(translateElement, "Enabled", cmpEqual, true);
clickElementByXPath(MediaXPaths.buttonTranslateElement);

waitForTranslationCompletion();
page.Wait();
} catch (e) {
Log.Error(`Error in translateDocument: ${e.message}`);
}
}



// Function to switch languages in the application appropirately based on source and target specified in feature file
function switchLanguages(sourceLanguage, targetLanguage) {
const page = browser.pageAudioVideoTranslationAlexaTr;
const textnodeSource = page.FindElement(MediaXPaths.sourceDropDown);
aqObject.CheckProperty(textnodeSource, "Visible", cmpEqual, true);
browser.BrowserWindow.Maximize();





// Create a mapping of languages to their value attributes in the <li> elements
const languageValues = {
"English": "eng",
"French" : "fra",
"Spanish": "spa",
"Arabic" : "ara",
"German" : "deu",
"Italian": "ita",
"Japanese": "jpn",
"Korean" : "kor",
"Dutch"  : "nld",
"Portuguese":"por",
"Turkish":"tur",
"Chinese Simplified":"zhs"
};

// Check if both source and target languages are supported
if (!languageValues[sourceLanguage] || !languageValues[targetLanguage]) {
Log.Error(`Unsupported language pair: ${sourceLanguage} to ${targetLanguage}`);
return;
}

// Function to select a language from the dropdown
function selectLanguage(languageValue) {
const xpath = `//li[@role='menuitem' and @value='${languageValue}']`;
const languageElement = page.FindElement(xpath);
aqObject.CheckProperty(languageElement, "Visible", cmpEqual, true);
languageElement.Click();
}

// Click the dropdown to select the source language
clickElementByXPath(MediaXPaths.sourceDropDown);
selectLanguage(languageValues[sourceLanguage]);

// Wait for the source language to be set
page.Wait();

// Click the dropdown to select the target language
 // DropDown for target language
clickElementByXPath(MediaXPaths.targetDropDown);
selectLanguage(languageValues[targetLanguage]);
}
 


// Function to verify no errors during translation
function verifyNoErrorsMediaTranslation(filename, sourceLanguage, targetLanguage) {
try {
const page = browser.pageAudioVideoTranslationAlexaTr;
page.Wait();

// Locate the element containing the expected file name
const fileElementXPath = MediaXPaths.fileElement.replace('{filename}', filename);
const fileElement = page.FindElement(fileElementXPath);
aqObject.CheckProperty(fileElement, "contentText", cmpEqual, filename);

// Check that the translation is completed
aqObject.CheckProperty(page.textnodeCompleted, "contentText", cmpEqual, "Completed");



// Additional logging for context
Log.Message(`Verified no errors for file: ${filename} from ${sourceLanguage} to ${targetLanguage}`);
} catch (e) {
Log.Error(`Error in verifyNoErrors: ${e.message}`);
}
  
}

// Helper function to convert language names to two-letter codes
function getLanguageCode(language) {
const languageMap = {
"English": "EN",
"French" : "FR",
"Spanish": "ES",
"Arabic" : "AR",
"German" : "DE",
"Italian": "IT",
"Japanese": "JA",
"Korean" : "KO",
"Dutch"  : "NL",
"Portuguese":"PT",
"Turkish":"TR",
"Chinese Simplified":"ZH-CN"
  
  
// Add other languages as needed
};

const code = languageMap[language];
if (!code) {
throw new Error(`Unsupported language: ${language}`);
}
return code;
}



// Function to check source and target languages
function checkSourceAndTargetMedia(sourceLanguage, targetLanguage) {
try {
const page = browser.pageAudioVideoTranslationAlexaTr;
page.Wait();

// Convert source and target languages to their two-letter codes
const sourceCode = getLanguageCode(sourceLanguage);
const targetCode = getLanguageCode(targetLanguage);

// Find all <p> elements
const pElements = page.FindElements(MediaXPaths.pElements);

// Check if there are enough <p> elements
if (pElements.length >= 2) {
  // Get the text content of the first and second <p> elements
  const firstText = pElements[0].contentText.trim().toUpperCase();
  const secondText = pElements[1].contentText.trim().toUpperCase();

  // Check the text content of the first <p> element
  if (firstText === sourceCode) {
      Log.Message(`Source language '${sourceLanguage}' (code '${sourceCode}') is correctly positioned.`);
  } else {
      Log.Error(`Expected source language '${sourceLanguage}' (code '${sourceCode}') but found '${firstText}'`);
  }

  // Check the text content of the second <p> element
  if (secondText === targetCode) {
      Log.Message(`Target language '${targetLanguage}' (code '${targetCode}') is correctly positioned.`);
  } else {
      Log.Error(`Expected target language '${targetLanguage}' (code '${targetCode}') but found '${secondText}'`);
  }
} else {
  Log.Error('Not enough <p> elements found on the page.');
}
} catch (e) {
Log.Error(`Error in checkSourceAndTarget: ${e.message}`);
}
}


// Function to verify the download
function verifyMediaDownload() {
try {
const page = browser.pageAudioVideoTranslationAlexaTr;
page.Wait();

// Locate the "Download options" button using XPath
const buttonMoreVert = page.FindElement(MediaXPaths.buttonMoreVert);
aqObject.CheckProperty(buttonMoreVert, "Exists", cmpEqual, true);

// Maximize the browser window and click the "Download options" button
browser.BrowserWindow.Maximize();
buttonMoreVert.Click();

// Locate the "Download .*" option with the right extension using XPath
const downloadTxtButton = page.FindElement(MediaXPaths.downloadTxtOption);
aqObject.CheckProperty(downloadTxtButton, "Enabled", cmpEqual, true);

// Click the "Download .txt" option
downloadTxtButton.Click();
page.Wait();

try {
    // Check if the completion message matches "Download completed"
    aqObject.CheckProperty(page.FindElement(MediaXPaths.panelDownloadCompleted), "contentText", cmpEqual, "Download completed");
    Log.Message("Download completed successfully.");
} catch (e) {
    // If the content text is different, raise a warning
    Log.Error(`Expected 'Download completed', but found something else. Error: ${e.message}`);
}


// Close the action menu
buttonMoreVert.Keys("[Esc]");
} catch (e) {
Log.Error(`Error in verifyDownload: ${e.message}`);
}
}


// Function to wait until the text inside the element turn from In progress to "Completed"
function waitForTranslationCompletion() {
const expectedText = "Completed";
const timeout = 180000; // Timeout in milliseconds (e.g., 3 minutes)
    
try {
const page = browser.pageAudioVideoTranslationAlexaTr; // Adjust this as necessary for different pages
const translationProgressElement = page.WaitElement(MediaXPaths.translationProgress,30000);

      if (!translationProgressElement.Exists) {
          Log.Error('Could not find the status element after 30 seconds. The document translation encountered an issue. Terminating the test.');
          Runner.Stop();
          }
        
// Wait until the text content of the element is "Completed"
translationProgressElement.WaitProperty("contentText", expectedText, timeout);
        
// Log success message
Log.Message(`Text changed to '${expectedText}' successfully.`);
} catch (e) {
Log.Error(`Error while waiting for text to change: ${e.message}`);
}

}


/*

function waitForButtonToBeClickable(timeout) {
  const page = Aliases.browser.pageLoginAlexaTranslationsAI; // Adjust as necessary for your page object
  const buttonXPath = "//button[normalize-space()='Next']";

  // Locate the button using FindElement and XPath
  const nextButton = page.FindElement(buttonXPath);

  // Get the current time to calculate the timeout
  const startTime = new Date().getTime();

  // Loop until the button is clickable or the timeout is reached
  while (new Date().getTime() - startTime < timeout) {
    if (nextButton.WaitProperty("Enabled", true, 500) && nextButton.WaitProperty("Visible", true, 500)) {
      Log.Message("The 'Next' button is clickable.");
      return true; // Exit the function if the button is clickable
    }

    // Delay for a short time before checking again
    aqUtils.Delay(500);
  }

  // If the timeout is reached and the button is not clickable
  Log.Error("The 'Next' button is not clickable within the timeout period.");
  return false;
}
*/

function waitForElementToBeClickable(xpath, timeout = 300000) {
  const page = Aliases.browser.pageLoginAlexaTranslationsAI; // Adjust this if your page object differs
  const element = page.FindElement(xpath);

  // Wait for the element to be enabled within the specified timeout
  const isClickable = element.WaitProperty("Enabled", true, timeout);

  if (isClickable) {
    Log.Message(`Element located by '${xpath}' is clickable.`);
    return true; // Element is enabled and clickable
  } else {
    Log.Error(`Element located by '${xpath}' is not clickable within the timeout period of ${timeout / 1000} seconds.`);
    return false; // Element is not clickable within the timeout
  }

}








module.exports = {
navigateToMediaPage,
uploadMediaFile,
verifyMediaDownload,
verifyNoErrorsMediaTranslation,
checkSourceAndTargetMedia,
translateMediaFile,
};

