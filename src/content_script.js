const SKIP_INTRO = "skip_intro";
const SKIP_RECAP = "skip_recap";
const NEXT_EPISODE = "next_epi";
const SKIP_ADS = "skip_ads";

const LOADING_TEXT = "Skipping...";

const NETFLIX = "netflix";
const PRIME = "prime";
const memoizedLocale = memoize(getLocaleForPrime);
const COUNTRY_API_FAILED = "COUNTRY_API_FAILED";
const REQUEST_BLOCKED = "REQUEST_BLOCKED";
const locale = memoizedLocale("locale");

const elementMapping = [
  {
    type: NETFLIX,
    selector: "[aria-label='Skip Intro']",
    locale,
  },
  {
    type: NETFLIX,
    selector: ".skip-credits > a",
    locale,
  },
  {
    type: NETFLIX,
    selector: "[aria-label='Skip Recap']",
    locale,
  },
  {
    type: NETFLIX,
    selector: "[aria-label='Continue Playing']",
    locale,
  },
  {
    type: NETFLIX,
    selector: ".interrupter-actions > .nf-icon-button:first-child",
    locale,
  },
  {
    type: PRIME,
    selector: ".skipElement",
    locale,
  },
  {
    type: PRIME,
    selector: ".adSkipButton",
    locale,
  },
  {
    type: PRIME,
    selector: ".nextUpCard",
    locale,
  },
  {
    type: PRIME,
    skipEvent: SKIP_INTRO,
    selector: `//*[text()="${translateLocale(SKIP_INTRO).translatedText}"]`,
    xpath: true,
    ...translateLocale(SKIP_INTRO),
  },
  {
    type: PRIME,
    skipEvent: SKIP_RECAP,
    selector: `//*[text()="${translateLocale(SKIP_RECAP).translatedText}"]`,
    xpath: true,
    ...translateLocale(SKIP_RECAP),
  },
  {
    type: PRIME,
    skipEvent: SKIP_ADS,
    selector: `//*[text()="${translateLocale(SKIP_ADS).translatedText}"]`,
    xpath: true,
    ...translateLocale(SKIP_ADS),
  },
  {
    type: PRIME,
    skipEvent: NEXT_EPISODE,
    selector: `//*[text()="${
      translateLocale(NEXT_EPISODE).translatedText
    }"]/parent::div/following-sibling::div`,
    extraWait: true,
    xpath: true,
    ...translateLocale(NEXT_EPISODE),
  },
  {
    type: NETFLIX,
    selector: "[data-testid='up-next-play-button']",
  },
];
const i18nMap = {
  en_US: {
    next_epi: "Next Up",
    skip_intro: "Skip Intro",
    skip_recap: "Skip Recap",
    skip_ads: "Skip",
  },
  en_GB: {
    next_epi: "Next Up",
    skip_intro: "Skip Intro",
    skip_recap: "Skip Recap",
    skip_ads: "Skip",
  },
  es_ES: {
    skip_intro: "Omitir introducción",
    next_epi: "A continuación",
    skip_recap: "Omitir resumen",
    skip_ads: "Saltar",
  },
  fr_FR: {
    skip_intro: "Ignorer l'introduction",
    next_epi: "Ép. suivant",
    skip_recap: "Ignorer le récap",
    skip_ads: "Ignorer",
  },
  it_IT: {
    skip_intro: "Salta l'intro",
    next_epi: "Segue",
    skip_recap: "Salta riassunto",
    skip_ads: "Salta",
  },
  da_DK: {
    skip_intro: "Spring over intro",
    next_epi: "Næste",
    skip_recap: "Spring over resumé",
    skip_ads: "Spring over",
  },
  id_ID: {
    skip_intro: "Lewati Intro",
    next_epi: "Berikutnya",
    skip_recap: "Lewati Ringkasan",
    skip_ads: "Lewati",
  },
  nl_NL: {
    skip_intro: "Intro overslaan",
    next_epi: "Volgende",
    skip_recap: "Samenvatting overslaan",
    skip_ads: "Overslaan",
  },
  nb_NO: {
    skip_intro: "Hopp over intro",
    next_epi: "Neste",
    skip_recap: "Hopp over sammendrag",
    skip_ads: "Hopp over",
  },
  pl_PL: {
    skip_intro: "Pomiń wstęp",
    next_epi: "Następny",
    skip_recap: "Pomiń podsumowanie",
    skip_ads: "Pomiń",
  },
  pt_BR: {
    skip_intro: "Pular abertura",
    next_epi: "A seguir",
    skip_recap: "Pular resumo",
    skip_ads: "Pular",
  },
  de_DE: {
    next_epi: "Nächste",
    skip_intro: "Vorspann überspringen",
    skip_recap: "Rückblick überspringen",
    skip_recap_extra: "Zusammenfassung überspringen",
    skip_ads: "Überspringen",
  },
  fi_FI: {
    skip_intro: "Ohita intro",
    next_epi: "Seuraavaksi",
    skip_recap: "Ohita yhteenveto",
    skip_ads: "Ohita",
  },
  sv_SE: {
    skip_intro: "Hoppa över intro",
    next_epi: "Nästa",
    skip_recap: "Hoppa över resumé",
    skip_ads: "Hoppa",
  },
  tr_TR: {
    next_epi: "Sıradaki",
    skip_intro: "Jeneriği Atla",
    skip_recap: "Özeti Atla",
  },
  ru_RU: {
    skip_intro: "Пропустить заставку",
    next_epi: "Следующее",
    skip_recap: "Пропустить содержание предыдущих серий",
    skip_ads: "Пропускать",
  },
  hi_IN: {
    skip_intro: "परिचय छोड़ें",
    next_epi: "इसके बाद",
    skip_recap: "रीकैप छोड़ें",
  },
  ta_IN: {
    skip_intro: "அறிமுகம் தவிர்",
    next_epi: "அடுத்து",
    skip_recap: "சிறுநினைவூட்டல் தவிர்",
  },
  te_IN: {
    skip_intro: "పరిచయం దాటవేయి",
    next_epi: "తరువాత రాబోయేది",
    skip_recap: "రీక్యాప్ దాటవేయి",
  },
  th_TH: {
    skip_intro: "ข้ามบทนำ",
    next_epi: "เรื่องต่อไป",
    skip_recap: "ข้ามเรื่องย่อตอนที่แล้ว",
  },
  zh_CN: {
    skip_intro: "跳过片头",
    next_epi: "下一个节目",
    skip_recap: "跳过回顾",
  },
  zh_TW: {
    skip_intro: "略過簡介",
    next_epi: "接著播放",
    skip_recap: "略過前集提要",
  },
  ko_KR: {
    skip_intro: "소개 건너뛰기",
    next_epi: "다음 영상",
    skip_recap: "요약 건너뛰기",
  },
  ja_JP: {
    skip_intro: "紹介をスキップ",
    next_epi: "次のエピソード",
    skip_recap: "要約をスキップ",
    skip_ads: "広告をスキップ",
  },
};
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function fetchDomNode(elements) {
  for (element of elements) {
    const { selector, xpath } = element;
    let domNode;
    if (!xpath) {
      domNode = document.querySelector(selector);
    }

    if (!domNode && xpath) {
      domNode = document.evaluate(
        element.selector,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
    }

    if (domNode) {
      return {
        ...element,
        domNode,
      };
    }
  }
}

function getInnerText(domNode, type) {
  if (type === NETFLIX && domNode.firstElementChild) {
    return domNode.firstElementChild.innerText;
  }

  return domNode.innerText;
}

async function setInnerText(domNode, type, text) {
  if (type === NETFLIX && domNode.firstElementChild) {
     
    await sleep(250);
    return;
  }

  domNode.innerText = text;
  await sleep(500);
}

function getLocaleForPrime() {
  const scripts = document.querySelectorAll('script[type="text/template"]');

  const regEx = new RegExp('(?<="locale":")(.*?)(?=")');

  for (script of scripts) {
    const eachScriptInnerText = script.innerText;
    const locale = eachScriptInnerText.match(regEx);

    if (locale) {
      return locale[0];
    }
  }
}

function syncLocalData(key) {
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], function (items) {
      resolve(JSON.parse(items.data));
    });
  });
}

