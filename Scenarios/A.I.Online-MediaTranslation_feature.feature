Feature: A.I.Online-MediaTranslation_feature

Scenario Outline: Successful media file translation
  Given the user is logged into A.I.Online application
  And the user navigates to audio and video translation page
  When a valid file "<filename>" is uploaded for translation from "<sourceLanguage>" to "<targetLanguage>"
  And the file is translated from "<sourceLanguage>" to "<targetLanguage>"
  Then there should be no errors during translation of "<filename>" from "<sourceLanguage>" to "<targetLanguage>"
  And the translated file should be downloaded successfully
 
  
  @Media:EN=>FR
 #English to French 
 Examples:
  | sourceLanguage | targetLanguage | filename                      |
  | English        | French         | EN-1-Speaker.amr              |
  | English        | French         | EN-1-Speaker.flac             |

  @Media:FR=>EN
   #French to English
 Examples:
  | sourceLanguage| targetLanguage  | filename                       |
  | French        | English         | FR-CA-1-Speaker.amr            |
  | French        | English         | FR-CA-1-Speaker.flac           |
  | French        | English         | FR-CA-1-Speaker.mp3            |
  | French        | English         | FR-CA-1-Speaker.mp4            |
  | French        | English         | FR-CA-1-Speaker.ogg            |
  | French        | English         | FR-CA-1-Speaker.wav            |
  | French        | English         | FR-CA-1-Speaker.webm           |
  | French        | English         | FR-CA-2-Speakers.mp3           |
  | French        | English         | FR-CA-2-Speakers.mp4           |
  
  
  @Media:EN=>ES
   #English to Spanish 
 Examples:
  | sourceLanguage | targetLanguage | filename                       |
  | English        | Spanish         | EN-1-Speaker.amr              |
  | English        | Spanish         | EN-1-Speaker.flac             |
  | English        | Spanish         | EN-1-Speaker.mp3              |
  | English        | Spanish         | EN-1-Speaker.mp4              |
  | English        | Spanish         | EN-1-Speaker.ogg              |
  | English        | Spanish         | EN-1-Speaker.wav              |
  | English        | Spanish         | EN-1-Speaker.webm             |
  | English        | Spanish         | EN-2-Speakers.mp3             |
  | English        | Spanish         | EN-2-Speakers.mp4             |
  
  
  
  @Media:ES=>EN
   #Spanish to English 
 Examples: 
  | sourceLanguage | targetLanguage  | filename                      |
  | Spanish        | English         | ES-LA-1-Speaker.mp4           |
  | Spanish        | English         | ES-LA-1-Speaker.ogg           |
  | Spanish        | English         | ES-LA-1-Speaker.webm          |
  | Spanish        | English         | ES-LA-2-Speakers.mp3          |
  | Spanish        | English         | ES-LA-2-Speakers.mp4          |
  | Spanish        | English         | ES-LA-Speaker.amr             |
  | Spanish        | English         | ES-LA-Speaker.flac            |
  | Spanish        | English         | ES-LA-Speaker.mp3             |
  | Spanish        | English         | ES-LA-Speaker.wav             |
  
  
  @Media:IT=>EN
     #Italian to English 
 Examples: 
  | sourceLanguage | targetLanguage  | filename                      |
  | Italian        | English         | IT-1-Speaker.amr              |
  | Italian        | English         | IT-1-Speaker.flac             |
  | Italian        | English         | IT-1-Speaker.mp3              |
  | Italian        | English         | IT-1-Speaker.mp4              |
  | Italian        | English         | IT-1-Speaker.ogg              |
  | Italian        | English         | IT-1-Speaker.wav              |
  | Italian        | English         | IT-1-Speaker.webm             |
  | Italian        | English         | IT-2-Speakers.mp4             |

  
  @Media:EN=>IT
     #English to Italian 
 Examples:
  | sourceLanguage | targetLanguage  | filename                      |
  | English        | Italian         | EN-1-Speaker.amr              |
  | English        | Italian         | EN-1-Speaker.flac             |
  | English        | Italian         | EN-1-Speaker.mp3              |
  | English        | Italian         | EN-1-Speaker.mp4              |
  | English        | Italian         | EN-1-Speaker.ogg              |
  | English        | Italian         | EN-1-Speaker.wav              |
  | English        | Italian         | EN-1-Speaker.webm             |
  | English        | Italian         | EN-2-Speakers.mp3             |
  | English        | Italian         | EN-2-Speakers.mp4             |
  
  
  @Media:DE=>EN
    #German to English 
 Examples: 
  | sourceLanguage| targetLanguage  | filename                      |
  | German        | English         | DE-1-Speaker.amr              |
  | German        | English         | DE-1-Speaker.flac             |
  | German        | English         | DE-1-Speaker.mp3              |
  | German        | English         | DE-1-Speaker.mp4              |
  | German        | English         | DE-1-Speaker.ogg              |
  | German        | English         | DE-1-Speaker.wav              |
  | German        | English         | DE-1-Speaker.webm             |

  @Media:EN=>DE
     #English to German 
 Examples:
  | sourceLanguage | targetLanguage | filename                      |
  | English        | German         | EN-1-Speaker.amr              |
  | English        | German         | EN-1-Speaker.flac             |
  | English        | German         | EN-1-Speaker.mp3              |
  | English        | German         | EN-1-Speaker.mp4              |
  | English        | German         | EN-1-Speaker.ogg              |
  | English        | German         | EN-1-Speaker.wav              |
  | English        | German         | EN-1-Speaker.webm             |
  | English        | German         | EN-2-Speakers.mp3             |
  | English        | German         | EN-2-Speakers.mp4             |
  
  @Media:NL=>EN
    #Dutch to English 
 Examples: 
  | sourceLanguage| targetLanguage | filename                      |
  | Dutch        | English         | NL-1-Speaker.amr              |
  | Dutch        | English         | NL-1-Speaker.flac             |
  | Dutch        | English         | NL-1-Speaker.mp3              |
  | Dutch        | English         | NL-1-Speaker.mp4              |
  | Dutch        | English         | NL-1-Speaker.ogg              |
  | Dutch        | English         | NL-1-Speaker.wav              |
  | Dutch        | English         | NL-1-Speaker.webm             |
  
  
  @Media:EN=>NL
   #English to Dutch  
 Examples:
  | sourceLanguage | targetLanguage | filename                     |
  | English        | Dutch         | EN-1-Speaker.amr              |
  | English        | Dutch         | EN-1-Speaker.flac             |
  | English        | Dutch         | EN-1-Speaker.mp3              |
  | English        | Dutch         | EN-1-Speaker.mp4              |
  | English        | Dutch         | EN-1-Speaker.ogg              |
  | English        | Dutch         | EN-1-Speaker.wav              |
  | English        | Dutch         | EN-1-Speaker.webm             |
  | English        | Dutch         | EN-2-Speakers.mp3             |
  | English        | Dutch         | EN-2-Speakers.mp4             |
  
  
  
  @Media:JP=>EN
     #Japanese to English 
 Examples: 
  | sourceLanguage| targetLanguage    | filename                      |
  | Japanese        | English         | JA-1-Speaker.amr              |
  | Japanese        | English         | JA-1-Speaker.flac             |
  | Japanese        | English         | JA-1-Speaker.mp3              |
  | Japanese        | English         | JA-1-Speaker.mp4              |
  | Japanese        | English         | JA-1-Speaker.ogg              |
  | Japanese        | English         | JA-1-Speaker.wav              |
  | Japanese        | English         | JA-1-Speaker.webm             |
  
  @Media:EN=>JP
       #English to Japanese  
 Examples:
  | sourceLanguage | targetLanguage | filename                        |
  | English        | Japanese         | EN-1-Speaker.amr              |
  | English        | Japanese         | EN-1-Speaker.flac             |
  | English        | Japanese         | EN-1-Speaker.mp3              |
  | English        | Japanese         | EN-1-Speaker.mp4              |
  | English        | Japanese         | EN-1-Speaker.ogg              |
  | English        | Japanese         | EN-1-Speaker.wav              |
  | English        | Japanese         | EN-1-Speaker.webm             |
  | English        | Japanese         | EN-2-Speakers.mp3             |
  | English        | Japanese         | EN-2-Speakers.mp4             |
  
  
  @Media:KO=>EN
      #Korean to English 
 Examples:  
  | sourceLanguage| targetLanguage  | filename                       |
  | Korean        | English         | KO-1-Speaker.amr               |
  | Korean        | English         | KO-1-Speaker.flac              |
  | Korean        | English         | KO-1-Speaker.mp3               |
  | Korean        | English         | KO-1-Speaker.mp4               |
  | Korean        | English         | KO-1-Speaker.ogg               |
  | Korean        | English         | KO-1-Speaker.wav               |
  | Korean        | English         | KO-1-Speaker.webm              |
  
  
  @Media:EN=>KO
   #English to Korean  
 Examples:
  | sourceLanguage | targetLanguage | filename                      |
  | English        | Korean         | EN-1-Speaker.amr              |
  | English        | Korean         | EN-1-Speaker.flac             |
  | English        | Korean         | EN-1-Speaker.mp3              |
  | English        | Korean         | EN-1-Speaker.mp4              |
  | English        | Korean         | EN-1-Speaker.ogg              |
  | English        | Korean         | EN-1-Speaker.wav              |
  | English        | Korean         | EN-1-Speaker.webm             |
  | English        | Korean         | EN-2-Speakers.mp3             |
  | English        | Korean         | EN-2-Speakers.mp4             |
  
  @Media:AR=>EN
     #Arabic to English 
 Examples:  
  | sourceLanguage| targetLanguage  | filename                      |
  | Arabic        | English         | AR-1-Speaker.amr              |
  | Arabic        | English         | AR-1-Speaker.flac             |
  | Arabic        | English         | AR-1-Speaker.mp3              |
  | Arabic        | English         | AR-1-Speaker.mp4              |
  | Arabic        | English         | AR-1-Speaker.ogg              |
  | Arabic        | English         | AR-1-Speaker.wav              |
  | Arabic        | English         | AR-1-Speaker.webm             |
  
  
  @Media:EN=>AR
   #English to Arabic  
 Examples:
  | sourceLanguage | targetLanguage | filename                      |
  | English        | Arabic         | EN-1-Speaker.amr              |
  | English        | Arabic         | EN-1-Speaker.flac             |
  | English        | Arabic         | EN-1-Speaker.mp3              |
  | English        | Arabic         | EN-1-Speaker.mp4              |
  | English        | Arabic         | EN-1-Speaker.ogg              |
  | English        | Arabic         | EN-1-Speaker.wav              |
  | English        | Arabic         | EN-1-Speaker.webm             |
  | English        | Arabic         | EN-2-Speakers.mp3             |
  | English        | Arabic         | EN-2-Speakers.mp4             |
  
  
  @Media:TR=>EN
  #Turkish to English 
 Examples:  
  | sourceLanguage| targetLanguage   | filename                     |
  | Turkish        | English         | TR-1-Speaker.amr             |
  | Turkish        | English         | TR-1-Speaker.flac            |
  | Turkish        | English         | TR-1-Speaker.mp3             |
  | Turkish        | English         | TR-1-Speaker.mp4             |
  | Turkish        | English         | TR-1-Speaker.ogg             |
  | Turkish        | English         | TR-1-Speaker.wav             |
  | Turkish        | English         | TR-1-Speaker.webm            |
  
  
  @Media:EN=>TR
  #English to Turkish  
 Examples:
  | sourceLanguage | targetLanguage | filename                       |
  | English        | Turkish         | EN-1-Speaker.amr              |
  | English        | Turkish         | EN-1-Speaker.flac             |
  | English        | Turkish         | EN-1-Speaker.mp3              |
  | English        | Turkish         | EN-1-Speaker.mp4              |
  | English        | Turkish         | EN-1-Speaker.ogg              |
  | English        | Turkish         | EN-1-Speaker.wav              |
  | English        | Turkish         | EN-1-Speaker.webm             |
  | English        | Turkish         | EN-2-Speakers.mp3             |
  | English        | Turkish         | EN-2-Speakers.mp4             |
  
  
  @Media:PR=>EN
      #Portuguese to English 
 Examples:  
  | sourceLanguage| targetLanguage      | filename                    |
  | Portuguese        | English         | PT-BR-1-Speaker.amr         |
  | Portuguese        | English         | PT-BR-1-Speaker.flac        |
  | Portuguese        | English         | PT-BR-1-Speaker.mp3         |
  | Portuguese        | English         | PT-BR-1-Speaker.mp4         |
  | Portuguese        | English         | PT-BR-1-Speaker.ogg         |
  | Portuguese        | English         | PT-BR-1-Speaker.wav         |
  | Portuguese        | English         | PT-BR-1-Speaker.webm        |
  
  
  @Media:EN=>PR
       #English to Portuguese  
 Examples:
  | sourceLanguage | targetLanguage     | filename                      |
  | English        | Portuguese         | EN-1-Speaker.amr              |
  | English        | Portuguese         | EN-1-Speaker.flac             |
  | English        | Portuguese         | EN-1-Speaker.mp3              |
  | English        | Portuguese         | EN-1-Speaker.mp4              |
  | English        | Portuguese         | EN-1-Speaker.ogg              |
  | English        | Portuguese         | EN-1-Speaker.wav              |
  | English        | Portuguese         | EN-1-Speaker.webm             |
  | English        | Portuguese         | EN-2-Speakers.mp3             |
  | English        | Portuguese         | EN-2-Speakers.mp4             |
  
  
  @Media:ZH=>EN
  #Chinese Simplified to English 
 Examples:  
  | sourceLanguage            | targetLanguage  | filename                |
  | Chinese Simplified        | English         | ZH-CN-1-Speaker.amr     |
  | Chinese Simplified        | English         | ZH-CN-1-Speaker.flac    |
  | Chinese Simplified        | English         | ZH-CN-1-Speaker.mp3     |
  | Chinese Simplified        | English         | ZH-CN-1-Speaker.mp4     |
  | Chinese Simplified        | English         | ZH-CN-1-Speaker.ogg     |
  | Chinese Simplified        | English         | ZH-CN-1-Speaker.wav     |
  | Chinese Simplified        | English         | ZH-CN-1-Speaker.webm    |
  
  
  @Media:EN=>ZH
  #English to Chinese Simplified  
 Examples:
  | sourceLanguage | targetLanguage             | filename                      |
  | English        | Chinese Simplified         | EN-1-Speaker.amr              |
  | English        | Chinese Simplified         | EN-1-Speaker.flac             |
  | English        | Chinese Simplified         | EN-1-Speaker.mp3              |
  | English        | Chinese Simplified         | EN-1-Speaker.mp4              |
  | English        | Chinese Simplified         | EN-1-Speaker.ogg              |
  | English        | Chinese Simplified         | EN-1-Speaker.wav              |
  | English        | Chinese Simplified         | EN-1-Speaker.webm             |
  | English        | Chinese Simplified         | EN-2-Speakers.mp3             |
  | English        | Chinese Simplified         | EN-2-Speakers.mp4             |
  
  
  
  

  
  
   Scenario: User logs out from AI Online
     Given the user is logged into AI Online
     When the user initiates the logout process
     Then the user should log out successfully
     And the browser should close