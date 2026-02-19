import i18n from 'i18next';
import { initReactI18next,  } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
       
    translation: {
    // Onboarding  
        "welcome": "Hello. I'm Garry.",
        "identity_ask": "May I ask who I have the pleasure of assisting today?",
        "nav_liaison": "Garry // Liaison",
        "btn_next": "Next",
        "btn_initialize": "Let's Begin",
        "placeholder_name": "Your name...",
        "email_ask": "Where should I send your summary?",
        "auth_status": "Authenticated",
        "greeting_peekaboo": "Peekaboo.. I see you, <spanName>{{name}}</spanName> nice to meet you.",
    // Home
        "content": "I am Garry, your Legal Liaison. My role is to analyze KGA'S T&Cs, identify potential risks, and provide clarity in your preferred language. How may I assist you today?",
        "top_text": "Secure Briefing Room",
        "chat": "chat",
        "voice": "speak",
        "download": "Download summary PDF",
        "email": " Dispatch to Email",
        "input_field": "Ask Garry about specific clauses...",
        "tap_to_speak": "Tap to Speak",
        "listening": "Garry is Listening...",
        "ready_to_assist": "Garry is ready to assist in your chosen language"

    }
  },
  zu: { // isiZulu
        // Onboarding
    translation: {
        // Onboarding
        "welcome": "Sawubona. NginguGarry.",
        "identity_ask": "Ngingabuza ukuthi ngisiza bani namuhla?",
        "nav_liaison": "Garry // Umxhumanisi",
        "btn_next": "Landela",
        "btn_initialize": "Asiqale",
        "placeholder_name": "Igama lakho...",
        "email_ask": "Ngifanele ukuthumela kuphi isifinyezo sakho?",
        "auth_status": "Kuqinisekisiwe",
        "greeting_peekaboo": "Peekaboo.. ngiyakubona, <spanName>{{name}}</spanName> ngiyajabula ukukwazi.",
        // Home
        "content": "NginguGarry, uMxhumanisi wakho Wezomthetho. Indima yami ukuhlaziya i-T&Cs ye-KGA, ngibone ubungozi obungaba khona, futhi nginikeze ukucaciseleka ngolimi oluncamelayo. Ngingakusiza kanjani namuhla?",
        "top_text": "Igumbi lokwazisa elivikelekile",
        "chat": "xoxa",
        "voice": "khuluma",
        "download": "Landa isifinyezo se-PDF",
        "email": "Thumela ku-imeyili",
        "input_field": "Buza u-Garry mayelana nezigatshana ezithile...",
        "tap_to_speak": "Thepha ukuze ukhulume",
        "listening": "UGarry Uyalalela...",
        "ready_to_assist": "U-Garry ulungele ukusiza ngolimi olukhethile",

    }
  },

  xh: { // isiXhsa
    translation: {
        // Onboarding
        "welcome": "Mholo. NdinguGarry",
        "identity_ask": "Ndicela ukubuza ukuba ndinganceda bani namhlanje",
        "nav_liaison": "UGarry // Unxibelelwano",
        "btn_next": "Okulandelayo",
        "btn_initialize": "Masiqale",
        "placeholder_name": "Igama lakho...",
        "email_ask": "Ndingasithumela phi isishwankathelo sakho?",
        "auth_status": "Iqinisekisiwe",
        "greeting_peekaboo": "Peekaboo.. ndiyakubona, <spanName>{{name}}</spanName> ndiyavuya ukukwaz.",
        // Home
        "content": "NdinguGarry, uQhagamshelwano lwakho lwezoMthetho. Indima yam kukuhlalutya ii-T&Cs ze-KGA, uchonge imingcipheko enokubakho, kwaye unike ingcaciso ngolwimi olukhethayo. Ndingakunceda ngantoni namhlanje?",
        "top_text": "Igumbi leNgcaciso eliKhuselekileyo",
        "chat": "ncokola",
        "voice": "thetha",
        "download": "Khuphela isishwankathelo sePDF",
        "email": "Thumela kwi-imeyile",
        "input_field": "Buza uGarry malunga namagatya athile...",
        "tap_to_speak": "Cofa ukuze uthethe",
        "listening": "UGarry umamele...",
        "ready_to_assist": "UGarry ukulungele ukukunceda ngolwimi olukhethileyo",

        

    }
  },

  st: { // Sesotho
    translation: {
        // Onboarding
        "welcome": "Lumela. Ke 'na Garry.",
        "identity_ask": "Ke kopa ho botsa hore na ke thabela ho thusa mang kajeno?",
        "nav_liaison": "Garry // Boetsuwa ba ho kopanya",
        "btn_next": "E 'ngoe",
        "btn_initialize": "Ha re Qalang",
        "placeholder_name": "Lebitso la hau...",
        "email_ask": "Ke romela kakaretso ea hau hokae?",
        "auth_status": "E netefalitsoe",
        "greeting_peekaboo": "Peekaboo.. kea u bona, <spanName>{{name}}</spanName> ke thabela ho u tseba.",
        // Home
        "content": "Ke 'na Garry, Sehokahano sa hau sa Molao. Karolo ea ka ke ho sekaseka T&Cs tsa KGA, ho hlwaya likotsi tse ka bang teng, le ho fana ka ho hlaka ka puo eo u e ratang. Nka u thusa joang kajeno?",
        "top_text": "Kamore e Sireletsehileng ea Bokhutšoane",
        "chat": "qoqa",
        "voice": "bua",
        "download": "Khoasolla kakaretso ea PDF",
        "email": "Romella ho Email",
        "input_field": "Botsa Garry ka likarolo tse itseng...",
        "tap_to_speak": "Tobetsa ho Bua",
        "listening": "Garry o Mametse...",
        "ready_to_assist": "Garry o ikemiselitse ho u thusa ka puo eo u e khethileng",

    }
  },

  af: { // Afrikaans
        // Onboarding
    translation: {
        "welcome": "Hallo. Ek is Garry..",
        "identity_ask": "Mag ek vra wie ek vandag die plesier het om te help?",
        "nav_liaison": "Garry // Skakelpersoon",
        "btn_next": "Volgende",
        "btn_initialize": "Kom ons begin",
        "placeholder_name": "Jou naam...",
        "email_ask": "Waarheen moet ek jou opsomming stuur? ",
        "auth_status": "Geverifieer",
        "greeting_peekaboo": "Peekaboo.. Ek kan jou sien, <spanName>{{name}}</spanName> Dus goed om jou te ontmoet.",
        // Home
        "content": "Ek is Garry, jou Regsskakel. My rol is om KGA se bepalings en voorwaardes te ontleed, potensiële risiko's te identifiseer en duidelikheid in jou voorkeurtaal te verskaf. Hoe kan ek jou vandag help?",
        "top_text": "Veilige Inligtingskamer",
        "chat": "Gesels",
        "voice": "Praat",
        "download": "Laai opsommings-PDF af",
        "email": "Verstuur na e-pos",
        "input_field": "Vra Garry oor spesifieke klousules...",
        "tap_to_speak": "Tik om te praat",
        "listening": "Garry luister...",
        "ready_to_assist": "Garry is gereed om te help in jou gekose taal"

    
    }
  },

  nso:{ // Sepedi
        // Onboarding
    translation: {
        "welcome": "Thobela. Ke nna Garry..",
        "identity_ask": "Na nka botšiša gore ke mang yo ke nago le lethabo la go thuša lehono?",
        "nav_liaison": "Garry // Mokgokagano",
        "btn_next": "Latelago",
        "btn_initialize": "A Re Thomeng",
        "placeholder_name": "Leina la gago...",
        "email_ask": "Ke swanetše go romela kae kakaretšo ya gago?",
        "auth_status": "E netefaditšwe",
        "greeting_peekaboo": "Peekaboo.. ke a go bona, <spanName>{{name}}</spanName> ke bose go kopana le wena.",
        // Home
        "content": "Ke nna Garry, Mokgokaganyi wa gago wa Molao. Karolo ya ka ke go sekaseka di-T&C tša KGA, go šupa dikotsi tšeo di ka bago gona, le go fa go hlaka ka polelo yeo o e ratago. Nka go thuša bjang lehono?",
        "top_text": "Kamore ya Tlhagišo ye e Šireletšegilego",
        "chat": "boledišana",
        "voice": "bolela",
        "download": "Download kakaretšo PDF",
        "email": "Romela go Imeile",
        "input_field": "Botšiša Garry ka mafoko a itšego...",
        "tap_to_speak": "Tlanya go Bolela",
        "listening": "Garry o Theeletša...",
        "ready_to_assist": "Garry o ikemišeditše go thuša ka leleme leo o le kgethilego",


    }
  },

  nd: { // Isindebele
        // Onboarding
translation: {
        "welcome": "Lotjhani. NginguGarry..",
        "identity_ask": "Ngingabawa ukwazi bonyana ngisiza bani namhlanjesi?",
        "nav_liaison": "Garry // Umkhulumeli",
        "btn_next": "Okulandelako",
        "btn_initialize": "Asithomeni",
        "placeholder_name": "Ibizo lakho...",
        "email_ask": "Ngifanele ukuthumela kuphi isifingqo sakho?",
        "auth_status": "Kuqinisekisiwe",
        "greeting_peekaboo": "Peekaboo.. ngiyakubona, <spanName>{{name}}</spanName> ngiyathaba ukukwazi.",
        // Home
        "content": "NginguGarry, umkhulumeli wakho wezomthetho. Umsebenzi wami kukuhlaziya ama-T&C we-KGA, ngibone ingozi engaba khona, begodu nginikeze ukucaciseka ngolimi olukhethako. Ngingakusiza njani namhlanjesi?",
        "top_text": "Ikghadi lewazi elivikelekileko",
        "chat": "khuluma",
        "voice": "khuluma ngomlomo",
        "download": "Layishelani isifingqo se-PDF",
        "email": "Thumela ku-imeyili",
        "input_field": "Buza uGarry ngezinto ezithile zomthetho..",
        "tap_to_speak": "Thikha bonyana ukhulume",
        "listening": "uGarry uyalalela...",
        "ready_to_assist": "uGarry ukulungele ukukusiza ngolimi olukhethileko"
    }
  },

  ve: { // Venda
        // Onboarding
    translation: {
        "welcome": "Ndumeliso. Ndi pfi Garry..",
        "identity_ask": "Ndi nga vhudzisa uri ndi nnyi ane nda vha na dakalo ḽa u thusa ṋamusi?",
        "nav_liaison": "Garry // Vhukwamani",
        "btn_next": "Tevhelaho",
        "btn_initialize": "Kha ri thome",
        "placeholder_name": "Dzina ḽavho...",
        "email_ask": "Ndi fanela u rumela ngafhi summary yanu?",
        "auth_status": "Zwo khwaṱhisedzwa",
        "greeting_peekaboo": "Peekaboo.. ndi khou ni vhona, <spanName>{{name}}</spanName> ndo takala u ni tanganedza.",
        // Home
        "content": "Ndi Garry, Mukwamani waṋu wa Mulayo. Mushumo wanga ndi u sengulusa T&C dza KGA, u topola khombo dzine dza nga vha hone, na u ṋetshedza ṱhalutshedzo nga luambo lune na lu takalela. Ndi nga ni thusa hani ṋamusi?",
        "top_text": "Rumu ya u Ṱalutshedza yo Tsireledzeaho",
        "chat": "nyambedzano",
        "voice": "amba",
        "download": "Kha vha dawuniḽoude ṱhalusamaipfi PDF",
        "email": "U rumela kha imeiḽi",
        "input_field": "Vhudzisani Garry nga ha zwipiḓa zwo khetheaho...",
        "tap_to_speak": "Kha vha ṋaṋise u amba",
        "listening": "Garry u khou thetshelesa...",
        "ready_to_assist": "Garry o ḓiimisela u thusa nga luambo lwe na lu nanga",


    }
  },

  xs: { // Xitshonga
        // Onboarding
    translation: {
        "welcome": "Avuxeni. Mina ndzi Garry..",
        "identity_ask": "Xana ndzi nga vutisa leswaku i mani loyi ndzi nga na ntsako wo pfuna namuntlha?",
        "nav_liaison": "Garry // Muhlanganisi",
        "btn_next": "Landzelaka",
        "btn_initialize": "A Hi Sungulani",
        "placeholder_name": "Vito ra wena...",
        "email_ask": "Xana ndzi fanele ndzi rhumela kwihi nkatsakanyo wa wena?",
        "auth_status": "Ku tiyisisiwile",
        "greeting_peekaboo": "Peekaboo.. ndza ku vona, <spanName>{{name}}</spanName> swa tsakisa ku hlangana na wena.",
        // Home
        "content": "Hi mina Garry, Muhlanganisi wa wena wa swa Nawu. Ntirho wa mina i ku xopaxopa ti-T&C ta KGA, ku kuma makhombo lama nga vaka kona, na ku nyika ku twisiseka hi ririmi leri u ri tsakelaka. Xana ndzi nga ku pfuna njhani namuntlha?",
        "top_text": "Kamara ro Hlayisa Switiviso leri Sirhelelekeke",
        "chat": "bula",
        "voice": "vulavula",
        "download": "Download nkatsakanyo wa PDF",
        "email": "Rhumela eka Imeyili",
        "input_field": "Vutisa Garry hi swivulwa swo karhi...",
        "tap_to_speak": "Tap ku Vulavula",
        "listening": "Garry u Yingisela...",
        "ready_to_assist": "Garry u lunghekele ku pfuneta hi ririmi leri u ri hlawuleke",


    }
  },

  sw: { // Siswati
        // Onboarding
    translation: {
        "welcome": "Sawubona. Ngingu Garry..",
        "identity_ask": "Ngingabuta kutsi ngubani lenginenjabulo yekumsita lamuhla?",
        "nav_liaison": "Garry // Kuchumana",
        "btn_next": "Lokulandzelako",
        "btn_initialize": "Asicale",
        "placeholder_name": "Libito lakho...",
        "email_ask": "Kufanele ngitfumele kuphi sifinyeto sakho?",
        "auth_status": "Kucinisekisiwe",
        "greeting_peekaboo": "Peekaboo.. ndza ku vona, <spanName>{{name}}</spanName> swa tsakisa ku hlangana na wena.",
        // Home
        "content": "Ngingu Garry, Umxhumanisi wakho Wetemtsetfo. Indzima yami kuhlatiya ema-T&C e-KGA, ngibone bungoti lobungaba khona, futsi nginikete kucaca ngelulwimi lolukhetsako. Ngingakusita njani lamuhla?",
        "top_text":"Igumbi Lekucocisana Leliphephile",
        "chat": "kucoca",
        "voice": "khuluma",
        "download": "Landza sifinyeto se-PDF",
        "email": "Tfumela ku-imeyili",
        "input_field": "Buta Garry ngetigaba letitsite...",
        "tap_to_speak": "Chafata Kuze Ukhulume",
        "listening": "Garry uyalalela...",
        "ready_to_assist": "Garry ukulungele kukusita ngelulwimi lolukhetsile",


    }
  },

  tsn: { // Setswana
    // Onboarding
    translation: {
        "welcome": "Dumelang. Ke nna Garry..",
        "identity_ask": "A nka botsa gore ke na le tshiamelo ya go thusa mang gompieno?",
        "nav_liaison": "Garry // Puisano",
        "btn_next": "Latelang",
        "btn_initialize": "A re Simololeng",
        "placeholder_name": "Leina la gago...",
        "email_ask": "Ke romele tshoboko ya gago kae?",
        "auth_status": "E netefaditswe",
        "greeting_peekaboo": "Peekaboo.. Ke a go bona, <spanName>{{name}}</spanName> ke itumelela go go itse.",
        // Home
        "content": "Ke nna Garry, Mogokaganyi wa gago wa Semolao. Seabe sa me ke go sekaseka Di-T&C tsa KGA, go lemoga dikotsi tse di ka nnang teng, le go tlamela ka tlhaloso ka puo e o e ratang. Nka go thusa jang gompieno?",
        "top_text": "Phaposi e e Sireletsegileng ya Tlhalosetso",
        "chat": "tlotla",
        "voice": "bua",
        "download": "Laisolola tshoboko ya PDF",
        "email": "Romela kwa Imeileng",
        "input_field": "Botsa Garry ka dipolelwana tse di rileng...",
        "tap_to_speak": "Tobetsa go Bua",
        "listening": "Garry o reeditse...",
        "ready_to_assist": "Garry o siametse go thusa ka puo e o e tlhophileng",


    }
  }
    
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;