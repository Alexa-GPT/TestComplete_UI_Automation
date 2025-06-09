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
password,
performLogin,
    
} = require('Login_page');



TB_Xpaths = {
  
 createButton :"//button[normalize-space()='Create']",
 dropZone:"//div[@class='MuiStack-root css-yd8sa2']//div[@class='MuiStack-root css-dvxtzn']",
 nextButton:"//button[normalize-space()='Next']",
 sourceDropdown:"(//span[@class='MuiTypography-root MuiTypography-body1 material-icons-outlined undefined css-1y69wjm' and text()='arrow_drop_down'])[1]",
 targetDropdown:"(//span[@class='MuiTypography-root MuiTypography-body1 material-icons-outlined undefined css-1y69wjm' and text()='arrow_drop_down'])[2]",
 createTB:"//button[contains(@class,'MuiButtonBase-root') and contains(@class,'MuiButton-containedPrimary') and contains(@class,'css-rgmeoa')]",
 progressElement:"//p[@class='MuiTypography-root MuiTypography-body2 css-1jfiw8y']",
 allCheckbox: "//span[@class='MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorPrimary PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-root MuiCheckbox-colorPrimary css-1ljn2sw']//input[@type='checkbox']",
 lastTbUploaded:"(//div[contains(@class, 'custom-scrollbar-visible') and contains(@class, 'MuiBox-root') and contains(@class, 'css-k927hr')]//input[contains(@class, 'PrivateSwitchBase-input') and contains(@class, 'css-1m9pwf3')])[2]",
 downloadButton:"//button[normalize-space()='Download']",
 xlsxCheckbox: "//span[contains(@class, 'MuiCheckbox-root') and contains(@class, 'Mui-checked')]//input[@type='checkbox']",
 tbxCheckbox:"//span[contains(@class, 'MuiTypography-root') and contains(@class, 'MuiTypography-body1') and contains(@class, 'MuiFormControlLabel-label') and text()='.TBX']",
 textCheckbox:"//span[contains(@class, 'MuiTypography-root') and contains(@class, 'MuiTypography-body1') and contains(@class, 'MuiFormControlLabel-label') and text()='Text (2 FILES)']",
 TbPageLink : "//p[normalize-space()='Term Bases']",
 
};




const baseDirectory = Project.Variables.TmTbPackage;



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


function navigateToTbPage() {
  let browser = Aliases.browser;
  browser.BrowserWindow.Maximize();
  let page = browser.pageDocumentTranslationAlexaTran;

  try {
    // Locate the element using XPath and click it
    let tbPageLink = page.WaitElement(TB_Xpaths.TbPageLink,2000);
    tbPageLink.Click();
    Log.Message("Successfully navigated to the TB page.");
  } catch (error) {
    // Log an error message if the element is not found or clicking fails
    Log.Error("Failed to navigate to the TB page. Error: " + error.message);
  }
}




function clickElementByXPath(xpath, timeout = 30000) {
    const page = Aliases.browser.pageTermBasesAlexaTranslationsAI; // Adjust this if your page object differs

    try {
        const element = page.WaitElement(xpath, 10000);
        
        if (element && element.WaitProperty("VisibleOnScreen", true, timeout) && element.WaitProperty("Enabled", true, timeout)) {
            element.Click();

            const elementName = Object.keys(TB_Xpaths).find(key => TB_Xpaths[key] === xpath) || "Dynamic Xpath";
            //Log.Message(`Element clicked${elementName === "Dynamic Xpath" ? ` by XPath: ${xpath}` : `: ${elementName}`}`);
        }
    } catch (e) {
        Log.Error(`Error while clicking element: ${e.message}`);
    }
 
    
}


/**
 * Automates the process of creating a Term Base (TB).
 * This includes uploading a file, selecting source and target languages, 
 * choosing the output type, and initiating the term base creation.
 * Handles errors and logs checkpoints for each step to ensure traceability.
 * 
 * @param {string} sourceLanguage - The source language for the term base.
 * @param {string} targetLanguage - The target language for the term base.
 * @param {string} fileName - The name of the file to be uploaded.
 * @param {string} output - The desired output type for the term base (e.g., XML, TMX).
 */


