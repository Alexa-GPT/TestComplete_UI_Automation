// Define URLs for each language and environment
const environment = Project.Variables.environment; // e.g., 'dev' or 'beta'


// This line of code determines the base URL for the application under test.
const baseUrl = environment === 'dev' 
  ? Project.Variables.devUrl 
  : (environment === 'beta' 
      ? Project.Variables.betaUrl 
      : (environment === 'uae' 
          ? Project.Variables.uaeUrl 
          : Project.Variables.prodUrl));

// Define URLs for each language
const urls = {
English: `${baseUrl}/en/login`,
French: `${baseUrl}/fr/login`,
Spanish: `${baseUrl}/es/login`,
};

// Define Contact URLs for each language
const contactUrls = {
English: Project.Variables.contactEN,
French:  Project.Variables.contactFR,
Spanish: Project.Variables.contactES,
};

// Environment-Specific Credentials
const username = environment === 'dev' 
  ? Project.Variables.devUsername 
  : environment === 'beta' 
  ? Project.Variables.betaUsername 
  : environment === 'uae' 
  ? Project.Variables.uaeUsername 
  : Project.Variables.prodUsername;

const password = environment === 'dev' 
  ? Project.Variables.devPassword 
  : environment === 'beta' 
  ? Project.Variables.betaPassword 
  : environment === 'uae' 
  ? Project.Variables.uaePassword 
  : Project.Variables.prodPassword;


// Define XPaths for web elements
const XPaths = {
emailField: "//input[@name='email']",
passwordField: "//input[@name='password']",
loginButton: "//button[@type='submit']",
usernameError: "//p[contains(text(), 'Username or Email required')]",
passwordError: "//p[contains(text(), 'Password required')]",
getInTouchLink: "//a[contains(text(), 'Get in touch')]",
panelNotistackSnackbar:'//*[@id="__next"]/div[1]/div/div/div/div/div/div[2]',
rightPanel: '//*[@id="__next"]/div/header/div/div/div[2]/div[3]/div/div',
logoutButton:"//div[@class='MuiStack-root css-gojse6']",
accountSettingElement:"//span[normalize-space()='Account Settings']",
loginButton:"//button[@type='submit']",
getInTouchButtonElement:"//a[@class='MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineNone css-1vy3sam']",
ssoButtonXPath :"//button[contains(@class, 'MuiButton-outlinedSecondary') and contains(@class, 'MuiButton-fullWidth')]",
emailInputXpath:"//input[@name='email' and @type='email']",
CloseAlertElement:"//button[@title='Close']",
IUnderstandButton: "//button[contains(@class, 'MuiButton-containedPrimary') and contains(@class, 'MuiButtonBase-root')]",
abbreviationElement:"//div[@class='MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault css-1ug2a3x']",
fullNameElement:"//*[@id='simple-tabpanel-0']/div/div/div[1]/div[2]/div[1]/div/p",

// Add more XPaths as needed
};




/**
* Closes the specified browser if it is currently open.
* 
* @param {string} browserName - The name of the browser to close (e.g., "chrome", "edge").
* 
* Purpose:
* - This method checks if the specified browser is running.
* - If the browser is running and the main window is accessible, it closes the browser.
* - If the browser is not running, or the main window isn't accessible, it does nothing.
*/
function closeBrowserIfOpen(browserName) {
  try {
      let browser;

      // Attempt to get the browser object based on the provided browser name
      switch (browserName.toLowerCase()) {
          case "chrome":
              browser = Sys.WaitBrowser("chrome", 500); // Wait for the browser instance for up to 0.5 seconds
              break;
          case "edge":
              browser = Sys.WaitBrowser("edge", 500); // Wait for the browser instance for up to 0.5 seconds
              break;
          default:
              Log.Error("Unsupported browser: " + browserName);
              return;
      }

      // Check if the browser exists
      if (browser.Exists) {
          Log.Message(browserName + " browser is open. Attempting to close the browser.");
          browser.Terminate(); // Use Terminate() to force close the browser
      } else {
          Log.Message(browserName + " browser is not running. No action taken.");
      }
  } catch (e) {
      Log.Error("Error closing " + browserName + " browser: " + e.message);
  }
}




// Reusable methods

