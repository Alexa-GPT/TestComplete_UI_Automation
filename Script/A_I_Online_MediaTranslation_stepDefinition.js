// Import Login page methods
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



// Import Media translation methods
const { 
navigateToMediaPage,
uploadMediaFile,
verifyMediaDownload,
verifyNoErrorsMediaTranslation,
checkSourceAndTargetMedia,
translateMediaFile,
} = require('Media_translation_page');










Given("the user is logged into A.I.Online application", function (){
  performLogin();
});

Given("the user navigates to audio and video translation page", function (){
navigateToMediaPage();
});


// When step definitions
When("a valid file {string} is uploaded for translation from {string} to {string}", function (filename, sourceLanguage, targetLanguage) {
resetFileNotFoundFlag(); // Reset flag before upload  
uploadMediaFile(sourceLanguage, targetLanguage, filename);
if (skipIfFileNotFound()) {
    return; // Skip the remaining steps for this iteration
}


});


When("the file is translated from {string} to {string}", function (sourceLanguage, targetLanguage){
  if (skipIfFileNotFound()) {
  return; // Skip translation
   }  
  translateMediaFile(sourceLanguage,targetLanguage)
});

Then("there should be no errors during translation of {string} from {string} to {string}", function (filename, sourceLanguage, targetLanguage){
  if (skipIfFileNotFound()) {
  return; // Skip translation
   }  
  verifyNoErrorsMediaTranslation(filename, sourceLanguage, targetLanguage);
  checkSourceAndTargetMedia(sourceLanguage, targetLanguage)
  
});

Then("the translated file should be downloaded successfully", function (){
  if (skipIfFileNotFound()) {
  return; // Skip translation
   }  
  verifyMediaDownload();
});



Given("the user is logged into AI Online", function (){
  confirmUserLogInSuccess();
});

When("the user initiates the logout process", function (){
  userLogsOut();
});

Then("the user should log out successfully", function (){
  verifyLogOutMsg();
});

Then("the browser should close", function (){
  closeBrowser();
});

