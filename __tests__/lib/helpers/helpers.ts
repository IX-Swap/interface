import fetch from "node-fetch";
const { format } = require("date-fns");
const { expect } = require('@playwright/test');
const DEFAULT_SELECTOR_TIMEOUT = 50000;
const LOADER = '[data-test-id="loader"]';

// getTestAttribute(element) {
//   return `[data-test-id="${element}"]`;
// },

// async markAndCheckCheckBox(page, element, expect) {
//   await page.waitForSelector(LOADER, {
//     state: "detached",
//     timeout: DEFAULT_SELECTOR_TIMEOUT,
//   });
//   await page.check(element, { timeout: DEFAULT_SELECTOR_TIMEOUT });
//   expect(await page.isChecked(element), `The ${element} box is not checked`)
//     .to.be.true;
// },


// async clearField(page, element) {
//   await page.waitForSelector(element, {
//     state: "attached",
//     timeout: DEFAULT_SELECTOR_TIMEOUT,
//   });
//   await page.focus(element);
//   await page.$eval(element, (element_) =>
//     element_.setSelectionRange(0, element_.value.length)
//   );
//   await page.keyboard.press("Backspace");
// },

// async fundraisingNameCreate() {
//   return `FR ${format(new Date(), "HH mm ss")} Groups`;
// },
// //
function emailCreate() {
  return `Luch4${Math.floor(Math.random() * Math.floor(9999999999))}@wwjmp.com`;
}

//   randomNumbers => {
//     return `${Math.floor(Math.random() * 899) + 100}`;
//   },

// upload file
async function uploadFiles(page, element, file, resp = "yes") {
  await page.waitForSelector(element, { state: "attached" });
  const inputsFile = await page.$$(element);
  for (const element of inputsFile) {
    await element.setInputFiles(file);
    await element.evaluate((upload) =>
      upload.dispatchEvent(new Event("change", { bubbles: true }))
    );
    if (resp === "yes") {
      await page.waitForResponse((response) => {
        return (
          response.url() ===
          `https://api.staging.mozork.com/dataroom` && response.status() === 200
        );
      });
    }
  }
}

async function click(selector, page) {
  await page.waitForSelector(LOADER, {
    state: "detached",
    timeout: DEFAULT_SELECTOR_TIMEOUT,
  });
  await page.waitForSelector(selector, {
    state: "attached",
    timeout: DEFAULT_SELECTOR_TIMEOUT,
  });
  try {
    await page.waitForTimeout(500);
    await page.click(selector);
  } catch {
    throw new Error(`Could NOT find SELECTOR for click: ${selector}`);
  }
}

async function typeText(selector, words, page) {
  await page.waitForSelector(LOADER, {
    state: "detached",
    timeout: DEFAULT_SELECTOR_TIMEOUT,
  });
  try {
    await page.waitForSelector(selector, {
      state: "attached",
      timeout: DEFAULT_SELECTOR_TIMEOUT,
    });

    await page.type(selector, words);
  } catch {
    throw new Error(`Could NOT find SELECTOR for type: ${selector}`);
  }
}

async function clearAndTypeText(selector, words, page) {
  await page.waitForSelector(selector, {
    state: "attached",
    timeout: DEFAULT_SELECTOR_TIMEOUT,
  });
  await page.focus(selector);
  const search = await page.waitForSelector(selector, {
    state: "attached",
    timeout: DEFAULT_SELECTOR_TIMEOUT,
  });
  const query = await search.evaluate((element) => element.value);
  for (const _ of query) {
    await page.keyboard.press("Backspace");
  }
  try {
    await page.waitForTimeout(500);
    await page.type(selector, words);
  } catch (error) {
    console.error(error);
    throw new Error(`Could not type text into select: ${selector}`);
  }
}

  async function waitForText(page, words) {
    try {
      await page.waitForSelector(`//*[contains(text(),'${words}')]`, {
        state: "attached",
        timeout: DEFAULT_SELECTOR_TIMEOUT,
      });
    } catch {
      throw new Error(`Text: ${words} not found `);
    }
  }

//   async waitForValue(page, selector, value) {
//     await page.waitForSelector(selector, {
//       timeout: DEFAULT_SELECTOR_TIMEOUT,
//     });
//     const result = await page.evaluate(
//       (selector) => document.querySelector(selector).getAttribute("value"),
//       selector
//     );
//     if (result !== value)
//       throw new Error(`Value: ${value} not found for selector: ${selector}`);
//   },

//   async checkElementsFromList(list, page) {
//     await page.waitForSelector(LOADER, {
//       state: "detached",
//       timeout: DEFAULT_SELECTOR_TIMEOUT,
//     });
//     for (const element of list) {
//       try {
//         await page.waitForSelector(element);
//       } catch {
//         throw new Error(`Selector : ${element}  not found `);
//       }
//     }
//   },

async function shouldExist(selector, page) {
  await page.waitForSelector(LOADER, {
    state: "detached",
    timeout: DEFAULT_SELECTOR_TIMEOUT,
  });
  try {
    await page.waitForSelector(selector, {
      state: "attached",
      timeout: DEFAULT_SELECTOR_TIMEOUT,
    });
  } catch {
    throw new Error(`Selector: ${selector} does not exist`);
  }
}