/*

// Navigate to the login page without incognito
function navigateToLoginPage(language) {
// Validate language and URL
const url = urls[language];
if (!url) {
throw new Error(`Unsupported language: ${language}`);
}

// Check for open browser based on the provided variable
const browserToCheck = Project.Variables.browser.toLowerCase(); // Ensure case-insensitive comparison
const isOpen = Sys.WaitBrowser(browserToCheck).Exists;

if (isOpen) {
// Use Navigate for the open browser
Browsers.Item(browserToCheck).Navigate(url);
} else {
// Launch the specified browser if not open
Browsers.Item(browserToCheck).Run(url);
}

// Wait for the login page 
Aliases.browser.pageLogInAlexaTranslationsAI.Wait();
}

*/




/*
function closeBrowserInstanceIfOpen(browserName) {
// Ensure the browser name is lowercased for consistency
browserName = browserName.toLowerCase();

// Validate browser name
const supportedBrowsers = ["edge", "chrome"];
if (!supportedBrowsers.includes(browserName)) {
  throw new Error(`Unsupported browser: ${browserName}`);
}

try {
  // Check if the specified browser has an open instance
  if (Sys.WaitBrowser(browserName).Exists) {
    // Close the open instance of the specified browser
    Sys.WaitBrowser(browserName).Close();
  }
} catch (e) {
  Log.Warning(`Error checking for or closing browser instances: ${e.message}`);
}
}

*/


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




function ClickIfDisplayed() {
try {
  const page = Aliases.browser.pageDocumentTranslationAlexaTran;
  page.Wait();

  // Locate the element using FindElement and XPath from DocTransXPaths
  const IunderstandButton = page.WaitElement(XPaths.IUnderstandButton,3000);
    
  // Check if the button exists, is visible, and click it only once
  if (IunderstandButton.Exists && IunderstandButton.VisibleOnScreen) {
    Log.Message("Button 'I Understand' is visible. Attempting to click.");
    IunderstandButton.Click();
      

  } else {
    Log.Message("'I Understand' button not found or not visible.");
  }
} catch (e) {
  // Log the error if something goes wrong during execution
  Log.Error("An error occurred while clicking the 'I Understand' button: " + e.message);
}
}



// Navigate to the login page
function navigateToLoginPage(language) {
// Validate language and URL
const url = urls[language];
if (!url) {
throw new Error(`Unsupported language: ${language}`);
}

// Retrieve browser name from project variable and convert to lowercase for consistency
const browserName = Project.Variables.browser.toLowerCase();

// Validate browser name
const supportedBrowsers = ["edge", "chrome"];
if (!supportedBrowsers.includes(browserName)) {
throw new Error(`Unsupported browser: ${browserName}`);
}

closeBrowserIfOpen(browserName);

// Set the incognito mode option before checking if the browser is open
switch (browserName) {
case "edge":
    Browsers.Item(btEdge).RunOptions = "-inprivate";
    break;
case "chrome":
    Browsers.Item(btChrome).RunOptions = "-incognito";
    break;
}

// Check if the browser is already open
const isOpen = Sys.WaitBrowser(browserName).Exists;

if (isOpen) {
// Use Navigate for the open browser
Browsers.Item(browserName).Navigate(url);
} else {
// Launch the browser with the already set incognito mode
Browsers.Item(browserName).Run(url);
maximizeBrowserWindow();
}

// Wait for the login page to load
Aliases.browser.pageLogInAlexaTranslationsAI.Wait();

}






function checkAndClickRightPanel() {
  
ClickIfDisplayed();
const page = Aliases.browser.pageDocumentTranslationAlexaTran;

// Locate the element using FindElement and XPath from DocTransXPaths
const rightPanelElement = page.FindElement(XPaths.rightPanel);

// Check if the element is visible
aqObject.CheckProperty(rightPanelElement, "Visible", cmpEqual, true);

// Click the element
rightPanelElement.Click();
}




// Function to maximize browser window
function maximizeBrowserWindow() {
Aliases.browser.BrowserWindow.Maximize();
}

// Function to enter valid credentials
function enterValidCredentials() {
maximizeBrowserWindow();
const page = Aliases.browser.pageLoginAlexaTranslationsAI;
page.Wait();


// Clear and set username and password
page.textboxEmail.SetText(""); // Clear the text field
page.passwordboxPassword.SetText(""); // Clear the text field
page.textboxEmail.SetText(username);
page.passwordboxPassword.SetText(password);
}


