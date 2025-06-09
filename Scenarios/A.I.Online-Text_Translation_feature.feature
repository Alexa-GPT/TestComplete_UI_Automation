Feature: AI Online - Text Translation Feature

  Background: 
    Given the user is logged into the Alexa Translations application
    And the user navigates to the text translation page

  # First Scenario using Detect Language for the source language
  @detectLanguage
  Scenario Outline: AI Online Testing Text Translation using detect Language
    When text is entered for translation from "<sourceLanguage>" to "<targetLanguage>"
    Then there should be no translation errors using the detect language option from "<sourceLanguage>" to "<targetLanguage>"

   Examples:
  | sourceLanguage        | targetLanguage   |
  | English               | French           |
  | English               | Spanish          |
  | English               | Arabic           |
  | English               | Chinese Simplified |
  | English               | German           |
  | English               | Italian          |
  | English               | Japanese         |
  | English               | Korean           |
  | English               | Portuguese       |
  | English               | Turkish          |
  | English               | Dutch            |
  | French                | English          |
  | Spanish               | English          |
  | Arabic                | English          |
  | Chinese Simplified    | English          |
  | German                | English          |
  | Italian               | English          |
  | Japanese              | English          |
  | Korean                | English          |
  | Portuguese            | English          |
  | Turkish               | English          |
  | Dutch                 | English          |

  # Second Scenario where the source language is manually selected
  @manualSourceSelection
  Scenario Outline: AI Online Testing Text Translation with Manual Source Selection
    When custom text is entered for translation from "<sourceLanguage>" to "<targetLanguage>"
    Then the translation should meet the specific criteria from "<sourceLanguage>" to "<targetLanguage>"

   Examples:
  | sourceLanguage        | targetLanguage   |
  | English               | French           |
  | English               | Spanish          |
  | English               | Arabic           |
  | English               | Chinese Simplified |
  | English               | German           |
  | English               | Italian          |
  | English               | Japanese         |
  | English               | Korean           |
  | English               | Portuguese       |
  | English               | Turkish          |
  | English               | Dutch            |
  | French                | English          |
  | Spanish               | English          |
  | Arabic                | English          |
  | Chinese Simplified    | English          |
  | German                | English          |
  | Italian               | English          |
  | Japanese              | English          |
  | Korean                | English          |
  | Portuguese            | English          |
  | Turkish               | English          |
  | Dutch                 | English          |
  

  # Scenario for logging out after completing the translations
  Scenario: Logout after completing all translations
    When the user logs out from the Alexa Translations application