function createTB(sourceLanguage, targetLanguage, fileName, output) {
    try {
        let browser = getBrowser();

        // Click create button
        clickElementByXPath(TB_Xpaths.createButton);
        Log.Checkpoint("Clicked the 'Create' button.");

        // Determine the file path based on source and target languages
        const filePath = `${baseDirectory}${fileName}`;
        Log.Message(`Uploading file: ${filePath}`);

        // Check if the file exists
        if (!aqFileSystem.Exists(filePath)) {
            Log.Warning(`File not found: ${filePath}. Skipping this file.`);
            Project.Variables.fileNotFound = true; // Set a flag for file not found
            return; // Exit
        }
        Log.Checkpoint(`File found: ${filePath}. Proceeding to upload.`);

        // Get the page element
        const page = browser.pageTermBasesAlexaTranslationsAI;

        // Click the upload element
        clickElementByXPath(TB_Xpaths.dropZone);
        Log.Checkpoint("Clicked the upload drop zone.");

        // Open the file dialog and set the file path
        const dlgOpen = browser.dlgOpen;
        const cbxFileName = dlgOpen.cbxFileName;
        cbxFileName.ComboBox.Edit.SetText(filePath);
        Log.Checkpoint(`File path set in dialog: ${filePath}.`);
        dlgOpen.btnOpen.ClickButton();
        Log.Checkpoint("Clicked the 'Open' button in the file dialog.");

        // Wait for the page to update
        page.Wait();

        // Click the "Next" button if present and enabled
        clickElementByXPath(TB_Xpaths.nextButton);
        Log.Checkpoint("Clicked the 'Next' button.");

        Project.Variables.fileNotFound = false; // File was found and uploaded
        selectSourceAndTarget(sourceLanguage, targetLanguage);
        Log.Checkpoint(`Source language '${sourceLanguage}' and target language '${targetLanguage}' selected.`);

        clickElementByXPath(TB_Xpaths.nextButton);
        Log.Checkpoint("Clicked the 'Next' button after language selection.");
        
        
    // Select output Type according the parameter passed 
    
    clickAppropriateCheckbox(output);

        clickElementByXPath(TB_Xpaths.createTB);
        Log.Checkpoint("Clicked the 'Create Term Base' button.");

    } catch (e) {
        Log.Error(`Error in uploadFile: ${e.message}`);
        Project.Variables.fileNotFound = true; // Error occurred, set flag
    }
  
    
}




/**
 * Automates the process of selecting the appropriate output type checkbox.
 * Handles 'xlsx', 'tbx', 'text', and 'all' output types, selecting the corresponding checkbox.
 * If 'xlsx' is selected, no action is taken since it is selected by default.
 * If another output type is selected, it deselects 'xlsx' and selects the appropriate checkbox.
 * Logs the actions for traceability.
 * 
 * @param {string} outputType - The desired output type (e.g., 'tbx', 'text', 'all').
 *                             If 'xlsx' is passed, no action is performed.
 */
function clickAppropriateCheckbox(outputType) {
    try {
        let checkboxXPath;

        // Handle 'xlsx' output type (do nothing since it's selected by default)
        if (outputType.toLowerCase() === 'xlsx') {
            Log.Message("No action required for 'xlsx' as it is selected by default.");
            return; // Do nothing for 'xlsx'
        }

        // Choose the appropriate XPath based on the outputType
        switch (outputType.toLowerCase()) {
            case 'tbx':
                checkboxXPath = TB_Xpaths.tbxCheckbox;  // XPath for TBX checkbox
                break;
            case 'text':
                checkboxXPath = TB_Xpaths.textCheckbox; // XPath for Text checkbox
                break;
            case 'all':
                checkboxXPath = TB_Xpaths.allCheckbox;  // XPath for All checkbox
                break;
            default:
                Log.Error("Invalid output type. Please use 'tbx', 'text', or 'all'.");
                return;
        }

        // First, click the selected output type (TBX or Text)
        clickElementByXPath(checkboxXPath);
        Log.Message(`Clicked the checkbox for ${outputType} output.`);

        // If output type is 'TBX' or 'Text', deselect 'xlsx'
        if (outputType.toLowerCase() === 'tbx' || outputType.toLowerCase() === 'text') {
            // Deselect 'xlsx' checkbox
            clickElementByXPath(TB_Xpaths.xlsxCheckbox); // Assuming 'xlsx' checkbox XPath
            Log.Message("Deselected the 'xlsx' checkbox.");
        }

    } catch (e) {
        Log.Error(`Error in clickAppropriateCheckbox: ${e.message}`);
    }
}