//Validate Login Input Fields
function validateLoginInputFields() {
const page = Aliases.browser.pageLoginAlexaTranslationsAI;

aqObject.CheckProperty(page.FindElement(XPaths.loginButton), "Exists", cmpEqual, true);
aqObject.CheckProperty(page.FindElement(XPaths.emailField), "Visible", cmpEqual, true);
aqObject.CheckProperty(page.FindElement(XPaths.passwordField), "Visible", cmpEqual, true);
aqObject.CheckProperty(page.FindElement(XPaths.loginButton), "Enabled", cmpEqual, false);

Aliases.browser.Close();
}

/*
function loginUsingEmail(caseType) {
maximizeBrowserWindow();
const page = Aliases.browser.pageLoginAlexaTranslationsAI;

// Determine the email case based on the parameter
let loginEmail = Project.Variables.EmailBeta;
if (caseType.toLowerCase() === "upper") {
loginEmail = loginEmail.toUpperCase();
} else if (caseType.toLowerCase() === "lower") {
loginEmail = loginEmail.toLowerCase();
}

// Clear and set username and password
page.textboxEmail.SetText(""); // Clear the text field
page.textboxEmail.SetText(loginEmail);
page.passwordboxPassword.SetText(""); // Clear the text field
page.passwordboxPassword.SetText(password);
}
*/

function loginUsingEmail(caseType) {
maximizeBrowserWindow();
const page = Aliases.browser.pageLoginAlexaTranslationsAI;

// Determine email based on environment variable and case
let loginEmail;
const environment = Project.Variables.environment.toLowerCase(); // Ensure case-insensitive comparison
switch (environment) {
case "dev":
loginEmail = Project.Variables.EmailDev;
break;
case "beta":
loginEmail = Project.Variables.EmailBeta;
break;
case "prod":
loginEmail = Project.Variables.EmailProd;
break;
case "uae":
loginEmail = Project.Variables.EmailUae;
break;
default:
loginEmail = ""; // Initialize with an empty string to avoid "undefined" error
throw new Error(`Unsupported environment: ${environment}`); // Handle unsupported environments
}

if (caseType.toLowerCase() === "upper") {
loginEmail = loginEmail.toUpperCase();
} else if (caseType.toLowerCase() === "lower") {
loginEmail = loginEmail.toLowerCase();
}

// Clear and set username and password
page.textboxEmail.SetText(""); // Clear the text field
page.textboxEmail.SetText(loginEmail);
page.passwordboxPassword.SetText(""); // Clear the text field
page.passwordboxPassword.SetText(password);
}


// Function to click the login button
function clickLoginButton() {
const page = Aliases.browser.pageLoginAlexaTranslationsAI;
maximizeBrowserWindow();

// Define the XPath for the login button
 
// Find the login button element using FindElement and XPath
const loginButtonElement = page.FindElement(XPaths.loginButton);

// Wait for the login button to be visible with a timeout of 10 seconds
if (loginButtonElement.WaitProperty("Visible", true, 10000)) {
  // Check if the login button is enabled before clicking
  if (loginButtonElement.Enabled) {
      loginButtonElement.ClickButton();
  } else {
      Log.Error("Login button is not enabled.");
  }
} else {
  Log.Error("Login button not visible within the timeout period.");
}
}


// Function to perform logout
function userLogsOut() {
maximizeBrowserWindow();
const page = Aliases.browser.pageDocumentTranslationAlexaTran;

// Locate elements using XPath
const rightPanelElement = page.FindElement(XPaths.rightPanel); // Updated XPath
    
// Click on the right panel element to open the logout option
rightPanelElement.Click();
    
const logoutButtonElement = page.FindElement(XPaths.logoutButton); // XPath for the logout button

// Click on the logout button
logoutButtonElement.Click();

// Wait for the page to complete any necessary actions
page.Wait();
}