//   async shouldNotExist(selector, page) {
//     await page.waitForSelector(LOADER, {
//       state: "detached",
//       timeout: DEFAULT_SELECTOR_TIMEOUT,
//     });
//     try {
//       await page.waitForSelector(selector, {
//         state: "detached",
//         timeout: DEFAULT_SELECTOR_TIMEOUT,
//       });
//       return true;
//     } catch {
//       throw new Error(`Selector: ${selector} exist but should not `);
//     }
//   },

//   somewhereClick: async (page) => {
//     const element = await page.waitForSelector(`[alt="logged-in-user"]`, {
//       state: "attached",
//       timeout: DEFAULT_SELECTOR_TIMEOUT,
//     });
//     const box = await element.boundingBox();
//     await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2, {
//       force: true,
//     });
//   },

async function getLinkToConfirmRegistration(email, page) {
  const partsEmail = email.split("@");
  let results;
  let link;
  let messageId;

  for (const i of [1, 2, 3, 4]) {
    await page.waitForTimeout(5000);
    results = await fetch(
      `https://www.1secmail.com/api/v1/?action=getMessages&login=${partsEmail[0]}&domain=${partsEmail[1]}`
    ).then((res) => res.json());
    if (results > 0) {
      break;
    } else if (i === 4 && results === null) {
      throw new Error(`Emails are not sent`);
    }
  }
  for (const result of results) {
    if (result.subject.includes("Invitation")) {
      messageId = result.id;
      break;
    } else {
      messageId = results[0].id;
    }
  }
  try {
    link = await fetch(
      `https://www.1secmail.com/api/v1/?action=readMessage&login=${partsEmail[0]}&domain=${partsEmail[1]}&id=${messageId}`
    ).then((res) => res.json());
    const re = /(https?:\/\/\S+\w)/g;
    const nameList = link.htmlBody.match(re);
    const confLink = nameList[0].split('"');
    return confLink[0];
  } catch (error) {
    console.error(results);
    console.error(link);
    throw new Error(`Get link to confirm invite error`);
  }
}

//   getCount: async (page, element) => {
//     await page.waitForSelector(LOADER, {
//       state: "detached",
//       timeout: DEFAULT_SELECTOR_TIMEOUT,
//     });
//     // Do not add wait for element
//     const sum = await page.$$eval(element, (elements) => elements.length);
//     return sum;
//   },

async function waitForResponseInclude  (page, responseText) {
    try {
      await page.waitForResponse(
        (response) =>
          response.url().includes(`${responseText}`) &&
          response.status() === 200,
        { timeout: DEFAULT_SELECTOR_TIMEOUT }
      );
      await page.waitForSelector(LOADER, {
        state: "detached",
        timeout: DEFAULT_SELECTOR_TIMEOUT,
      });
    } catch {
      throw new Error(`Response url does NOT include: ${responseText} `);
    }
  }

async function navigate(url, page, wait = "networkidle") {
  try {
    await page.goto(url, {
      waitUntil: wait,
      timeout: DEFAULT_SELECTOR_TIMEOUT,
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Page is not loaded with wait parameter: ${wait} `);
  }
}


//   clickOnText: async (page, text, index = "1") => {
//     await page.waitForSelector(LOADER, {
//       state: "detached",
//       timeout: DEFAULT_SELECTOR_TIMEOUT,
//     });
//     await page.waitForSelector(`(//*[contains(text(),'${text}')])[${index}]`);
//     try {
//       await page.click(`(//*[contains(text(),'${text}')])[${index}]`);
//     } catch {
//       throw new Error(`Can not click on the text "${text}"`);
//     }
//   },
//   isDisabledCheck: async (page, element) => {
//     await page.waitForSelector(element, {
//       timeout: DEFAULT_SELECTOR_TIMEOUT,
//     });
//     try {
//       const result = await page.isDisabled(element);
//       return result;
//     } catch {
//       throw new Error(`Can not click on the text "${text}"`);
//     }
//   },

//   getTextFromElement: async (page, element) => {
//     try {
//       await page.waitForSelector(element, {
//         timeout: DEFAULT_SELECTOR_TIMEOUT,
//       });
//       // eslint-disable-next-line unicorn/prefer-text-content
//       const result = await page.innerText(element);
//       return result;
//     } catch (error) {
//       console.error(error);
//       throw new Error(`Can't get the text`);
//     }
//   },

//   waitNewPage: async (page, context, element) => {
//     const [secondPage] = await Promise.all([
//       context.waitForEvent("page"),
//       page.click(element),
//     ]);
//     return secondPage;
//   },

async function screenshotMatching (name, page, range = 0.9)  {
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot(`${name}.png`, {
      threshold: range,
    });
  }

export {
  screenshotMatching,
  click,
  uploadFiles,
  typeText,
  getLinkToConfirmRegistration,
  shouldExist,
  emailCreate,
  navigate,
  clearAndTypeText,
  waitForResponseInclude,waitForText
};
