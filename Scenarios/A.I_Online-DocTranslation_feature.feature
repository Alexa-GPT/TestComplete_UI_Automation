Feature: A.I_Online-DocTranslation_feature

Scenario Outline: Successful document translation
  Given the user is logged into A.I.Online
  And the user navigates to the document translation page
  When a valid document "<filename>" is uploaded for translation from "<sourceLanguage>" to "<targetLanguage>"
  And the document is translated from "<sourceLanguage>" to "<targetLanguage>"
  Then there should be no errors during the translation of "<filename>" from "<sourceLanguage>" to "<targetLanguage>"
  And the translated file should be downloaded correctly
 
 @EN=>FR
 Examples:
  | sourceLanguage | targetLanguage | filename                      |
  | English        | French         | txt_TM_TB_sample_EN.txt       |
  | English        | French         | csv_sample_EN.csv             |
  | English        | French         | docx_sample_EN.docx           |
  | English        | French         | htm_sample_EN.htm             |
  | English        | French         | html_sample_EN.html           |
  | English        | French         | idml_sample_EN.idml           |
  | English        | French         | pdf_sample_EN.pdf             |
  | English        | French         | txt_TM_TB_sample_EN.txt       |
  | English        | French         | pptx_sample_EN.potx           |
  | English        | French         | pptx_sample_EN.pptx           |
  | English        | French         | Sample_visio_en.vsdx          |
  | English        | French         | Source EN xliff.xliff         |
  | English        | French         | XLF_sample_EN.xlf             |
  | English        | French         | xlsx_sample_EN.xlsx           |
  | English        | French         | xml_sample_EN.xml             | 
  
  #French to English
 @FR=>EN
 Examples:
  | sourceLanguage | targetLanguage | filename                             | 
  | French         | English        | pptx_sample_FR.potx                  |
  | French         | English        | pptx_sample_FR.pptx                  |
  | French         | English        | csv_sample_FR.csv                    |
  | French         | English        | docx_sample_FR.docx                  |
  | French         | English        | htm_sample_FR.htm                    |
  | French         | English        | html_sample_FR.html                  |
  | French         | English        | idml_sample_FR.idml                  |
  | French         | English        | pdf_sample_FR.pdf                    |
  | French         | English        | Sample_visio_fr.vsdx                 |
  | French         | English        | Source FR xliff.xliff                |
  | French         | English        | txt_TM_TB_sample_EN_fr.txt           |
  | French         | English        | XLF_sample_FR.xlf                    |
  | French         | English        | xlsx_sample_FR.xlsx                  |
  | French         | English        | xml_sample_FR.xml                    |

  
   #English to Spanish
 @EN=>ES  
 Examples:
  | sourceLanguage | targetLanguage | filename                      | 
  | English        | Spanish        | txt_TM_TB_sample_EN.txt       |
  | English        | Spanish        | csv_sample_EN.csv             |
  | English        | Spanish        | docx_sample_EN.docx           |
  | English        | Spanish        | htm_sample_EN.htm             |
  | English        | Spanish        | html_sample_EN.html           |
  | English        | Spanish        | idml_sample_EN.idml           |
  | English        | Spanish        | pdf_sample_EN.pdf             |
  | English        | Spanish        | txt_TM_TB_sample_EN.txt       |
  | English        | Spanish        | pptx_sample_EN.potx           |
  | English        | Spanish        | pptx_sample_EN.pptx           |
  | English        | Spanish        | Sample_visio_en.vsdx          |
  | English        | Spanish        | Source EN xliff.xliff         |
  | English        | Spanish        | XLF_sample_EN.xlf             |
  | English        | Spanish        | xlsx_sample_EN.xlsx           |
  | English        | Spanish        | xml_sample_EN.xml             | 
  
   #Spanish to English
 @ES=>EN  
 Examples:
  | sourceLanguage | targetLanguage | filename                      |   
  | Spanish        | English        | csv_sample_ES.csv             |
  | Spanish        | English        | docx_sample_ES.docx           |
  | Spanish        | English        | html_sample_ES.html           |
  | Spanish        | English        | htm_sample_ES.htm             |
  | Spanish        | English        | idml_sample_ES.idml           |
  | Spanish        | English        | pdf_sample_ES.pdf             |
  | Spanish        | English        | pptx_sample_ES.potx           |
  | Spanish        | English        | pptx_sample_ES.pptx           |
  | Spanish        | English        | Sample_visio_es.vsdx          |
  | Spanish        | English        | Source ES xliff.xliff         |
  | Spanish        | English        | txt_TM_TB_sample_EN_es.txt    |
  | Spanish        | English        | XLF_sample_ES.xlf             |
  | Spanish        | English        | xlsx_sample_ES.xlsx           |
  | Spanish        | English        | xml_sample_ES.xml             |  
  
   #Italian to English
 @IT=>EN
 Examples:
  | sourceLanguage | targetLanguage | filename                      |   
  | Italian        | English        | csv_sample_IT.csv             |
  | Italian        | English        | docx_sample_IT.docx           |
  | Italian        | English        | html_sample_EN_IT.html        |
  | Italian        | English        | htm_sample_EN_IT.htm          |
  | Italian        | English        | idml_sample_EN_IT.idml        |
  | Italian        | English        | pdf_sample_IT.pdf             |
  | Italian        | English        | pdf_sample_with_tags_IT.pdf   |
  | Italian        | English        | potx_sample_EN_IT.potx        |
  | Italian        | English        | pptx_sample_EN_IT.pptx        |
  | Italian        | English        | Sample_visio_EN_IT.vsdx       |
  | Italian        | English        | txt_sample_EN_IT.txt          |
  | Italian        | English        | XLF_sample_IT.xlf             |
  | Italian        | English        | xliff_sample_IT.xliff         |
  | Italian        | English        | xlsx_sample_IT.xlsx           |
  | Italian        | English        | xml_sample_EN_IT.xml          |
  
  
  
    #English to Italian
 @EN=>IT
 Examples:
  | sourceLanguage | targetLanguage | filename                      | 
  | English        | Italian        | txt_TM_TB_sample_EN.txt       |
  | English        | Italian        | csv_sample_EN.csv             |
  | English        | Italian        | docx_sample_EN.docx           |
  | English        | Italian        | htm_sample_EN.htm             |
  | English        | Italian        | html_sample_EN.html           |
  | English        | Italian        | idml_sample_EN.idml           |
  | English        | Italian        | pdf_sample_EN.pdf             |
  | English        | Italian        | txt_TM_TB_sample_EN.txt       |
  | English        | Italian        | pptx_sample_EN.potx           |
  | English        | Italian        | pptx_sample_EN.pptx           |
  | English        | Italian        | Sample_visio_en.vsdx          |
  | English        | Italian        | Source EN xliff.xliff         |
  | English        | Italian        | XLF_sample_EN.xlf             |
  | English        | Italian        | xlsx_sample_EN.xlsx           |
  | English        | Italian        | xml_sample_EN.xml             | 
 
  
  
  
  #German to English
  @DE=>EN 
 Examples:
  | sourceLanguage | targetLanguage | filename                      | 
  | German         | English        | csv_sample_DE.csv             |
  | German         | English        | docx_sample_DE.docx           |
  | German         | English        | html_sample_EN_DE.html        |
  | German         | English        | htm_sample_EN_DE.htm          |
  | German         | English        | idml_sample_EN_DE.idml        |
  | German         | English        | pdf_sample_DE.pdf             |
  | German         | English        | potx_sample_EN_DE.potx        |
  | German         | English        | pptx_sample_EN_DE.pptx        |
  | German         | English        | Sample_visio_EN_DE.vsdx       |
  | German         | English        | txt_sample_EN_DE.txt          |
  | German         | English        | XLF_sample_DE.xlf             |
  | German         | English        | xliff_sample_DE.xliff         |
  | German         | English        | xlsx_sample_DE.xlsx           |
  | German         | English        | xml_sample_EN_DE.xml          |
  
  
  
   
  #English to German
  @EN=>DE 
 Examples:
  | sourceLanguage | targetLanguage | filename                     | 
  | English        | German        | txt_TM_TB_sample_EN.txt       |
  | English        | German        | csv_sample_EN.csv             |
  | English        | German        | docx_sample_EN.docx           |
  | English        | German        | htm_sample_EN.htm             |
  | English        | German        | html_sample_EN.html           |
  | English        | German        | idml_sample_EN.idml           |
  | English        | German        | pdf_sample_EN.pdf             |
  | English        | German        | txt_TM_TB_sample_EN.txt       |
  | English        | German        | pptx_sample_EN.potx           |
  | English        | German        | pptx_sample_EN.pptx           |
  | English        | German        | Sample_visio_en.vsdx          |
  | English        | German        | Source EN xliff.xliff         |
  | English        | German        | XLF_sample_EN.xlf             |
  | English        | German        | xlsx_sample_EN.xlsx           |
  | English        | German        | xml_sample_EN.xml             | 
 
  
  
 
  
   #Dutch to English
  @NL=>EN
 Examples:
  | sourceLanguage | targetLanguage | filename                      | 
  | Dutch          | English        | csv_sample_NL.csv             |
  | Dutch          | English        | docx_sample_NL.docx           |
  | Dutch          | English        | html_sample_NL.html           |
  | Dutch          | English        | htm_sample_NL.htm             |
  | Dutch          | English        | idml_sample_NL.idml           |
  | Dutch          | English        | pdf_sample_NL.pdf             |
  | Dutch          | English        | potx_sample_NL.potx           |
  | Dutch          | English        | pptx_sample_NL.pptx           |
  | Dutch          | English        | Sample_visio_NL.vsdx          |
  | Dutch          | English        | txt_sample_NL.txt             |
  | Dutch          | English        | XLF_sample_NL.xlf             |
  | Dutch          | English        | xliff_sample_NL.xliff         |
  | Dutch          | English        | xlsx_sample_NL.xlsx           |
  | Dutch          | English        | xml_sample_NL.xml             |
  
  
  
     #English to Dutch
  @NL=>EN
 Examples:
  | sourceLanguage | targetLanguage | filename                    | 
  | English        | Dutch        | txt_TM_TB_sample_EN.txt       |
  | English        | Dutch        | csv_sample_EN.csv             |
  | English        | Dutch        | docx_sample_EN.docx           |
  | English        | Dutch        | htm_sample_EN.htm             |
  | English        | Dutch        | html_sample_EN.html           |
  | English        | Dutch        | idml_sample_EN.idml           |
  | English        | Dutch        | pdf_sample_EN.pdf             |
  | English        | Dutch        | txt_TM_TB_sample_EN.txt       |
  | English        | Dutch        | pptx_sample_EN.potx           |
  | English        | Dutch        | pptx_sample_EN.pptx           |
  | English        | Dutch        | Sample_visio_en.vsdx          |
  | English        | Dutch        | Source EN xliff.xliff         |
  | English        | Dutch        | XLF_sample_EN.xlf             |
  | English        | Dutch        | xlsx_sample_EN.xlsx           |
  | English        | Dutch        | xml_sample_EN.xml             | 
 
  
  
  
  
   #Japanese to English
  @JP=>EN  
 Examples:
  | sourceLanguage | targetLanguage | filename                      | 
  | Japanese       | English        | csv_sample_JA.csv             |
  | Japanese       | English        | docx_sample_JA.docx           |
  | Japanese       | English        | html_sample_EN_JA.html        |
  | Japanese       | English        | htm_sample_EN_JA.htm          |
  | Japanese       | English        | idml_sample_EN_JA.idml        |
  | Japanese       | English        | pdf_sample_JA.pdf             |
  | Japanese       | English        | potx_sample_EN_JA.potx        |
  | Japanese       | English        | pptx_sample_EN_JA.pptx        |
  | Japanese       | English        | Sample_visio_EN_JA.vsdx       |
  | Japanese       | English        | txt_sample_EN_JA.txt          |
  | Japanese       | English        | XLF_sample_JA.xlf             |
  | Japanese       | English        | xliff_sample_JA.xliff         |
  | Japanese       | English        | xlsx_sample_JA.xlsx           |
  | Japanese       | English        | xml_sample_EN_JA.xml          |
  
  
  #English to Japanese
  @EN=>JP  
 Examples:
  | sourceLanguage | targetLanguage | filename                       | 
  | English        | Japanese        | txt_TM_TB_sample_EN.txt       |
  | English        | Japanese        | csv_sample_EN.csv             |
  | English        | Japanese        | docx_sample_EN.docx           |
  | English        | Japanese        | htm_sample_EN.htm             |
  | English        | Japanese        | html_sample_EN.html           |
  | English        | Japanese        | idml_sample_EN.idml           |
  | English        | Japanese        | pdf_sample_EN.pdf             |
  | English        | Japanese        | txt_TM_TB_sample_EN.txt       |
  | English        | Japanese        | pptx_sample_EN.potx           |
  | English        | Japanese        | pptx_sample_EN.pptx           |
  | English        | Japanese        | Sample_visio_en.vsdx          |
  | English        | Japanese        | Source EN xliff.xliff         |
  | English        | Japanese        | XLF_sample_EN.xlf             |
  | English        | Japanese        | xlsx_sample_EN.xlsx           |
  | English        | Japanese        | xml_sample_EN.xml             | 
 

  
  
  
  
   #Korean to English
  @KO=>EN 
 Examples:
  | sourceLanguage | targetLanguage | filename                       | 
  | Korean         | English        | csv_sample_KO.csv              |
  | Korean         | English        | docx_sample_KO.docx            |
  | Korean         | English        | html_sample_EN_KO.html         |
  | Korean         | English        | htm_sample_EN_KO.htm           |
  | Korean         | English        | idml_sample_EN_KO.idml         |
  | Korean         | English        | pdf_sample_KO.pdf              |
  | Korean         | English        | potx_sample_EN_KO.potx         |
  | Korean         | English        | pptx_sample_EN_KO.pptx         |
  | Korean         | English        | Sample_visio_EN_KO.vsdx        |
  | Korean         | English        | txt_sample_EN_KO.txt           |
  | Korean         | English        | XLF_sample_KO.xlf              |
  | Korean         | English        | xliff_sample_KO.xliff          |
  | Korean         | English        | xlsx_sample_KO.xlsx            |
  | Korean         | English        | xml_sample_EN_KO.xml           |
  
  
     #English to Korean
  @EN=>KO 
 Examples:
  | sourceLanguage | targetLanguage| filename                      | 
  | English        | Korean        | txt_TM_TB_sample_EN.txt       |
  | English        | Korean        | csv_sample_EN.csv             |
  | English        | Korean        | docx_sample_EN.docx           |
  | English        | Korean        | htm_sample_EN.htm             |
  | English        | Korean        | html_sample_EN.html           |
  | English        | Korean        | idml_sample_EN.idml           |
  | English        | Korean        | pdf_sample_EN.pdf             |
  | English        | Korean        | txt_TM_TB_sample_EN.txt       |
  | English        | Korean        | pptx_sample_EN.potx           |
  | English        | Korean        | pptx_sample_EN.pptx           |
  | English        | Korean        | Sample_visio_en.vsdx          |
  | English        | Korean        | Source EN xliff.xliff         |
  | English        | Korean        | XLF_sample_EN.xlf             |
  | English        | Korean        | xlsx_sample_EN.xlsx           |
  | English        | Korean        | xml_sample_EN.xml             | 
 
  
  
  
  
  
  
   #Arabic to English
  @AR=>EN  
 Examples:
  | sourceLanguage | targetLanguage | filename                       |  
  | Arabic         | English        | csv_sample_AR.csv              |
  | Arabic         | English        | docx_sample_AR.docx            |
  | Arabic         | English        | html_sample_EN_AR.html         |
  | Arabic         | English        | htm_sample_EN_AR.htm           |
  | Arabic         | English        | idml_sample_EN_AR.idml         |
  | Arabic         | English        | pdf_sample_AR.pdf              |
  | Arabic         | English        | potx_sample_EN_AR.potx         |
  | Arabic         | English        | pptx_sample_EN_AR.pptx         |
  | Arabic         | English        | Sample_visio_EN_AR.vsdx        |
  | Arabic         | English        | txt_sample_EN_AR.txt           |
  | Arabic         | English        | XLF_sample_AR.xlf              |
  | Arabic         | English        | xliff_sample_AR.xliff          |
  | Arabic         | English        | xlsx_sample_AR.xlsx            |
  | Arabic         | English        | xml_sample_EN_AR.xml           |
  
  
  #Arabic to English
  @EN=>AR  
 Examples:
  | sourceLanguage | targetLanguage| filename                      | 
  | English        | Arabic        | txt_TM_TB_sample_EN.txt       |
  | English        | Arabic        | csv_sample_EN.csv             |
  | English        | Arabic        | docx_sample_EN.docx           |
  | English        | Arabic        | htm_sample_EN.htm             |
  | English        | Arabic        | html_sample_EN.html           |
  | English        | Arabic        | idml_sample_EN.idml           |
  | English        | Arabic        | pdf_sample_EN.pdf             |
  | English        | Arabic        | txt_TM_TB_sample_EN.txt       |
  | English        | Arabic        | pptx_sample_EN.potx           |
  | English        | Arabic        | pptx_sample_EN.pptx           |
  | English        | Arabic        | Sample_visio_en.vsdx          |
  | English        | Arabic        | Source EN xliff.xliff         |
  | English        | Arabic        | XLF_sample_EN.xlf             |
  | English        | Arabic        | xlsx_sample_EN.xlsx           |
  | English        | Arabic        | xml_sample_EN.xml             | 
 
  
  
  
  
  
   #Turkish to English
  @TR=>EN  
 Examples:
  | sourceLanguage | targetLanguage | filename                       | 
  | Turkish        | English        | csv_sample_TR.csv              |
  | Turkish        | English        | docx_sample_TR.docx            |
  | Turkish        | English        | html_sample_TR.html            |
  | Turkish        | English        | htm_sample_TR.htm              |
  | Turkish        | English        | idml_sample_TR.idml            |
  | Turkish        | English        | pdf_sample_TR.pdf              |
  | Turkish        | English        | potx_sample_TR.potx            |
  | Turkish        | English        | pptx_sample_TR.pptx            |
  | Turkish        | English        | Sample_visio_TR.vsdx           |
  | Turkish        | English        | txt_sample_TR.txt              |
  | Turkish        | English        | XLF_sample_TR.xlf              |
  | Turkish        | English        | xliff_sample_TR.xliff          |
  | Turkish        | English        | xlsx_sample_TR.xlsx            |
  | Turkish        | English        | xml_sample_TR.xml              |
  
  
    #English to Turkish
  @EN=>TR  
 Examples:
  | sourceLanguage | targetLanguage | filename                      | 
  | English        | Turkish        | txt_TM_TB_sample_EN.txt       |
  | English        | Turkish        | csv_sample_EN.csv             |
  | English        | Turkish        | docx_sample_EN.docx           |
  | English        | Turkish        | htm_sample_EN.htm             |
  | English        | Turkish        | html_sample_EN.html           |
  | English        | Turkish        | idml_sample_EN.idml           |
  | English        | Turkish        | pdf_sample_EN.pdf             |
  | English        | Turkish        | txt_TM_TB_sample_EN.txt       |
  | English        | Turkish        | pptx_sample_EN.potx           |
  | English        | Turkish        | pptx_sample_EN.pptx           |
  | English        | Turkish        | Sample_visio_en.vsdx          |
  | English        | Turkish        | Source EN xliff.xliff         |
  | English        | Turkish        | XLF_sample_EN.xlf             |
  | English        | Turkish        | xlsx_sample_EN.xlsx           |
  | English        | Turkish        | xml_sample_EN.xml             | 
 
  
  
  
   #Portuguese to English
  @PT=>EN  
 Examples:
  | sourceLanguage | targetLanguage | filename                       |  
  | Portuguese     | English        | csv_sample_PT_BR.csv           |
  | Portuguese     | English        | csv_sample_PT_BR.xlsx          |
  | Portuguese     | English        | docx_sample_PT_BR.docx         |
  | Portuguese     | English        | html_sample_PT_BR.html         |
  | Portuguese     | English        | htm_sample_PT_BR.htm           |
  | Portuguese     | English        | idml_sample_PT_BR.idml         |
  | Portuguese     | English        | pdf_sample_PT_BR.pdf           |
  | Portuguese     | English        | potx_sample_PT_BR.potx         |
  | Portuguese     | English        | pptx_sample_PT_BR.pptx         |
  | Portuguese     | English        | pptx_sample_PT_BR_en.pptx      |
  | Portuguese     | English        | Sample_visio_PT_BR.vsdx        |
  | Portuguese     | English        | Source_PT_BR xliff.xliff       |
  | Portuguese     | English        | txt_TM_TB_sample_PT_BR.txt     |
  | Portuguese     | English        | XLF_sample_PT_BR.xlf           |
  | Portuguese     | English        | xlsx_sample_PT_BR.csv          |
  | Portuguese     | English        | xlsx_sample_PT_BR.xlsx         |
  | Portuguese     | English        | xlsx_sample_PT_BR_en.xlsx      |
  | Portuguese     | English        | xml_sample_PT_BR.xml           | 
  
  
  
    
   #Portuguese to English
  @EN=>PT  
 Examples:
  | sourceLanguage  | targetLanguage   | filename                      | 
  | English        | Portuguese        | txt_TM_TB_sample_EN.txt       |
  | English        | Portuguese        | csv_sample_EN.csv             |
  | English        | Portuguese        | docx_sample_EN.docx           |
  | English        | Portuguese        | htm_sample_EN.htm             |
  | English        | Portuguese        | html_sample_EN.html           |
  | English        | Portuguese        | idml_sample_EN.idml           |
  | English        | Portuguese        | pdf_sample_EN.pdf             |
  | English        | Portuguese        | txt_TM_TB_sample_EN.txt       |
  | English        | Portuguese        | pptx_sample_EN.potx           |
  | English        | Portuguese        | pptx_sample_EN.pptx           |
  | English        | Portuguese        | Sample_visio_en.vsdx          |
  | English        | Portuguese        | Source EN xliff.xliff         |
  | English        | Portuguese        | XLF_sample_EN.xlf             |
  | English        | Portuguese        | xlsx_sample_EN.xlsx           |
  | English        | Portuguese        | xml_sample_EN.xml             | 
 
 
  
  
  
  
  
   #Chinese Simplified to English
  @ZH=>EN  
 Examples:
  | sourceLanguage     | targetLanguage | filename                   | 
  | Chinese Simplified | English    | csv_sample_Zh-CN.csv           |
  | Chinese Simplified | English    | docx_sample_ZH_CN.docx         |
  | Chinese Simplified | English    | html_sample_EN_zh-CN.html      |
  | Chinese Simplified | English    | htm_sample_ZH_CN.htm           |
  | Chinese Simplified | English    | idml_sample_ZH_CN.idml         |
  | Chinese Simplified | English    | pdf_sample_ZH_CN.pdf           |
  | Chinese Simplified | English    | potx_sample_ZH_CN.potx         |
  | Chinese Simplified | English    | pptx_sample_ZH_CN.pptx         |
  | Chinese Simplified | English    | Sample_visio_ZH_CN.vsdx        |
  | Chinese Simplified | English    | Sample_ZH_CN xliff.xliff       |  
  | Chinese Simplified | English    | txt_TM_TB_sample_ZH_CN.txt     |
  | Chinese Simplified | English    | XLF_sample_ZH-CN.xlf           |
  | Chinese Simplified | English    | xlsx_sample_OnlyText_EN_Zh-CN.xlsx|
  | Chinese Simplified | English    | xlsx_sample_ZH_CN.xlsx          |
  | Chinese Simplified | English    | xml_sample_ZH_CN.xml            |
  
     #English to Chinese Simplified
  @EN=>ZH  
 Examples:
  | sourceLanguage | targetLanguage            | filename                      | 
  | English        | Chinese Simplified        | txt_TM_TB_sample_EN.txt       |
  | English        | Chinese Simplified        | csv_sample_EN.csv             |
  | English        | Chinese Simplified        | docx_sample_EN.docx           |
  | English        | Chinese Simplified        | htm_sample_EN.htm             |
  | English        | Chinese Simplified        | html_sample_EN.html           |
  | English        | Chinese Simplified        | idml_sample_EN.idml           |
  | English        | Chinese Simplified        | pdf_sample_EN.pdf             |
  | English        | Chinese Simplified        | txt_TM_TB_sample_EN.txt       |
  | English        | Chinese Simplified        | pptx_sample_EN.potx           |
  | English        | Chinese Simplified        | pptx_sample_EN.pptx           |
  | English        | Chinese Simplified        | Sample_visio_en.vsdx          |
  | English        | Chinese Simplified        | Source EN xliff.xliff         |
  | English        | Chinese Simplified        | XLF_sample_EN.xlf             |
  | English        | Chinese Simplified        | xlsx_sample_EN.xlsx           |
  | English        | Chinese Simplified        | xml_sample_EN.xml             | 
 

  
 Scenario: User logs out from AI Online
  Given a user is logged into AI Online
  When logging out
  Then the user should be able to log out successfully
  And the browser closes