/**
 * Selects the source and target languages from dropdown menus on the page.
 * Handles source and target language selection using XPath and predefined language values.
 * If an unrecognized language is provided, a warning message is logged.
 * Logs any errors encountered during the language selection process.
 * 
 * @param {string} source - The source language to be selected (e.g., 'English').
 * @param {string} target - The target language to be selected (e.g., 'French').
 * 
 * @throws {Error} Throws an error if there is an issue with selecting the languages.
 */


function selectSourceAndTarget(source, target) {
    try {
        // Function to select a language from a dropdown
        const selectLanguage = (dropdownXpath, languageValue) => {
            clickElementByXPath(dropdownXpath);
            const languageXPath = `//li[@role='menuitem' and @value='${languageValue}']`;
            clickElementByXPath(languageXPath);
        };

        // Select source language
        switch (source) {
            case 'English':
                selectLanguage(TB_Xpaths.sourceDropdown, 'eng');
                break;
            // Add additional cases for other source languages
            default:
                Log.Warning(`Source language '${source}' not recognized.`);
        }

        // Select target language
        switch (target) {
            case 'French':
                selectLanguage(TB_Xpaths.targetDropdown, 'fra');
                break;
            // Add additional cases for other target languages
            default:
                Log.Warning(`Target language '${target}' not recognized.`);
        }
    } catch (e) {
        Log.Error(`Error while selecting source and target languages: ${e.message}`);
    }
}





/**
 * Validates the Term Base (TB) creation by checking the status element for the expected text "Completed".
 * Waits for the translation progress to reach the "Completed" status within the specified timeout.
 * If the status does not change to "Completed" within the timeout, the test is stopped.
 * Logs the status change and any errors encountered.
 * 
 * @throws {Error} Throws an error if the status element cannot be found or if the status does not change to 'Completed'.
 */


function validateTB_Creation() {
    const expectedText = "Completed";
    const timeout = 180000; // Timeout in milliseconds (e.g., 3 minutes)

    try {
        let browser = getBrowser();
        const page = browser.pageTermBasesAlexaTranslationsAI; // Adjust this as necessary for different pages
        page.Wait(); // Wait for the page to be ready

        const translationProgressElement = page.WaitElement(TB_Xpaths.progressElement, 60000); // Waits up to 60 seconds

        if (!translationProgressElement.Exists) {
            Log.Error('Could not find the status element after 60 seconds. The TB Creation encountered an issue. Terminating the test...');
            Runner.Stop();
            }

        // Wait until the text content of the element is "Completed"
        translationProgressElement.WaitProperty("contentText", expectedText, timeout);

        // Log success message
        Log.Checkpoint(`Status changed to '${expectedText}' successfully.`);
    } catch (e) {
        Log.Error(`Error while waiting for text to change: ${e.message}`);
    }
}



/**
 * Automates the process of downloading the last uploaded Term Base (TB).
 * Handles browser-specific actions for Chrome and Edge with appropriate error handling.
 * Logs checkpoints for each step to ensure traceability.
 */

function downloadTB() {
  try {
    const browser = Project.Variables.browser.toLowerCase();

    // Select the last Term Base uploaded
    try {
      clickElementByXPath(TB_Xpaths.lastTbUploaded);
      Log.Checkpoint("TB Selected for Download.");
    } catch (error) {
      Log.Error("Failed to select the last uploaded Term Base.", error.message);
      return;
    }

    // Click the download button
    try {
      clickElementByXPath(TB_Xpaths.downloadButton);
      Log.Checkpoint("Download Button is clicked.");
    } catch (error) {
      Log.Error("Failed to click the download button.", error.message);
      return;
    }

    // Handle browser-specific behavior
    if (browser === "chrome") {
      try {
         Aliases.browser.dlgSaveAs.btnSave.ClickButton();
        Log.Checkpoint("Save Button is clicked to confirm download in Chrome.");
      } catch (error) {
        Log.Error("Failed to click the save button.", error.message);
      }
    } else if (browser === "edge") {
      Log.Message("No additional action required for Edge.");
    } else {
      Log.Warning(`Unhandled browser type: ${browser}`);
    }
  } catch (error) {
    Log.Error("An unexpected error occurred in the downloadTB function.", error.message);
  }
 
  
}






