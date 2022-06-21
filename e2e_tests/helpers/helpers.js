const fetch = require('node-fetch')
const TIMEOUT = 20000

module.exports = {
  getRequest: async (link) => {
    const result = fetch(link)
    // .then((res) => {
    // console.log(res.ok);
    // console.log(res.status);
    // console.log(res.statusText);
    // console.log(res.headers.raw());
    // console.log(res.headers.get("content-type"));
    // });
    return result
  },

  postRequest: async (link, data) => {
    try {
      const result = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: data,
      })
      return result
    } catch (error) {
      console.log(error)
      throw new Error(`Post request is failed`)
    }
  },

  emailCreate(emailName = 'autoTest') {
    return `${emailName}${Math.floor(Math.random(999999) * Math.floor(9999999999))}@wwjmp.com`
  },

  clearField: async (selector, page) => {
    try {
      await page.waitForSelector(selector, { timeout: TIMEOUT })
      await page.focus(selector)
      await page.$eval(selector, (selector_) => selector_.setSelectionRange(0, selector_.value.length))
      await page.keyboard.press('Backspace')
    } catch (error) {
      console.error(error)
      throw new Error(`Could not click on selector: ${selector}`)
    }
  },

  // API for receiving emails and messages

  getAllEmails: async (email, page) => {
    const partsEmail = email.split('@')
    let result
    for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      await page.waitForTimeout(6000)
      result = await fetch(
        `https://www.1secmail.com/api/v1/?action=getMessages&login=${partsEmail[0]}&domain=${partsEmail[1]}`
      ).then((res) => res.json())
      if (result.length > 0) {
        return [result, partsEmail]
      } else if (i === 9 && result.length === 0) {
        console.error(result)
        throw new Error(`Emails are not sent(waiting 60 sec)`)
      }
    }
  },
  getLinkToConfirmation: async (emails, partsEmail, emailIndex = 0) => {
    try {
      const message = await fetch(
        `https://www.1secmail.com/api/v1/?action=readMessage&login=${partsEmail[0]}&domain=${partsEmail[1]}&id=${emails[emailIndex].id}`
      ).then((res) => res.json())
      const re = /(https?:\/\/\S+\w)/g
      const nameList = message.textBody.match(re)
      return nameList
    } catch (error) {
      console.error(error)
      return null
    }
  },

  uploadFiles: async (selector, file, page) => {
    await page.waitForSelector(selector, {
      state: 'attached',
      timeout: TIMEOUT,
    })
    const inputsFile = await page.$$(selector)
    for (const element of inputsFile) {
      await element.setInputFiles(file)
      await element.evaluate((upload) => upload.dispatchEvent(new Event('change', { bubbles: true })))
    }
  },

  click: async (selector, page) => {
    try {
      await page.waitForSelector(selector, { timeout: 40000 })
      await page.click(selector)
    } catch {
      throw new Error(`Could not click on selector: ${selector}`)
    }
  },

  typeText: async (selector, words, page) => {
    try {
      await page.waitForSelector(selector, { timeout: TIMEOUT })
      await page.type(selector, words)
    } catch {
      throw new Error(`Could not type text into field: ${selector}`)
    }
  },

  getText: async (selector, page) => {
    try {
      await page.waitForSelector(selector, {
        state: 'attached',
        timeout: TIMEOUT,
      })
      return await page.innerText(selector)
    } catch (error) {
      throw new Error(`Cannot find text from selector: ${selector}`)
    }
  },

  clearAndTypeText: async (selector, words, page) => {
    await page.waitForSelector(selector, { timeout: TIMEOUT })
    await page.focus(selector)
    await page.$eval(selector, (selector_) => selector_.setSelectionRange(0, selector_.value.length))
    await page.keyboard.press('Backspace')
    try {
      await page.type(selector, words)
    } catch {
      throw new Error(`Could not type text into field: ${selector}`)
    }
  },

  getValue: async (selector, page) => {
    await page.waitForSelector(selector, { timeout: TIMEOUT })
    const result = await page.evaluate((selector) => document.querySelector(selector).getAttribute('value'), selector)
    return result
  },

  shouldExist: async (selector, page) => {
    try {
      await page.waitForSelector(selector, { timeout: TIMEOUT })
    } catch (error) {
      throw new Error(`Selector: ${selector} does not exist`)
    }
  },
  async shouldNotExist(selector, page) {
    try {
      await page.waitForSelector(selector, {
        state: 'detached',
        timeout: TIMEOUT,
      })
      return true
    } catch {
      throw new Error(`Selector: ${selector} exist but should not `)
    }
  },
  getCount: async (selector, page) => {
    const links = await page.$$eval(selector, (selector) => selector.length)
    return links
  },

  navigate: async (url, page, wait = 'networkidle') => {
    try {
      await page.goto(url, { waitUntil: wait, timeout: TIMEOUT })
    } catch (error) {
      console.error(error)
      throw new Error(`Page is not loaded with wait parameter: ${wait} `)
    }
  },

  waitForResponseInclude: async (responseText, page) => {
    try {
      await page.waitForResponse((response) => response.url().includes(`${responseText}`))
    } catch {
      throw new Error(`Response url does NOT include: ${responseText} `)
    }
  },

  waitForRequestInclude: async (requestText, page) => {
    try {
      await page.waitForRequest((request) => {
        return request.url().includes(requestText)
      })
    } catch {
      throw new Error(`Request url does NOT include: ${responseText} `)
    }
  },

  screenshotMatching: async function (name, expect, page, range = 0.9) {
    const screenshot = await page.screenshot()
    expect(screenshot).toMatchSnapshot(`${name}.png`, {
      threshold: range,
    })
  },

  waitForText: async (text, page) => {
    try {
      await page.waitForSelector(`//*[contains(text(),"${text}")]`, { timeout: 80000 })
    } catch (error) {
      console.error(error)
      throw new Error(`No text appears ${text} `)
    }
  },

  clickIfElementDoesNotDisappears: async (selector, page, forClick = selector) => {
    if ((await page.$(selector)) !== null) await page.click(forClick)
  },

  getTestAttribute(element) {
    return `[data-testid="${element}"]`
  },

  makeScreenOnError: async (name, error, page) => {
    // name = name.replace(/ /g, '')
    try {
      await page.screenshot({ path: `__tests__/screen-test-failed/${name}.png` })
    } catch (error) {}
  },

  waitNewPage: async (page, context, element) => {
    const [secondPage] = await Promise.all([context.waitForEvent('page'), page.click(element)])
    return secondPage
  },
}
