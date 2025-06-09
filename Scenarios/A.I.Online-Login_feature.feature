Feature: AI_Online_Login_Page

#ATQA-2176
Scenario Outline: Check login button and input fields on different language versions
  Given the user navigates to the "<language>" version of the A.I.Online URL
  Then the login button and input fields should be visible
    
   Examples:
      | language |
      | English  |
      | French   |
      | Spanish  |

       
   
     

#ATQA-2185     
Scenario Outline: User logs out from A.I.Online in different language versions
  Given the user is on the A.I.Online login page for "<language>"
  When valid username and password are entered
  And the sign in button is clicked
  And the user name is clicked on the right side
  And the logout button is clicked from the dropdown
  Then the user should see a message saying "<logoutMsg>"
  And the browser is closed
    
   Examples:
      | language | logoutMsg                                   |
      | English  |  You're now logged out. See you again soon! |      
      | French   |  Déconnexion réussie. À la prochaine!       |
      | Spanish  |  Has cerrado sesión. ¡Hasta pronto!         |

       
       
#ATQA-2189  
Scenario Outline: Navigate to A.I.Online and click on Get in touch button for different languages
  Given the user is on the A.I.Online Home page for "<language>"
  When the Get in touch button is clicked
  Then the Get in touch page should be displayed for "<language>"

     Examples:
       | language |
       | English  |
       | French   |
       | Spanish  |

       
       
#ATQA-2190
Scenario Outline: Verify error message on SSO login with invalid email
  Given the user navigates to A.I.Online on differenet "<language>" versions
  When the user clicks on Continue with SSO
  And the user enters a random email that is not registered
  Then an error message should be displayed

   Examples:
     | language |
     | English  |
     | French   |
     | Spanish  |

       
         
  #ATQA-11212  
  Scenario: Login with existing email in different cases
    Given the user is on the login page
    When the user logs in with the existing email in all lowercase letters
    Then the user should be able to login successfully
    And the user logs out
    When the user logs in with the existing email in all uppercase letters
    Then the user should be able to login successfully with uppercase email
      
          
  #ATQA-2195
  Scenario: Verify username abbreviation
     Given the user logs in to AI Online with valid credentials
     When the user navigates to the account settings page
     Then the user's full name and correct abbreviation should be displayed
       
       
      
  
   #ATQA-2200
  Scenario: Validate Required Fields on Login Page
     Given the user is on the A.I.Online login page
     When the user focuses and unfocuses the input fields without entering data
     Then required field errors are shown and login button remain disabled
      
       
       
       
       
    #ATQA-2193 ATQA-2192 ATQA-2194 
 Scenario: Test login with spaces in username and password
   Given the login page is open
    
   When the username and password with spaces at the beginning are entered
   Then the login should succeed

   When the username and password with spaces at the end are entered
   Then the login should be successful

   When the username and password with spaces in the middle are entered
   Then the login should fail
     
     

Scenario: Attempt to login with invalid credentials
   Given a user is on the login page
   When the user attempts to login with invalid credentials
   Then an error message is displayed

       
       
       
   """   
   #ATQA-2187
  Scenario: Remember Me feature and auto-fill verification

   Given the user is on the A.I.Online login page on standard mode
   When the user enters valid username and password
   And the user clicks on remember me and logs in
   And the user logs out
   And the browser is closed and reopened
   Then verify if the username and password fields are auto-filled in standard mode
   When the user opens the beta site in incognito mode
   Then verify if the username and password fields are not auto-filled in incognito mode
 """