/**
* Verify if username and password fields are auto-filled as expected.
* @param {boolean} shouldBeAutoFilled - Whether the fields are expected to be auto-filled (true) or not (false).
*/
function verifyAutoFilledFields(shouldBeAutoFilled) {
const page = Aliases.browser.pageLoginAlexaTranslationsAI;
page.panelNeedHelp.Click();



const usernameField = page.FindElement(XPaths.emailField);
const passwordField = page.FindElement(XPaths.passwordField);

aqObject.CheckProperty(usernameField, "Text", shouldBeAutoFilled ? cmpNotEqual : cmpEqual, "");
aqObject.CheckProperty(passwordField, "Text", shouldBeAutoFilled ? cmpNotEqual : cmpEqual, "");
  
/*
This is a conditional (ternary) operator. It evaluates the shouldBeAutoFilled boolean variable:
If shouldBeAutoFilled is true, it returns cmpNotEqual.
If shouldBeAutoFilled is false, it returns cmpEqual.*/
}


// Function to click the Get in Touch button
function clickGetInTouchButton() {
let browser = Aliases.browser;
let page = browser.pageLoginAlexaTranslationsAI;  

// Find the "Get in touch" button element using FindElement and XPath
let getInTouchButtonElement = page.FindElement(XPaths.getInTouchButtonElement);

// Check if the "Get in touch" button is visible
if (getInTouchButtonElement.WaitProperty("Visible", true, 10000)) {
  maximizeBrowserWindow();
  getInTouchButtonElement.Click();
} else {
  Log.Error("Get in touch button is not visible within the timeout period.");
}
}


// Switch to the second tab
function switchToSecondTab() {
Sys.Keys("^+{Tab}"); // Ctrl+Shift+Tab
}


// Function to verify the Get in Touch page URL
function verifyGetInTouchPage(language) {
try {
// Switch to the second tab (assuming you want to verify URL after switching)
switchToSecondTab(); // Ctrl+Shift+Tab

let browser = Aliases.browser;

// Get the expected URL from the contactUrls constant
const expectedUrl = contactUrls[language];

// Access the page object of the second tab (replace with the actual name)
let secondTabPageObject;

// Based on the language, assign the appropriate page object
if (language === "English") {
secondTabPageObject = Aliases.browser.pageContactUsHowCanWeHelpYou; 
} else if (language === "French") {
// Find the French contact us page object 
secondTabPageObject = Aliases.browser.pageContactezNousCommentPouvonsN;
browser.pageContactezNousCommentPouvonsN.sectionNosCoordonnEs.panelNosCoordonnEs.Click();
} else if (language === "Spanish") {
// Find the Spanish contact us page object dynamically
secondTabPageObject = Aliases.browser.pageContactUsHowCanWeHelpYou2;
browser.pageContactUsHowCanWeHelpYou2.sectionContCtanos.textnodeContCtanos.Click();
} else {
throw new Error(`Unsupported language: ${language}`);
}
    
    
// Wait for the second tab page to load
secondTabPageObject.Wait();
 
// Get the URL from the second tab's page object
let currentUrl = secondTabPageObject.contentDocument.URL;

// Verify the URL
if (currentUrl === expectedUrl) {
Log.Checkpoint("URL verification passed. Expected URL: " + expectedUrl);
} else {
Log.Error("URL verification failed. Expected URL: " + expectedUrl + ". Current URL: " + currentUrl);
}
} finally {
// Close the browser after each test
Aliases.browser.Close();
}
}


function performSSOLoginWithRandomEmail() {
// Get reference to the browser object
const browser = Aliases.browser;

// Use FindElement to locate the email input using the provided XPath
const emailInput = browser.pageLoginAlexaTranslationsAI.FindElement(XPaths.emailInputXpath);

// Verify email input is visible before proceeding
aqObject.CheckProperty(emailInput, "Visible", cmpEqual, true);

// Maximize browser window
browser.BrowserWindow.Maximize();

// Click on the email input field
emailInput.Click();

// Generate and set a random email address
const randomEmail = Project.Variables.randomTestEmail; 
emailInput.SetText(randomEmail);

// Verify login button is enabled before clicking
const button = browser.pageLoginAlexaTranslationsAI.FindElement(XPaths.loginButton);
aqObject.CheckProperty(button, "Enabled", cmpEqual, true);

// Click the login button
button.ClickButton();
}





