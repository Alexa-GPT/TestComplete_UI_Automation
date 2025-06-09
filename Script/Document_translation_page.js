

// Import Login page
const { 
navigateToLoginPage,
enterValidCredentials,
clickLoginButton,
userLogsOut,
verifyLogOutMsg,
confirmUserLogInSuccess,
loginShouldFail,
XPaths,
environment,
baseUrl,
urls,
contactUrls,
username,
password
    
} = require('Login_page');




// Define XPaths for web elements used in document translation
const DocTransXPaths = {
uploadElement: "//div[@role='presentation']",
//translationProgress: "(//p[@class='MuiTypography-root MuiTypography-body2 css-1jpnvhz'][1])",
translationProgress:"//p[@class='MuiTypography-root MuiTypography-body2 css-1jfiw8y']",
buttonMoreVert: "//span[normalize-space(text()) = 'more_vert']",
downloadTxtOption: "//li[contains(text(), 'Download .')]",
panelDownloadCompleted: "//div[contains(text(), 'Download completed')]",
sourceLanguageElement: "//li[contains(normalize-space(text()), '{sourceLanguage}')]",
targetLanguageElement: "//li[contains(normalize-space(text()), '{targetLanguage}')]",
buttonNext: "//button[contains(@class, 'MuiButtonBase-root MuiButton-root')]",
fileElement: "//p[normalize-space(text())='{filename}']",
pElements: "//div[@class='MuiStack-root css-15ou9qk']/p[contains(@class, 'MuiTypography-root')]",
nextButtonSideMenu : "//button[@type='button' and contains(@class, 'MuiButton-containedPrimary') and contains(@class, 'MuiButton-sizeMedium')]",
targetDropDown:"(//div[@class='MuiBox-root css-pcwykm'])[3]",
sourceDropDown:"(//div[@class='MuiBox-root css-pcwykm'])[2]",

}



// Global browser instance
const browser = getBrowser();
const baseDirectory = Project.Variables.docTranslationFolder;

// Global variable to track login state
let loginPerformed = false;

// Function to perform login
function performLogin() {
if (!loginPerformed) {
Log.Message("Performing login actions...");
navigateToLoginPage("English");
enterValidCredentials();
clickLoginButton();
confirmUserLogInSuccess();
loginPerformed = true; // Set flag to true after login
} else {
Log.Message("User is already logged in.");
}
}





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




/*

// Function to upload a file for translation
function uploadFile(sourceLanguage, targetLanguage, fileName) {
try {
// Determine the file path based on source and target languages
const filePath = `${baseDirectory}${sourceLanguage}\\${fileName}`;
Log.Message(`Uploading file: ${filePath}`);
        
// Get the page element
const page = browser.pageDocumentTranslationAlexaTran;
browser.BrowserWindow.Maximize();
        
// Find and click the upload element
const uploadElement = page.FindElement(DocTransXPaths.uploadElement);
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
const button = page.FindElement(DocTransXPaths.buttonNext);
aqObject.CheckProperty(button, "Exists", cmpEqual, true);
aqObject.CheckProperty(button, "Enabled", cmpEqual, true);
} catch (e) {
uploadFailed();  
Log.Error(`Error in uploadFile: ${e.message}`);
}
}

*/








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
function uploadFile(sourceLanguage, targetLanguage, fileName) {
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
      const page = browser.pageDocumentTranslationAlexaTran;
      browser.BrowserWindow.Maximize();

      // Find and click the upload element
      const uploadElement = page.FindElement(DocTransXPaths.uploadElement);
      clickElementByXPath(DocTransXPaths.uploadElement);
        
      // Open the file dialog and set the file path
      const dlgOpen = browser.dlgOpen;
      const cbxFileName = dlgOpen.cbxFileName;
      cbxFileName.ComboBox.Edit.SetText(filePath);
      dlgOpen.btnOpen.ClickButton();

      // Wait for the page to update
      page.Wait();

      // Check that the "Next" button is present and enabled
      const button = page.FindElement(DocTransXPaths.buttonNext);
      aqObject.CheckProperty(button, "Exists", cmpEqual, true);
      aqObject.CheckProperty(button, "Enabled", cmpEqual, true);
      Project.Variables.fileNotFound = false; // File was found and uploaded

  } catch (e) {
        
      Log.Error(`Error in uploadFile: ${e.message}`);
      //Runner.Stop(); // Stop the entire test run
      Project.Variables.fileNotFound = true; // Error occurred, set flag

  }
}



