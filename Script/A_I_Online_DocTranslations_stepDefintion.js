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

// Import document translation methods
const { 
getBrowser,
uploadFile,
navigateToDocumentPage,
translateDocument,
verifyNoErrors,
verifyDownload, 
waitForElementToDisappearByXPath,
checkSourceAndTarget,
performLogin,
closeBrowser,
resetFileNotFoundFlag,
skipIfFileNotFound
} = require('Document_translation_page');









// Given step definitions
Given("the user is logged into A.I.Online", function () {
performLogin(); // Ensure login is performed
    

});

Given("the user navigates to the document translation page", function () {
navigateToDocumentPage();
});

// When step definitions
When("a valid document {string} is uploaded for translation from {string} to {string}", function (filename, sourceLanguage, targetLanguage) {
resetFileNotFoundFlag(); // Reset flag before upload
uploadFile(sourceLanguage, targetLanguage, filename);

if (skipIfFileNotFound()) {
    return; // Skip the remaining steps for this iteration
}

});

When("the document is translated from {string} to {string}", function (sourceLanguage, targetLanguage) {

if (skipIfFileNotFound()) {
  return; // Skip translation
   }  
translateDocument(sourceLanguage, targetLanguage);
});

// Then step definitions
Then("there should be no errors during the translation of {string} from {string} to {string}", function (filename, sourceLanguage, targetLanguage) {
  
if (skipIfFileNotFound()) {
    return; // Skip translation
}  
verifyNoErrors(filename, sourceLanguage, targetLanguage);
checkSourceAndTarget(sourceLanguage, targetLanguage)
});

Then("the translated file should be downloaded correctly", function () {
  
if (skipIfFileNotFound()) {
    return; // Skip translation
}  
verifyDownload(); 
});


Given("a user is logged into AI Online", function (){
confirmUserLogInSuccess();
});

When("logging out", function (){
userLogsOut();
  
});

Then("the user should be able to log out successfully", function (){
verifyLogOutMsg();
});


Then("the browser closes", function (){
closeBrowser();
});