// Function to verify profile settings visibility
function confirmUserLogInSuccess() {

ClickIfDisplayed();  
let browser = Aliases.browser;
let header = browser.pageDocumentTranslationAlexaTran.headerTranslate;



// Verify profile settings visibility
aqObject.CheckProperty(header.textnodeSettings, "Visible", cmpEqual, true);

// Maximize browser window
browser.BrowserWindow.Maximize();
}


function verifyLogOutMsg() {
  const page = Aliases.browser.pageLoginAlexaTranslationsAI;
  page.Wait();
    
  // Find the logout message element using FindElement and XPath
  const logoutMessageElement = page.FindElement(XPaths.panelNotistackSnackbar);
    
    
  if (logoutMessageElement) {
      // Wait for the logout message to become visible with a timeout of 10 seconds
      if (logoutMessageElement.WaitProperty("Visible", true, 10000)) {
          const actualMessage = logoutMessageElement.innerText.trim(); // Get the exact message
          clickElementByXPath(XPaths.CloseAlertElement);
          Log.Checkpoint(`Logout message is visible. Found message: "${actualMessage}"`);
            
      } else {
          Log.Error("Logout message did not become visible within the timeout period.");
      }
  } else {
      Log.Error("Logout message element not found using the provided XPath.");
  }
}




/**
 * Handles dismissing the logout message by clicking the close alert button.
 * Ensures the button is found, visible, and enabled before interaction.
 */
/**
 * Handles dismissing the logout message by clicking the close alert button.
 * Ensures the button exists, is visible, and enabled before attempting interaction.
 */
function dismissLogoutMessage() {
    try {
      const page = Aliases.browser.pageLoginAlexaTranslationsAI;
      page.Wait();


        // Define a maximum timeout and polling interval for the element check
        const maxWaitTime = 10000; // 10 seconds
        const pollingInterval = 500; // 500 ms
        let elapsedTime = 0;

        // Poll for the close alert element
        let closeAlertElement;
        while (elapsedTime < maxWaitTime) {
            closeAlertElement = page.FindElement(XPaths.CloseAlertElement);
            if (closeAlertElement) {
                break; // Exit the loop if the element is found
            }
            Delay(pollingInterval); // Wait before checking again
            elapsedTime += pollingInterval;
        }

        if (!closeAlertElement) {
            Log.Warning("Close alert button not found within the timeout period. Logout message was not dismissed.");
            return;
        }

        // Check if the element is visible and enabled
        const isVisible = closeAlertElement.WaitProperty("Visible", true, 5000);
        const isEnabled = closeAlertElement.WaitProperty("Enabled", true, 5000);

        if (isVisible && isEnabled) {
            clickElementByXPath(XPaths.CloseAlertElement);
            Log.Message("Logout message dismissed successfully.");
        } else {
            Log.Warning("Close alert button is either not visible or not enabled. Logout message was not dismissed.");
        }
    } catch (e) {
        Log.Error(`Error while dismissing the logout message: ${e.message}`);
    }
}



function verifyLogOutMsgs(expectedLogoutMsg) {
    const page = Aliases.browser.pageLoginAlexaTranslationsAI;
    page.Wait();

    // Find the logout message element using FindElement and XPath
    const logoutMessageElement = page.WaitElement(XPaths.panelNotistackSnackbar, 3000);

    if (logoutMessageElement) {
        // Wait until the element is both visible and enabled
        const timeout = 10000; // 10 seconds
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            if (logoutMessageElement.Visible && logoutMessageElement.Enabled) {
                Log.Message("Logout message element is now visible and enabled.");
                break;
            }
            Delay(500); // Check every 500ms to avoid high CPU usage
        }

        if (!logoutMessageElement.Visible || !logoutMessageElement.Enabled) {
            Log.Error("Logout message element did not become visible and enabled within the timeout period.");
            return;
        }

        // Retrieve and log the actual message
        let actualMessage;
        try {
            actualMessage = logoutMessageElement.innerText.trim(); // Get the exact message
            Log.Checkpoint(`Retrieved logout message: "${actualMessage}"`);
        } catch (error) {
            Log.Error("Failed to retrieve the logout message. Check the element's properties.");
            return;
        }
       
        dismissLogoutMessage();


        // Compare the actual message with the expected one
        if (actualMessage === expectedLogoutMsg) {
            Log.Checkpoint(`Logout message is correct. Found message: "${actualMessage}"`);
        } else {
            Log.Error(`Logout message does not match the expected message. Expected: "${expectedLogoutMsg}", but found: "${actualMessage}"`);
        }
    } else {
        Log.Error("Logout message element not found using the provided XPath.");
    }
}