/**
* Resets the fileNotFound flag to false.
* 
* Purpose:
* - Before attempting to upload a file, this function ensures that the `fileNotFound` flag is reset to `false`.
* - This is necessary because the flag might have been set to `true` in a previous test iteration where the file was not found.
* - By resetting it, you ensure that each file upload attempt starts with the assumption that the file will be found.
*/
function resetFileNotFoundFlag() {
  Project.Variables.fileNotFound = false;
}

/**
* Checks if the fileNotFound flag is set to true and skips the remaining steps if so.
* 
* Purpose:
* - After attempting to upload a file, this function checks whether the `fileNotFound` flag has been set to `true`.
* - If the flag is `true`, it means the file was not found, and this function will log a message and return `true`.
* - Returning `true` allows the calling step to return early, effectively skipping any further actions for the current test iteration.
* - This prevents errors or unnecessary actions from being performed on a missing file.
*/
function skipIfFileNotFound() {
  if (Project.Variables.fileNotFound) {
      Log.Message("File was not found. Skipping remaining steps for this example.");
      return true;
  }
  return false;
}




// Utility function to wait for an element to be no longer visible by XPath
function waitForElementToDisappearByXPath(xpath, timeout = 180000) {
try {
    
const page = browser.pageDocumentTranslationAlexaTran; // Adjust this as necessary for different pages
const element = page.FindElement(xpath);

// Wait until the element's "Exists" property is false
element.WaitProperty("Exists", false, timeout);

// Log the status of the element
if (element.Exists) {
Log.Warning(`Element with XPath '${xpath}' is still visible after waiting ${timeout} milliseconds.`);
} else {
Log.Message(`Element with XPath '${xpath}' is no longer visible.`);
}
} catch (e) {
Log.Error(`Error in waitForElementToDisappearByXPath: ${e.message}`);
}
}






// Function to navigate to the document page
function navigateToDocumentPage() {
try {
let browser = Aliases.browser;
browser.BrowserWindow.Maximize();
let textNode = browser.pageDocumentTranslationAlexaTran.headerTranslate;
textNode.textnodeTranslate.Click();
textNode.textnodeText.textnodeDocument.Click();
} catch (e) {
Log.Error(`Error in navigateToDocumentPage: ${e.message}`);
}
}