function memoize(callback) {
  let memoHash = {};
  return (param) => {
    if (memoHash[param]) {
      return memoHash[param];
    } else {
      memoHash[param] = callback();
      return memoHash[param];
    }
  };
}

// this is for just for analytics purpose
function getCountryAndState() {
  return fetch("https://ipapi.co/json/");
}

function translateLocale(skipEventKey) {
  const fallbackLocale = "fr_FR";
  const locale = memoizedLocale("locale");

  if (i18nMap[locale]) {
    if (i18nMap[locale][skipEventKey]) {
      return {
        translatedText: i18nMap[locale][skipEventKey],
        localeFound: true,
        keyFound: true,
        locale,
      };
    } else {
      return {
        translatedText: i18nMap[fallbackLocale][skipEventKey],
        localeFound: true,
        keyFound: false,
        locale,
      };
    }
  } else {
    return {
      translatedText: i18nMap[fallbackLocale][skipEventKey],
      localeFound: false,
      keyFound: false,
      locale,
    };
  }
}
async function skipNetflixAndPrime() {
    try {
      let skipButton;
      try {
        skipButton = fetchDomNode(elementMapping);
      } catch (err) {
        errorTrack(err, "FETCH_DOM_NODE");
      }
  
      if (!skipButton) {
        return;
      }
  
      const { domNode, type, extraWait, ...rest } = skipButton;
  
      if (domNode) {
        const innerText = getInnerText(domNode, type);
  
        if (innerText.toLowerCase() === LOADING_TEXT.toLowerCase()) {
          return;
        }
  
        if (extraWait) {
          await sleep(700);
        }
  
        await setInnerText(domNode, type, LOADING_TEXT);
        domNode.click();
  
        let response;
        try {
          response = await getCountryAndState();
          response = await response.json();
        } catch (err) {
          const errObj = {
            message: err.message,
            errCode: response ? response.status : REQUEST_BLOCKED,
          };
          errorTrack(errObj, "COUNTRY_API_FUNC");
        }
  
        const countryName = response
          ? response.country_name
            ? response.country_name
            : COUNTRY_API_FAILED
          : REQUEST_BLOCKED;
        const countryCode = response
          ? response.country_code
            ? response.country_code
            : COUNTRY_API_FAILED
          : REQUEST_BLOCKED;
        const city = response
          ? response.city
            ? response.city
            : COUNTRY_API_FAILED
          : REQUEST_BLOCKED;
  
        const data = {
          event: "Skipped",
          properties: {
            token: secretKey,
            extensionId:
              chrome.runtime && chrome.runtime.id
                ? chrome.runtime.id
                : "ID_NOT_PRESENT",
            type,
            innerTextDatum: innerText,
            countryName,
            countryCode,
            city,
            version,
            osLocale: window.navigator.language,
            ...rest,
          },
        };
  
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  setInterval(() => skipNetflixAndPrime(), 850);
  