function clickElementByXPath(xpath, timeout = 30000) {
    const page = Aliases.browser.pageLoginAlexaTranslationsAI; // Adjust if needed
    const startTime = aqDateTime.Now();
    let elapsedTime = 0;
    let element;
    const maxAttempts = 3; // Maximum number of attempts
    let attempts = 0;

    while (elapsedTime < timeout && attempts < maxAttempts) {
        try {
            // Attempt to find the element
            element = page.WaitElement(xpath,10000);

            // Check if the element exists and is visible
            if (element.Exists && element.VisibleOnScreen) {
                if (element.WaitProperty("Enabled", true, 5000)) {
                    // Click the element
                    element.Click();
                    Log.Checkpoint(`Successfully clicked the element located by XPath: ${xpath}`);
                    return;
                }
            }
        } catch (e) {
            // Log if the element isn't found yet and retry
            Log.Message(`Attempt ${attempts + 1}: Element located by XPath: ${xpath} is not ready yet.`);
        }

        // Wait for a short interval before retrying
        aqUtils.Delay(1000);
        
        // Update elapsed time and increment attempts
        elapsedTime = aqDateTime.Now() - startTime;
        attempts++;
    }

    // Log error if the element could not be clicked within the attempts or timeout
    Log.Error(`Element located by XPath: ${xpath} is not clickable within the timeout period of ${timeout / 1000} seconds or after ${maxAttempts} attempts.`);
}



// Function to close the browser
function closeBrowser() {
Aliases.browser.Close();
}

// check which browser and launch it in incognito accordingly
function launchIncognitoAndNavigate() {
// Retrieve browser name from project variable
const browserName = Project.Variables.browser.toLowerCase();

// Validate browser name
const supportedBrowsers = ["edge", "chrome"]; // Adjust list as needed
if (!supportedBrowsers.includes(browserName)) {
throw new Error(`Unsupported browser: ${browserName}`);
}

// Launch the chosen browser in incognito mode
switch (browserName) {
case "edge":
Browsers.Item(btEdge).RunOptions = "-inprivate";
Browsers.Item(btEdge).Run();
navigateToLoginPage("English"); // Call with default language
break;
case "chrome":
Browsers.Item(btChrome).RunOptions = "-incognito";
Browsers.Item(btChrome).Run();
navigateToLoginPage("English"); // Call with default language
break;
}
}


function clickContinueWithSSO() {
// Get reference to the browser object
const browser = Aliases.browser;
// Find the "Continue with SSO" button using XPath
const button = browser.pageLoginAlexaTranslationsAI.FindElement(XPaths.ssoButtonXPath);

// Verify the button is visible before clicking
if (button.WaitProperty("Visible", true, 5000)) {
  // Click the "Continue with SSO" button
  button.ClickButton();
} else {
  Log.Error("The 'Continue with SSO' button is not visible or could not be found.");
}
}


// Method to focus and unfocus input fields with visibility checks 
function simulateEmptyLoginFieldsAlerts()
{
let browser = Aliases.browser;
let page = browser.pageLoginAlexaTranslationsAI;
let textbox = page.textboxEmail2;
aqObject.CheckProperty(textbox, "Visible", cmpEqual, true);
let passwordBox = page.passwordboxPassword;
aqObject.CheckProperty(passwordBox, "Visible", cmpEqual, true);
browser.BrowserWindow.Maximize();
textbox.Click();
textbox.Keys("[Tab]");
passwordBox.Keys("[Tab]");
};

  
// Function to check error messages and login button state
function ValidateEmptyLoginFields() {
const page = Aliases.browser.pageLoginAlexaTranslationsAI;

aqObject.CheckProperty(page.FindElement(XPaths.usernameError), "contentText", cmpEqual, "Username or Email required");
aqObject.CheckProperty(page.FindElement(XPaths.passwordError), "contentText", cmpEqual, "Password required");
aqObject.CheckProperty(page.FindElement(XPaths.loginButton), "Enabled", cmpEqual, false);
}


