//Text Translation Page

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






// Define XPaths for web elements used in Text translation
const TextXpaths = {
uploadElement: "//div[@class='MuiStack-root css-1eumy8e']",
pendoButton : "//button[@id='pendo-button-541e19df']",
targetDiv : "//div[@class='MuiBox-root css-aze4rp']",
targetDropDown :"(//span[contains(@class, 'MuiTypography-root') and contains(@class, 'MuiTypography-body1') and text() = 'keyboard_arrow_down'])[5]",
targetFrench :"(//p[contains(@class, 'MuiTypography-root') and contains(@class, 'MuiTypography-body1') and text()='French'])[2]",
targetSpanish :"(//p[contains(@class, 'MuiTypography-root') and contains(@class, 'MuiTypography-body1') and text()='Spanish'])[2]",
targetEnglish :"(//p[contains(@class, 'MuiTypography-root') and contains(@class, 'MuiTypography-body1') and text()='English'])[2]",
sourceFrench :"(//p[contains(@class, 'MuiTypography-root') and contains(@class, 'MuiTypography-body1') and text()='French'])[1]",
sourceSpanish :"(//p[contains(@class, 'MuiTypography-root') and contains(@class, 'MuiTypography-body1') and text()='Spanish'])[1]",
sourceEnglish :"(//p[contains(@class, 'MuiTypography-root') and contains(@class, 'MuiTypography-body1') and text()='English'])[1]",
clearText : "//span[@class='MuiTypography-root MuiTypography-body1 material-icons-outlined undefined css-j8snt4']",
copyButton :"//span[normalize-space()='copy_all_outlined']",
targetSpan :"//span[text()='Translation']",
sourceDropDown :"(//span[contains(@class, 'MuiTypography-root') and contains(@class, 'MuiTypography-body1') and text() = 'keyboard_arrow_down'])[4]",
ErrorNotification : "//div[@class='MuiAlert-message css-1xsto0d']",
translatePagesDropDown :"//div[@class='MuiStack-root css-hp68mp']//div[1]//div[1]//div[1]//p[1]//span[1]",
textPageLink:"//li[normalize-space()='Text']",
};


// List of supported source and target languages
const supportedLanguages = [
"Arabic", 
"Chinese Simplified", 
"Dutch", 
"German", 
"Italian", 
"Japanese", 
"Korean", 
"Portuguese", 
"Turkish",
"English",  
"French",   
"Spanish"   
];





// Global browser instance
const browser = getBrowser();


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


function navigateToTextTranslation() {
let browser = Aliases.browser;
  const page = browser.pageDocumentTranslationAlexaTran.headerTranslate;
 


  try {
    // Click on the Translate Pages dropdown
    let translatePagesDropDown = page.WaitElement(TextXpaths.translatePagesDropDown,2000);
    translatePagesDropDown.Click();
    Log.Message("Translate Pages dropdown clicked successfully.");

    // Click on the Text Page link
    let textPageLink = page.WaitElement(TextXpaths.textPageLink,2000);
    textPageLink.Click();
    Log.Message("Text Page link clicked successfully.");

    // Perform additional checks or actions using ClickIfDisplayed
    ClickIfDisplayed();
    Log.Message("ClickIfDisplayed executed successfully.");
  } catch (error) {
    Log.Error("Failed to navigate to the Text Translation page. Error: " + error.message);
  }

}


function ClickIfDisplayed() {
const page = Aliases.browser.pageLoginAlexaTranslationsAI2;
page.Wait();

// Attempt to locate the button using FindChild without throwing an error
const pendoButton = page.FindChild(["XPath"], [TextXpaths.pendoButton], 1000);

// Check if the button exists and is visible
if (pendoButton && pendoButton.Exists && pendoButton.VisibleOnScreen) {
Log.Message("Button 'I Understand' is visible. Attempting to click.");
pendoButton.Click();
} else {
Log.Message("'I Understand' button not found or not visible. No action taken.");
}
}