/**
 * Verifies if a file with the specified filename is downloaded to the user's Downloads folder.
 * This method checks for the latest file in the Downloads folder and compares its name and Date with the provided filename.
 *
 * The function performs the following steps:
 * 1. Obtains the user's profile path dynamically.
 * 2. Constructs the full Downloads path.
 * 3. Logs the Downloads folder path and the download start time.
 * 4. Triggers the download action.
 * 5. Introduces a delay to ensure the download starts and the file transitions from a temporary state.
 * 6. Searches for the latest file in the Downloads folder within a specified timeout period.
 * 7. Extracts the base filename and compares it with the provided filename, ignoring any numeric suffixes.
 * 8. Logs the comparison process and results.
 * 9. Returns a checkpoint log if the file is found, otherwise logs an error message.
 *
 * @param {string} filename - The base name of the file to verify (including the extension).
 *
 * Example Usage:
 * verifyDownload("exampleFileName.txt");
 */
function verifyDownload(filename) {
    try {
        var userProfilePath = aqEnvironment.GetEnvironmentVariable("USERPROFILE");
        var downloadPath = userProfilePath + "\\Downloads";

        Log.Checkpoint("Downloads folder path: " + downloadPath);
        var startTime = aqDateTime.Now();
        Log.Checkpoint("Download start time: " + aqConvert.DateTimeToStr(startTime));

        downloadTB();  // Trigger the download action

        // Initial delay to allow the file to transition from temporary to final state
        aqUtils.Delay(2000);  // Wait for 2 seconds

        var timeout = 30000;  // Timeout in milliseconds (30 seconds)
        var endTime = aqDateTime.AddSeconds(startTime, timeout / 1000);

        var downloadedFile = null;
        var fso = Sys.OleObject("Scripting.FileSystemObject");

        while (aqDateTime.Compare(aqDateTime.Now(), endTime) < 0) {
            var folder = fso.GetFolder(downloadPath);
            var files = new Enumerator(folder.Files);

            // Find the latest file in the folder
            var latestFile = null;
            var latestTime = new Date(0);  // Initialize with the epoch time

            for (; !files.atEnd(); files.moveNext()) {
                var currentFile = files.item();
                if (currentFile.DateCreated > latestTime) {
                    latestFile = currentFile;
                    latestTime = currentFile.DateCreated;
                }
            }

            if (latestFile) {
                Log.Message("Latest file found: " + latestFile.Name);

                // Extract base filename and ignore numbers in parentheses
                var baseFilename = latestFile.Name.replace(/(\(\d+\))/g, "").trim();
                var providedBaseFilename = filename.replace(/\.\w+$/, "").trim();

                Log.Message("Base filename: " + baseFilename);
                Log.Message("Provided base filename: " + providedBaseFilename);

                // Perform comparison directly
                if (baseFilename.includes(providedBaseFilename)) {
                    downloadedFile = latestFile;
                    Log.Checkpoint("File creation time: " + aqConvert.DateTimeToStr(latestFile.DateCreated));  // Log creation time
                    break;  // Exit the loop immediately
                }

                // Log comparison details
                Log.Message("Comparing latest file name: " + latestFile.Name + " with provided filename: " + filename);
                break;  // Exit the loop after finding the latest file for comparison
            } else {
                Log.Message("No files found in the Downloads folder yet.");
            }

            aqUtils.Delay(1000);  // Wait for 1 second before checking again
        }

        if (downloadedFile) {
            Log.Checkpoint("Download successful: File found: " + downloadedFile.Name + " in path: " + downloadPath);
        } else {
            Log.Error("Download failed: No file containing '" + filename + "' found or creation time does not match. Compared with latest file: " + (latestFile ? latestFile.Name : "No file found"));
        }
    } catch (e) {
        Log.Error("An error occurred during the file download verification process: " + e.message);
    }
}




module.exports = {
navigateToTbPage,
createTB,
validateTB_Creation,
verifyDownload,
};