// Function to retrieve full name from element
function GetFullNameFromElement(element) {
if (element.Exists && element.Visible) {
element.WaitProperty("Visible", true, 10000); // Wait for the element to be visible

// Use .contentText to retrieve the text content of the element
let textValue = element.contentText;
    
} else {
Log.Error("Element not found or not visible!");
return "";
}
}
// Function to generate initials from full name
function GetInitialsFromFullName(fullName) {
if (!fullName) {
return "";
}

// Replace non-breaking spaces with regular spaces (assuming UTF-8 encoding)
let replacedName = fullName.replace(/\u00A0/g, " "); // Replace non-breaking space character

// Split the full name into parts (handling potential special characters)
let nameParts = replacedName.trim().split(/\s+/); // Split on one or more whitespace characters

// Initialize an empty string to store initials
let initials = "";

// Iterate through each part (word) of the name
for (let part of nameParts) {
// Extract the first character of each part and add it to the initials string
initials += part.charAt(0);
}

// Convert initials to uppercase
return initials.toUpperCase();

}



// Function to navigate to the settings page
function navigateToSettingPage() {

const page = Aliases.browser.pageDocumentTranslationAlexaTran;


// Locate the element using FindElement and XPath from DocTransXPaths
const rightPanelElement = page.FindElement(XPaths.rightPanel);

// Check if the element is visible
aqObject.CheckProperty(rightPanelElement, "Visible", cmpEqual, true);

// Click the element
rightPanelElement.Click();

const accountSettingElement = page.FindElement(XPaths.accountSettingElement); 

accountSettingElement.Click();


}



function verifyUsernameAbbreviation() {
try {
const environment = Project.Variables.environment; // e.g., 'dev' or 'beta', 'prod"
const baseUrl = environment === 'dev' 
  ? Project.Variables.devUrl 
  : environment === 'beta' 
  ? Project.Variables.betaUrl 
  : environment === 'uae'
  ? Project.Variables.uaeUrl 
  : Project.Variables.prodUrl;


const settingsPageUrl = `${baseUrl}/en/account/settings`;

// Retrieve text content from elements
let nametextContent = Aliases.browser.Page(settingsPageUrl).FindElement(XPaths.fullNameElement).contentText;
let rightPanelElement = Aliases.browser.Page(settingsPageUrl).FindElement(XPaths.abbreviationElement).contentText;

// Generate initials from the full name
let generatedInitials = GetInitialsFromFullName(nametextContent);

// Log the retrieved values
Log.Message(`Full Name Text: ${nametextContent}`);
Log.Message(`Right Panel Text: ${rightPanelElement}`);
Log.Message(`Generated Initials: ${generatedInitials}`);

// Compare the generated initials with the displayed initials
if (rightPanelElement === generatedInitials) {
Log.Checkpoint("Initials comparison successful.");
} else {
Log.Error(`Initials comparison failed: Expected ${generatedInitials}, but got ${rightPanelElement}`);
}
} catch (e) {
Log.Error(`Error occurred during verification: ${e.message}`);
} finally {
userLogsOut(); // Logout regardless of success or failure
closeBrowser(); 
}
}



// Function to enter username and password with specific space configurations
function enterCredentialsWithSpaces(username, password, spacePosition) {
const page = Aliases.browser.pageLoginAlexaTranslationsAI;
page.Wait();
maximizeBrowserWindow();

// Log the original username and password
Log.Message(`Original username: ${username}`);
Log.Message(`Original password: ${password}`);

// Determine the username based on spacePosition
let modifiedUsername = username;

switch (spacePosition) {
case "beginning":
modifiedUsername = " " + username;
break;
case "end":
modifiedUsername = username + " ";
break;
case "middle":
const midPositionUser = Math.floor(username.length / 2);
modifiedUsername = username.slice(0, midPositionUser) + " " + username.slice(midPositionUser);
break;
default:
throw new Error(`Unsupported space position: ${spacePosition}`);
}

// Log the modified username
Log.Message(`Modified username: ${modifiedUsername}`);

// Enter modified username into field
page.textboxEmail.SetText(modifiedUsername);

// Clear password field before setting new value
page.passwordboxPassword.SetText("");

// Set password with spaces based on spacePosition
let modifiedPassword = password.DecryptedValue; // Ensure password is decrypted

switch (spacePosition) {
case "beginning":
modifiedPassword = " " + modifiedPassword;
break;
case "end":
modifiedPassword += " ";
break;
case "middle":
const midPositionPwd = Math.floor(modifiedPassword.length / 2);
modifiedPassword = modifiedPassword.slice(0, midPositionPwd) + " " + modifiedPassword.slice(midPositionPwd);
break;
default:
// If no modification needed, do nothing
}

// Log the modified password
Log.Message(`Modified password: ${modifiedPassword}`);

// Enter modified password into field
page.passwordboxPassword.SetText(modifiedPassword);

// Log the entry action
Log.Message(`Entered username: ${modifiedUsername}`);
Log.Message(`Entered password: ${password}`);
}


