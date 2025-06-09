Feature: Term Base Creation for Different Output Formats

  Background:
    Given The user is now signed in to A.I.Online
    And the user navigates to the Term Bases page

  Scenario Outline: Successful Term Base Creation with XLSX Output
    When the user uploads a valid document "<filename>" from "<sourceLanguage>" to "<targetLanguage>"
    Then the Term Base creation for "<filename>" from "<sourceLanguage>" to "<targetLanguage>" should complete without errors
    And the created Term Base for "<filename>" should be downloaded successfully in XLSX format

  Examples:
    | sourceLanguage  | targetLanguage  | filename                                             |
    | English        | French         | bohan_low_tm_eng_fra_docx_sample_EN_mod1216.xlsx       |
    | English        | French         | Cleaned_lowest_TB_Bohan_70_20211217.tmx                |
    | English        | French         | SDL_EN_to_FR.sdltm                                     |
    | English        | French         | bohan_low_tm_eng_fra_docx_sample_EN_mod1216.xliff      |

    

  Scenario Outline: Successful Term Base Creation with TBX Output
    When the user provides a valid TM  "<filename>" from "<sourceLanguage>" to "<targetLanguage>"
    Then the Term Base creation for "<filename>" from "<sourceLanguage>" to "<targetLanguage>" completes successfully without errors
    And the Term Base for "<filename>" is downloaded in TBX format
  Examples:
    | sourceLanguage | targetLanguage | filename                                               |
    | English        | French         | bohan_low_tm_eng_fra_docx_sample_EN_mod1216.xlsx       |
    | English        | French         | Cleaned_lowest_TB_Bohan_70_20211217.tmx                |
    | English        | French         | SDL_EN_to_FR.sdltm                                     |
    | English        | French         | bohan_low_tm_eng_fra_docx_sample_EN_mod1216.xliff      |

   
  Scenario Outline: Successful Term Base Creation with Text Output
   When a valid document "<filename>" is uploaded  from "<sourceLanguage>" to "<targetLanguage>"
   Then the Term Base creation process for "<filename>" from "<sourceLanguage>" to "<targetLanguage>" should succeed without any issues
   And the generated Term Base for "<filename>" should be successfully downloaded in Text format

  Examples:
    | sourceLanguage | targetLanguage | filename                                               |
    | English        | French         | bohan_low_tm_eng_fra_docx_sample_EN_mod1216.xlsx       |
    | English        | French         | Cleaned_lowest_TB_Bohan_70_20211217.tmx                |
    | English        | French         | SDL_EN_to_FR.sdltm                                     |
    | English        | French         | bohan_low_tm_eng_fra_docx_sample_EN_mod1216.xliff      |

  Scenario Outline: Successful Term Base Creation with All Outputs
   When the user uploads a valid file "<filename>" from "<sourceLanguage>" to "<targetLanguage>",  
   Then the Term Base creation for "<filename>" from "<sourceLanguage>" to "<targetLanguage>" should be completed without errors,  
   And the created Term Base for "<filename>" should be successfully downloaded in all formats.

  Examples:
    | sourceLanguage | targetLanguage | filename                                               |
    | English        | French         | bohan_low_tm_eng_fra_docx_sample_EN_mod1216.xlsx       |
    | English        | French         | Cleaned_lowest_TB_Bohan_70_20211217.tmx                |
    | English        | French         | SDL_EN_to_FR.sdltm                                     |
    | English        | French         | bohan_low_tm_eng_fra_docx_sample_EN_mod1216.xliff      |

  
  
    # Scenario for logging out after completing the translations
    Scenario: Logout after completing all translations
      When the user logs out from A.I Online
