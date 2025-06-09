//Text Translation Step definition

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

const { 
navigateToTextTranslation,
translateText,
verifyTranslationSuccess,
performLogout,
areLanguagesSupported,

} = require('Text_translation_page');





Given("the user is logged into the Alexa Translations application", function (){
 performLogin();
});

Given("the user navigates to the text translation page", function (){
navigateToTextTranslation();

});

When("text is entered for translation from {string} to {string}", function (source, target){
  
// Check if the languages are supported
  if (!areLanguagesSupported(source, target)) {
      Log.Warning(`Skipping verification due to unsupported languages: Source - ${source}, Target - ${target}`);
      return; // Skip execution of the following line
  }
  
// Proceed with Translation if both languages are supported  
translateText(source,target);
  
});


Then("there should be no translation errors using the detect language option from {string} to {string}", function (source, target){
  
// Check if the languages are supported
  if (!areLanguagesSupported(source, target)) {
      Log.Warning(`Skipping verification due to unsupported languages: Source - ${source}, Target - ${target}`);
      return; // Skip execution of the following line
  }

// Proceed with verification if both languages are supported
verifyTranslationSuccess(source,target);
});





// Manual Source Language Selection Scenario

When("custom text is entered for translation from {string} to {string}", function (source, target){
  // Check if the languages are supported
  if (!areLanguagesSupported(source, target)) {
      Log.Warning(`Skipping verification due to unsupported languages: Source - ${source}, Target - ${target}`);
      return; // Skip execution of the following line
  }
  
// Proceed with Translation if both languages are supported  
translateText(source,target,"manual");
});

Then("the translation should meet the specific criteria from {string} to {string}", function (source, target){
 // Check if the languages are supported
  if (!areLanguagesSupported(source, target)) {
      Log.Warning(`Skipping verification due to unsupported languages: Source - ${source}, Target - ${target}`);
      return; // Skip execution of the following line
  }

// Proceed with verification if both languages are supported
verifyTranslationSuccess(source,"manual");
});


// Logout Scenario 

When("the user logs out from the Alexa Translations application", function (){
performLogout();
});