function clickElementByXPath(xpath, timeout = 180000) {
const page = Aliases.browser.pageDocumentTranslationAlexaTran; // Adjust this if your page object differs
  
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






// This method logs all the file names inside a specific folder to a text file
function logFilenamesToFile() {
// Define the folder path and output file path

const language = "French"; // or whichever language folder you need
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



// Function to switch languages in the application appropirately based on source and target specified in feature file
function switchLanguages(sourceLanguage, targetLanguage) {
const page = browser.pageDocumentTranslationAlexaTran;

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
const sourceDropDown = page.FindElement(DocTransXPaths.sourceDropDown);
sourceDropDown.click();
selectLanguage(languageValues[sourceLanguage]);

// Wait for the source language to be set
page.Wait();

// Click the dropdown to select the target language

const targetDropDown = page.FindElement(DocTransXPaths.targetDropDown);
targetDropDown.click();

selectLanguage(languageValues[targetLanguage]);
 
 
}










// Function to verify no errors during translation
function verifyNoErrors(filename, sourceLanguage, targetLanguage) {
try {
const page = browser.pageDocumentTranslationAlexaTran;
page.Wait();

// Locate the element containing the expected file name
const fileElementXPath = DocTransXPaths.fileElement.replace('{filename}', filename);
const fileElement = page.FindElement(fileElementXPath);
aqObject.CheckProperty(fileElement, "contentText", cmpEqual, filename);

// Check that the translation is completed
aqObject.CheckProperty(page.textnodeCompleted, "contentText", cmpEqual, "Completed");

// Additional logging for context
Log.Checkpoint(`Verified no errors for file: ${filename} from ${sourceLanguage} to ${targetLanguage}`);
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
function checkSourceAndTarget(sourceLanguage, targetLanguage) {
try {
const page = browser.pageDocumentTranslationAlexaTran;
page.Wait();

// Convert source and target languages to their two-letter codes
const sourceCode = getLanguageCode(sourceLanguage);
const targetCode = getLanguageCode(targetLanguage);

// Find all <p> elements
const pElements = page.FindElements(DocTransXPaths.pElements);

// Check if there are enough <p> elements
if (pElements.length >= 2) {
// Get the text content of the first and second <p> elements
const firstText = pElements[0].contentText.trim().toUpperCase();
const secondText = pElements[1].contentText.trim().toUpperCase();

// Check the text content of the first <p> element
if (firstText === sourceCode) {
    Log.Checkpoint(`Source language '${sourceLanguage}' (code '${sourceCode}') is correctly positioned.`);
} else {
    Log.Error(`Expected source language '${sourceLanguage}' (code '${sourceCode}') but found '${firstText}'`);
}

// Check the text content of the second <p> element
if (secondText === targetCode) {
    Log.Checkpoint(`Target language '${targetLanguage}' (code '${targetCode}') is correctly positioned.`);
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











// Function to translate the document with dynamic language assertions and switching
function translateDocument(sourceLanguage, targetLanguage) {
try {
const page = browser.pageDocumentTranslationAlexaTran;
page.Wait();



let button = page.FindElement(DocTransXPaths.nextButtonSideMenu);
clickElementByXPath(DocTransXPaths.nextButtonSideMenu);



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

button.ClickButton();
aqObject.CheckProperty(button, "Enabled", cmpEqual, true);
button.ClickButton();

waitForTranslationCompletion();
page.Wait();
} catch (e) {
Log.Error(`Error in translateDocument: ${e.message}`);
}
}


/*

// Function to wait until the text inside the element turn from In progress to "Completed"
function waitForTranslationCompletion() {
const expectedText = "Completed";
const timeout = 180000; // Timeout in milliseconds (e.g., 3 minutes)
    
try {
const page = browser.pageDocumentTranslationAlexaTran; // Adjust this as necessary for different pages
page.Wait();

// Wait for the element to be present
const translationProgressElement = page.WaitElement(DocTransXPaths.translationProgress, 30000); // Waits up to 30 seconds

        
// Wait until the text content of the element is "Completed"
translationProgressElement.WaitProperty("contentText", expectedText, timeout);
        
// Log success message
Log.Message(`Text changed to '${expectedText}' successfully.`);
} catch (e) {
Log.Error(`Error while waiting for text to change: ${e.message}`);

}
}

*/


function waitForTranslationCompletion() {
    const expectedText = "Completed";
    const timeout = 180000; // Timeout in milliseconds (e.g., 3 minutes)

    try {
        const page = browser.pageDocumentTranslationAlexaTran; // Adjust this as necessary for different pages
        page.Wait(); // Wait for the page to be ready

        const translationProgressElement = page.WaitElement(DocTransXPaths.translationProgress, 30000); // Waits up to 30 seconds

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





// Function to verify the download
function verifyDownload() {
try {
const page = browser.pageDocumentTranslationAlexaTran;
page.Wait();

// Locate the "Download options" button using XPath
const buttonMoreVert = page.FindElement(DocTransXPaths.buttonMoreVert);
aqObject.CheckProperty(buttonMoreVert, "Exists", cmpEqual, true);

// Maximize the browser window and click the "Download options" button
browser.BrowserWindow.Maximize();
buttonMoreVert.Click();

// Locate the "Download .*" option with the right extension using XPath
const downloadTxtButton = page.FindElement(DocTransXPaths.downloadTxtOption);
aqObject.CheckProperty(downloadTxtButton, "Enabled", cmpEqual, true);

// Click the "Download .txt" option
downloadTxtButton.Click();
page.Wait();
//let dlgSaveAs = browser.dlgSaveAs;
//dlgSaveAs.btnSave.ClickButton();

try {
  // Check if the completion message matches "Download completed"
  aqObject.CheckProperty(page.FindElement(DocTransXPaths.panelDownloadCompleted), "contentText", cmpEqual, "Download completed");
  Log.Checkpoint("Download completed successfully.");
} catch (e) {
  // If the content text is different, raise a warning
  Log.Warning(`Expected 'Download completed', but found something else. Error: ${e.message}`);
}


// Close the action menu
buttonMoreVert.Keys("[Esc]");
} catch (e) {
Log.Error(`Error in verifyDownload: ${e.message}`);
}

}


// Function to close the browser
function closeBrowser() {
try {
const browser = getBrowser();
if (browser) {
browser.Close();
Log.Message('Browser closed successfully.');
} else {
Log.Error('No browser instance found.');
}
} catch (e) {
Log.Error(`Error in closeBrowser: ${e.message}`);
}
}




module.exports = {
getBrowser,
uploadFile,
navigateToDocumentPage,
verifyNoErrors,
verifyDownload,
waitForElementToDisappearByXPath,
translateDocument,
checkSourceAndTarget,
performLogin,
closeBrowser,
resetFileNotFoundFlag,
skipIfFileNotFound
};