/******
* This function automates the process of translating text between a source and target language.
* - It first loads text data from a JSON file, selects the appropriate content for the given source language, 
*   and prepares the content for translation.
* - The function verifies that the "Detect Language" button is visible and that the translation panel exists.
* - It then maximizes the browser window and selects the target language via the `selectTargetLanguage` method.
* - Finally, it copies the content to the clipboard, pastes it into the translation panel, and logs the action.
* -We used copy/paste because it was much faster than send Keys and to avoid encoding problems.
*/
function translateText(sourceLanguage, targetLanguage, mode) {
let browser = Aliases.browser;
let page = browser.pageLoginAlexaTranslationsAI2;

// Load the JSON file dynamically
const testDataPath = Project.Variables.text_translation;
const testData = aqFile.ReadWholeTextFile(testDataPath, aqFile.ctUTF8);
const languageContent = JSON.parse(testData);

// Verify that the Detect Language button is visible
if (mode !== "manual") {
  aqObject.CheckProperty(page.buttonDetectLanguage, "Visible", cmpEqual, true);
}

// Find the appropriate content based on the source language
let contentArray = languageContent.sourceLanguages[sourceLanguage].content;
let contentText = contentArray.join(" "); // Join all sentences into a single string

// Maximize the browser window and interact with the panel
browser.BrowserWindow.Maximize();
let panel = page.panelMicNoneOutlined;
aqObject.CheckProperty(panel, "Exists", cmpEqual, true);

// Call selectSourceLanguage only if mode is "manual"
if (mode === "manual") {
  selectSourceLanguage(sourceLanguage);
}

// Select target language 
selectTargetLanguage(targetLanguage);

// Copy content to clipboard and paste it
Sys.Clipboard = contentText;
panel.Click();
panel.Keys("^v");  // Paste using Ctrl + V
Log.Checkpoint("Text Entered for Translation: '" + contentText + "'"); // Log the content being pasted
}










/******
 * This function waits for the translation process to complete and retrieves the translated text from the specified target div.
 * 
 * - First, it locates the "Translation" span within the target div and waits for it to become invisible, indicating that the translation is finished.
 *   If the span does not become invisible within 30 seconds, a warning is logged.
 * 
 * - Then, it checks for the presence of the "Copy" button. If the button is not found after waiting for 30 seconds, an error is logged,
 *   and the test runner is stopped, indicating the translation has failed.
 * 
 * - If the "Copy" button is enabled (up to 2 minutes wait), it logs a checkpoint confirming that the text has been translated successfully.
 * 
 * - It collects all spans inside the target div, filters out unwanted span texts, and concatenates the remaining text.
 * 
 * - Finally, it returns true if the translated text is successfully retrieved; otherwise, it logs warnings and returns false.
 */




function waitForTranslationAndRetrieveText(targetDivXPath) {
  let browser = Aliases.browser;
  let page = browser.pageLoginAlexaTranslationsAI2;

  // Locate the target div
  let targetDiv = page.FindElement(targetDivXPath);
    
  // Wait until the "Translation" span is no longer visible
  let translationSpan = targetDiv.WaitElement(TextXpaths.targetSpan,30000);
    
  if (translationSpan.WaitProperty("VisibleOnScreen", false, 30000)) {
      Log.Checkpoint("Target Div is now enabled.");
        
      // Now check if the copy button element is present and enabled
      let copyButtonSpan = targetDiv.WaitElement(TextXpaths.copyButton,60000);
      
        if (!copyButtonSpan.Exists) {
            Log.Error('Could not find the Copy Button after waiting for 60 Seconds which indicates the translation failed. Terminating the test.');
            Runner.Stop();
            }
        
      if (copyButtonSpan.WaitProperty("Enabled", true, 120000)) { 
          Log.Checkpoint("Text translated successfully, and the copy button is enabled.");

          // Get all spans inside the target div
          let spans = targetDiv.FindElements(".//span"); // Use relative XPath to find all spans
            
          // Initialize a variable to collect the translated text
          let translatedText = "";

          // Define unwanted span text patterns
          const unwantedTexts = ["volume_up_outline", "edit_outline", "bookmark_added_outlined", "copy_all_outlined"];
            
          // Loop through each span and concatenate the text
          for (let i = 0; i < spans.length; i++) {
              let spanText = spans[i].contentText.trim();
              // Check if the span text is not in the unwantedTexts array
              if (!unwantedTexts.includes(spanText)) {
                  translatedText += spanText + " "; // Add a space for separation
              }
          }

          translatedText = translatedText.trim(); // Trim any extra spaces

          // Check if the translated text is not empty
          if (translatedText.length > 0) {
              Log.Checkpoint("Retrieved translated text: '" + translatedText + "'");
              return true; // Successfully retrieved the translated text
          } else {
              Log.Warning("No translated text found.");
          }
      } else {
          Log.Warning("The copy button span is not enabled within the 2-minute timeout.");
      }
  } else {
      Log.Warning("Failed to wait for the translation span to become invisible within the timeout period.");
  }

  return false; // Return false if no translated text was retrieved
}





