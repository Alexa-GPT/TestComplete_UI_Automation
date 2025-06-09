




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


const { 

performLogout,

} = require('Text_translation_page');




const {
navigateToTbPage,
createTB,
validateTB_Creation,
verifyDownload,
}= require('Term_Bases_page');


// XlSX


Given("The user is now signed in to A.I.Online", function (){
performLogin();
});

Given("the user navigates to the Term Bases page", function (){
navigateToTbPage();
});

When("the user uploads a valid document {string} from {string} to {string}", function (filename, source, target){
      
createTB(source,target,filename,"xlsx");
});

Then("the Term Base creation for {string} from {string} to {string} should complete without errors", function (document, source, target){
validateTB_Creation();
});


Then("the created Term Base for {string} should be downloaded successfully in XLSX format", function (filename){
verifyDownload(filename);
});


//TBX



When("the user provides a valid TM  {string} from {string} to {string}", function (filename, source, target){
createTB(source, target,filename,"tbx");
});

Then("the Term Base creation for {string} from {string} to {string} completes successfully without errors", function (document, source, target){
validateTB_Creation();
});

Then("the Term Base for {string} is downloaded in TBX format", function (filename){
 verifyDownload(filename);
});


//Text

When("a valid document {string} is uploaded  from {string} to {string}", function (filename, source, target){
 createTB(source, target,filename,"text");
});

Then("the Term Base creation process for {string} from {string} to {string} should succeed without any issues", function (document, source, target){
validateTB_Creation();
});

Then("the generated Term Base for {string} should be successfully downloaded in Text format", function (filename){
verifyDownload(filename);
});


// All formats

When("the user uploads a valid file {string} from {string} to {string},", function (filename, source, target){
createTB(source, target,filename,"all");
});

Then("the Term Base creation for {string} from {string} to {string} should be completed without errors,", function (document, source, target){
validateTB_Creation();
});

Then("the created Term Base for {string} should be successfully downloaded in all formats.", function (filename){
verifyDownload(filename);
});


// Logging out

When("the user logs out from A.I Online", function (){
performLogout();
});