// Example usage:
// enterCredentialsWithSpaces(username, password, "middle");








function loginShouldFail() {
const expectedMessages = Project.Variables.expectedAlertMsgs.split('|'); // Split the variable by '|'
const page = Aliases.browser.pageLoginAlexaTranslationsAI;

// Locate the element using FindElement and XPath
const panelNotistackSnackbarElement = page.FindElement(XPaths.panelNotistackSnackbar);
const closeAlertMsg = page.FindElement(XPaths.CloseAlertElement);
// Wait for the element to be visible with a timeout of 10 seconds
if (panelNotistackSnackbarElement.WaitProperty("Visible", true, 10000)) {
  // Get the actual text of the snackbar element
  const actualText = panelNotistackSnackbarElement.contentText.trim(); // Trim spaces from actual text
  closeAlertMsg.click();

  let foundMessage = null;

  // Check if the actual text matches any of the expected messages
  for (let i = 0; i < expectedMessages.length; i++) {
    const expectedMessage = expectedMessages[i].trim(); // Trim spaces from expected message
    if (actualText === expectedMessage) { // Use exact equality for comparison
      foundMessage = expectedMessages[i].trim(); // Store the matched message
      break;
    }
  }

  if (foundMessage) {
    Log.Message(`The expected message was found: "${foundMessage}"`);
  } else {
    Log.Error(`None of the expected messages matched the snackbar contentText. Actual content: "${panelNotistackSnackbarElement.contentText}"`);
  }
} else {
  Log.Error("Snackbar element not found or not visible within the timeout period");
}
}





// Function to generate random credentials and enter them
function enterRandomCredentials() {
var usernameLength = 8; // Default length for username
var passwordLength = 8; // Default length for password

// Function to generate a random string of specified length
function generateRandomString(length) {
var result = '';
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var charactersLength = characters.length;
for (var i = 0; i < length; i++) {
result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;
}

// Generate random credentials
var username = "user_" + generateRandomString(usernameLength);
var password = generateRandomString(passwordLength);

// Enter random credentials
maximizeBrowserWindow();
const page = Aliases.browser.pageLoginAlexaTranslationsAI;
page.Wait();

// Clear and set username and password
page.textboxEmail.SetText(""); // Clear the text field
page.passwordboxPassword.SetText(""); // Clear the text field
page.textboxEmail.SetText(username);
page.passwordboxPassword.SetText(password);
}





module.exports = {
navigateToLoginPage,
maximizeBrowserWindow,
enterValidCredentials,
clickLoginButton,
userLogsOut,
verifyLogOutMsg,
verifyAutoFilledFields,
clickGetInTouchButton,
switchToSecondTab,
verifyGetInTouchPage,
performSSOLoginWithRandomEmail,
confirmUserLogInSuccess,
enterCredentialsWithSpaces,
validateLoginInputFields,
loginShouldFail,
enterRandomCredentials,
simulateEmptyLoginFieldsAlerts,
verifyUsernameAbbreviation,
navigateToSettingPage,
GetFullNameFromElement,
GetInitialsFromFullName,
clickContinueWithSSO, 
loginUsingEmail,
closeBrowser,
launchIncognitoAndNavigate,
ValidateEmptyLoginFields,
XPaths,
environment,
baseUrl,
urls,
contactUrls,
username,
password,
checkAndClickRightPanel,
verifyLogOutMsgs,
performLogin,
  
};