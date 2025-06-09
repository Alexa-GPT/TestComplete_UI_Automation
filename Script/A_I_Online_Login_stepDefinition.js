const { 
    navigateToLoginPage,
    enterValidCredentials,
    clickLoginButton,
    userLogsOut,
    verifyLogOutMsg,
    verifyAutoFilledFields,
    clickGetInTouchButton,
    verifyGetInTouchPage,
    performSSOLoginWithRandomEmail,
    confirmUserLogInSuccess,
    enterCredentialsWithSpaces,
    loginShouldFail,
    enterRandomCredentials,
    validateLoginInputFields,
    maximizeBrowserWindow,
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
    
} = require('Login_page');


/////***************************************************************Step Defintions*************************************************************************** 

// Step: Given the user is on the A.I.Online login page for <language>
Given("the user is on the A.I.Online login page for {string}", function (language) {
navigateToLoginPage(language);
});

// Step: When valid username and password are entered
When("valid username and password are entered", function () {
enterValidCredentials();
});

// Step: And the sign in button is clicked
When("the sign in button is clicked", function () {
clickLoginButton();
});

// Step: And the user name is clicked on the right side
When("the user name is clicked on the right side", function () {
checkAndClickRightPanel();
});

// Step: And the logout button is clicked from the dropdown
When("the logout button is clicked from the dropdown", function () {
maximizeBrowserWindow();
Aliases.browser.pageDocumentTranslationAlexaTran.headerTranslate.textnodeWissem.textnodeLogout.Click();
});
  

// Step: Then the user should see a message saying {string}
Then("the user should see a message saying {string}", function (expectedMessage) {
verifyLogOutMsgs(expectedMessage);
});


// Step: And the browser is closed
Then("the browser is closed", function () {
Aliases.browser.Close();
});


//ATQA-2176
// Step: Given the user navigates to the {arg} version of the A.I.Online URL
Given("the user navigates to the {arg} version of the A.I.Online URL", function (param1) {
navigateToLoginPage(param1);
// Assert Login Button exists on the page
aqObject.CheckProperty(Aliases.browser.pageLoginAlexaTranslationsAI.FindElement(XPaths.loginButton), "Exists", cmpEqual, true);
});

// Step: Then the login button and input fields should be visible
Then("the login button and input fields should be visible", function () {
// Call the function to validate the login input fields
validateLoginInputFields();
});

// Step: Given the user is on the A.I.Online login page on standard mode
Given("the user is on the A.I.Online login page on standard mode", function () {
 
navigateToLoginPage("English");
});

// Step: When the user enters valid username and password
When("the user enters valid username and password", function () {
enterValidCredentials();
});

// Step: When the user clicks on remember me and logs in
When("the user clicks on remember me and logs in", function () {
const page = Aliases.browser.pageLoginAlexaTranslationsAI;
maximizeBrowserWindow();
page.labelRememberMe.checkbox.ClickChecked(true);//click on remember me
clickLoginButton();
});

// Step: When the user logs out
When("the user logs out", function () {
userLogsOut();
verifyLogOutMsg();
  
});

// Step: When the browser is closed and reopened
When("the browser is closed and reopened", function () {
navigateToLoginPage("English");
Aliases.browser.pageLogInAlexaTranslationsAI.Wait();
});

// Step: Then verify if the username and password fields are auto-filled in standard mode
Then("verify if the username and password fields are auto-filled in standard mode", function () {
Aliases.browser.pageLogInAlexaTranslationsAI.Wait();
verifyAutoFilledFields(true); // When we pass parameter true that means fields should be autofilled
closeBrowser();
});

// Step: When the user opens the beta site in incognito mode
When("the user opens the beta site in incognito mode", function () {
launchIncognitoAndNavigate();
});

// Step: Then verify if the username and password fields are not auto-filled in incognito mode
Then("verify if the username and password fields are not auto-filled in incognito mode", function () {
verifyAutoFilledFields(false); // Username and password shouldn't be autofilled
closeBrowser();
});

Given("the user is on the A.I.Online Home page for {arg}", function (param1){
navigateToLoginPage(param1);

});

When("the Get in touch button is clicked", function (){
clickGetInTouchButton();

});

Then("the Get in touch page should be displayed for {string}", function (language){
  
verifyGetInTouchPage(language);
  
});





 
Given("the user is on the login page", function (){
navigateToLoginPage("English");
});

When("the user logs in with the existing email in all lowercase letters", function (){
loginUsingEmail("lower");
clickLoginButton();
});

Then("the user should be able to login successfully", function (){
confirmUserLogInSuccess();
});

Then("the user logs out", function (){
userLogsOut();
verifyLogOutMsg(); 
  
});

When("the user logs in with the existing email in all uppercase letters", function (){
navigateToLoginPage("English");
loginUsingEmail("upper");
clickLoginButton();
});

Then("the user should be able to login successfully with uppercase email", function (){
confirmUserLogInSuccess();
userLogsOut();
verifyLogOutMsg();
closeBrowser();
});

Given("the user navigates to A.I.Online on differenet {arg} versions", function (param1){
navigateToLoginPage(param1);;
});

When("the user clicks on Continue with SSO", function (){
clickContinueWithSSO();
});

When("the user enters a random email that is not registered", function (){
performSSOLoginWithRandomEmail();
  
});

Then("an error message should be displayed", function (){
loginShouldFail(); 
});

Given("the user is on the A.I.Online login page", function (){
launchIncognitoAndNavigate();
});

When("the user focuses and unfocuses the input fields without entering data", function (){
simulateEmptyLoginFieldsAlerts();
});


Then("required field errors are shown and login button remain disabled", function (){
  
ValidateEmptyLoginFields();
closeBrowser();
  
});


     
//ATQA-2195
Given("the user logs in to AI Online with valid credentials", function (){
navigateToLoginPage("English");
enterValidCredentials();
clickLoginButton();
confirmUserLogInSuccess();
 
});

When("the user navigates to the account settings page", function (){
  
navigateToSettingPage();

});

Then("the user's full name and correct abbreviation should be displayed", function (){

verifyUsernameAbbreviation();
  
});

Given("the login page is open", function (){
navigateToLoginPage("English");
});

When("the username and password with spaces at the beginning are entered", function (){

enterCredentialsWithSpaces(username, password, "beginning");
clickLoginButton();
});

Then("the login should succeed", function (){
confirmUserLogInSuccess();
userLogsOut();
verifyLogOutMsg();
navigateToLoginPage("English");
});

When("the username and password with spaces at the end are entered", function (){
 
enterCredentialsWithSpaces(username, password, "end");
clickLoginButton();
});

Then("the login should be successful", function (){
confirmUserLogInSuccess();
userLogsOut();
verifyLogOutMsg();
});


When("the username and password with spaces in the middle are entered", function (){
  
enterCredentialsWithSpaces(username, password, "middle");
clickLoginButton();
});

Then("the login should fail", function (){
loginShouldFail();
closeBrowser(); 
});

Given("a user is on the login page", function (){
navigateToLoginPage("English");
});

When("the user attempts to login with invalid credentials", function (){
enterRandomCredentials();
clickLoginButton();

});

Then("an error message is displayed", function (){
loginShouldFail();
closeBrowser();
});

