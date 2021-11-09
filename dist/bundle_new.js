const SKIP_INTRO = "skip_intro";
const SKIP_INTRO_PRIME = "skip_intro_prime";
const SKIP_INTRO_DISNEY = "skip_intro_disney";
const SKIP_RECAP = "skip_recap";
const NEXT_EPISODE = "next_epi";
const NEXT_EPISODE_DISNEY = "next_epi_disney";
const SKIP_ADS = "skip_ads";
const i18nMap = {
  fr_FR: {
    skip_intro: "Ignorer l'introduction",
    skip_intro_prime: "Passer l'intro",
    skip_intro_disney: "IGNORER L'INTRO",
    next_epi: "Ép. suivant",
    next_epi_disney: "ÉPISODE SUIVANT DANS 10",
    skip_recap: "Ignorer le récap",
    skip_ads: "Ignorer",
  },
};
const LOADING_TEXT = "Skipping...";

const NETFLIX = "netflix";
const PRIME = "prime";
const memoizedLocale = memoize(getLocaleForPrime);
const COUNTRY_API_FAILED = "COUNTRY_API_FAILED";
const REQUEST_BLOCKED = "REQUEST_BLOCKED";
const locale = memoizedLocale("locale");

const elementMapping = [
  {
    type: PRIME,
    skipEvent: SKIP_INTRO,
    selector: `//*[text()="${translateLocale(SKIP_INTRO).translatedText}"]`,
    xpath: true,
    ...translateLocale(SKIP_INTRO),
  },
  {
    type: PRIME,
    skipEvent: SKIP_INTRO_PRIME,
    selector: `//*[text()="${translateLocale(SKIP_INTRO_PRIME).translatedText}"]`,
    xpath: true,
    ...translateLocale(SKIP_INTRO_PRIME),
  },
  {
    type: PRIME,
    skipEvent: SKIP_INTRO_DISNEY,
    selector: `//*[text()="${translateLocale(SKIP_INTRO_DISNEY).translatedText}"]`,
    xpath: true,
    ...translateLocale(SKIP_INTRO_DISNEY),
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
    type: PRIME,
    skipEvent: NEXT_EPISODE,
    selector: `//*[text()="${translateLocale(NEXT_EPISODE).translatedText}"]`,
    xpath: true,
    ...translateLocale(NEXT_EPISODE),
  },
  {
    type: PRIME,
    skipEvent: NEXT_EPISODE_DISNEY,
    selector: `//*[text()="${translateLocale(NEXT_EPISODE_DISNEY).translatedText}"]`,
    xpath: true,
    ...translateLocale(NEXT_EPISODE_DISNEY),
  },
];

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
      console.log(element)
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
      console.log(locale[0])
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
        console.log("innetText "+innerText)
        console.log(document.querySelectorAll('script[type="text/template"]'))
  
        if (innerText.toLowerCase() === LOADING_TEXT.toLowerCase()) {
          return;
        }
  
        if (extraWait) {
          await sleep(700);
        }
  
        await setInnerText(domNode, type, LOADING_TEXT);
        console.log(domNode, type, LOADING_TEXT)
        domNode.click();

      }
    } catch (err) {}
  }
  
  setInterval(() => skipNetflixAndPrime(), 850);
  