function waitForLanguageDetection(sourceLanguage) {
let browser = Aliases.browser;
let page = browser.pageLoginAlexaTranslationsAI2;

// Define the expected text for the detection status dynamically
let expectedText = sourceLanguage + " - Detected";

// Wait for the text in the element to change to the expected value
let detectLangElement = page.FindElement(`//p[normalize-space()='${expectedText}']`);

// Wait for the property 'contentText' to match the expected text for up to 90 seconds
let success = detectLangElement.WaitProperty("contentText", expectedText, 90000);

// Log the result based on whether the expected text was found
if (success) {
    Log.Checkpoint("Text successfully changed to: " + expectedText);
} else {
    let foundText = detectLangElement.contentText;
    Log.Warning("Expected text: '" + expectedText + "' but found: '" + foundText + "'");
}
}







function waitForElementToBeClickable(xpath, timeout = 300000) {
const page = Aliases.browser.pageLoginAlexaTranslationsAI2; // Adjust this if your page object differs
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


function clickElementByXPath(xpath, timeout = 30000) {
const page = Aliases.browser.pageLoginAlexaTranslationsAI2; // Adjust this if your page object differs
  
// Find the element using the provided XPath
const element = page.FindElement(xpath);

// Wait for the element to be visible and enabled before clicking
if (element.WaitProperty("VisibleOnScreen", true, timeout) && element.WaitProperty("Enabled", true, timeout)) {
// Click the element
element.Click();
Log.Message("Text was Cleared Successfully");
} else {
Log.Error(`Element located by XPath: ${xpath} is not clickable within the timeout period of ${timeout / 1000} seconds.`);
}
}




/******
* This function selects the target language in the web application.
* - For predefined languages (English, French, Spanish), it selects the corresponding button using a predefined XPath.
* - For other languages, it opens a dropdown menu and attempts to click on the target language.
* - It retries clicking up to 3 times if the language option is not immediately clickable, logging success or failure.
*/


function selectTargetLanguage(targetLanguage) {
let buttonXPath;

// Define button XPath based on target language
if (["English", "French", "Spanish"].includes(targetLanguage)) {
    buttonXPath = TextXpaths[`target${targetLanguage}`]; // Dynamically get the button XPath
} else {
    // Open the dropdown for unsupported languages
    const dropDownElement = Aliases.browser.pageLoginAlexaTranslationsAI2.FindElement(TextXpaths.targetDropDown);

    if (dropDownElement.Exists && dropDownElement.VisibleOnScreen) {
        dropDownElement.Click();
        Log.Checkpoint("Dropdown opened.");

        // Dynamic XPath for unsupported language
        const dynamicXPath = `//li[contains(@class, 'MuiMenuItem-root') and normalize-space()='${targetLanguage}']`;
        waitForElementToBeClickable(dynamicXPath);

        const targetElement = Aliases.browser.pageLoginAlexaTranslationsAI2.FindElement(dynamicXPath);
        const maxAttempts = 3; // Set maximum attempts for clicking
        let attempts = 0;

        // Retry clicking on the target element if it exists
        while (attempts < maxAttempts) {
            if (targetElement.Exists && targetElement.VisibleOnScreen) {
                targetElement.Click();
                Log.Checkpoint("Clicked on " + targetLanguage + " from dropdown.");
                return; // Exit after successful click
            } else {
                Log.Message("Attempt " + (attempts + 1) + ": Language option not found in dropdown: " + targetLanguage);
                aqUtils.Delay(1000); // Wait before the next attempt
                attempts++;
            }
        }
        Log.Error("Language option could not be clicked after multiple attempts: " + targetLanguage);
        return; // Exit if language option was not found
    } else {
        Log.Error("Dropdown button not found or not visible.");
        return; // Exit if dropdown can't be opened
    }
}

// Click the button for supported languages
const buttonElement = Aliases.browser.pageLoginAlexaTranslationsAI2.FindElement(buttonXPath);

if (buttonElement.Exists && buttonElement.VisibleOnScreen) {
    buttonElement.Click();
} else {
    Log.Error("Button for " + targetLanguage + " not found or not visible.");
}
}



function selectSourceLanguage(sourceLanguage) {
let buttonXPath;

// Define button XPath based on source language
if (["English", "French", "Spanish"].includes(sourceLanguage)) {
    buttonXPath = TextXpaths[`source${sourceLanguage}`]; // Dynamically get the button XPath
} else {
    // Open the dropdown for unsupported languages
    const dropDownElement = Aliases.browser.pageLoginAlexaTranslationsAI2.FindElement(TextXpaths.sourceDropDown);

    if (dropDownElement.Exists && dropDownElement.VisibleOnScreen) {
        dropDownElement.Click();
        Log.Checkpoint("Source language dropdown opened.");

        // Dynamic XPath for unsupported language
        const dynamicXPath = `//li[contains(@class, 'MuiMenuItem-root') and normalize-space()='${sourceLanguage}']`;
        waitForElementToBeClickable(dynamicXPath);

        const sourceElement = Aliases.browser.pageLoginAlexaTranslationsAI2.FindElement(dynamicXPath);
        const maxAttempts = 3; // Set maximum attempts for clicking
        let attempts = 0;

        // Retry clicking on the source element if it exists
        while (attempts < maxAttempts) {
            if (sourceElement.Exists && sourceElement.VisibleOnScreen) {
                sourceElement.Click();
                Log.Checkpoint("Clicked on " + sourceLanguage + " from the dropdown.");
                return; // Exit after successful click
            } else {
                Log.Message("Attempt " + (attempts + 1) + ": Language option not found in dropdown: " + sourceLanguage);
                aqUtils.Delay(1000); // Wait before the next attempt
                attempts++;
            }
        }
        Log.Error("Source language option could not be clicked after multiple attempts: " + sourceLanguage);
        return; // Exit if source language option was not found
    } else {
        Log.Error("Source language dropdown button not found or not visible.");
        return; // Exit if dropdown can't be opened
    }
}
  
// Click the button for supported languages
const buttonElement = Aliases.browser.pageLoginAlexaTranslationsAI2.FindElement(buttonXPath);

if (buttonElement.Exists && buttonElement.VisibleOnScreen) {
    buttonElement.Click();
} else {
    Log.Error("Button for " + targetLanguage + " not found or not visible.");
}
}









function verifyTranslationSuccess(sourceLanguage, mode) {
// Always execute this
waitForTranslationAndRetrieveText(TextXpaths.targetDiv); // Retrieve translated text

// Skip waitForLanguageDetection if mode is "manual"
if (mode !== "manual") {
  // Only run this if mode is NOT manual
  waitForLanguageDetection(sourceLanguage); // Source language detected
} else {
  Log.Message("Skipping language detection as mode is 'manual'.");
}

// Clear text in source so we can test next language direction
clickElementByXPath(TextXpaths.clearText);
}




function closeBrowser()
{
Aliases.browser.Close();
}


function performLogout()
{  
userLogsOut();
verifyLogOutMsg();
closeBrowser();
}




// Function to check if both languages are supported
function areLanguagesSupported(source, target) {
  return supportedLanguages.includes(source) && supportedLanguages.includes(target);
}





module.exports = {
navigateToTextTranslation,
translateText,
verifyTranslationSuccess,
performLogout,
areLanguagesSupported,

};

