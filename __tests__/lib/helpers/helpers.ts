import fetch from 'node-fetch'
import { expect } from '@playwright/test'

const LOADER = '[role="progressbar"]'
const DEFAULT_SELECTOR_TIMEOUT = 50000

async function waitNewPage(context, page, element) {
  const [secondPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click(element)
  ])
  return secondPage
}

const randomString = (length = 8) => {
  // Declare all characters
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  // Pick characers randomly
  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return str
}

function emailCreate() {
  return `Luch4${Date.now()}@wwjmp.com`
}

// upload file
async function uploadFiles(page, element, file, resp = 'yes') {
  await page.waitForSelector(element, { state: 'attached' })
  const inputsFile = await page.$$(element)
  for (const element of inputsFile) {
    await element.setInputFiles(file)
    await element.evaluate(upload =>
      upload.dispatchEvent(new Event('change', { bubbles: true }))
    )
    if (resp === 'yes') {
      await page.waitForResponse(response => {
        return (
          response.url() === `https://api.staging.mozork.com/dataroom` &&
          response.status() === 200
        )
      })
    }
  }
  return { inputsFile }
}

async function click(selector, page) {
  await page.waitForSelector(LOADER, {
    state: 'detached',
    timeout: DEFAULT_SELECTOR_TIMEOUT
  })
  await page.waitForSelector(selector, {
    state: 'attached',
    timeout: DEFAULT_SELECTOR_TIMEOUT
  })
  try {
    await page.click(selector)
  } catch {
    throw new Error(`Could NOT find SELECTOR for click: ${selector}`)
  }
}

async function typeText(selector, words, page) {
  await page.waitForSelector(LOADER, {
    state: 'detached',
    timeout: DEFAULT_SELECTOR_TIMEOUT
  })
  try {
    await page.waitForSelector(selector, {
      state: 'attached',
      timeout: DEFAULT_SELECTOR_TIMEOUT
    })

    await page.type(selector, words)
  } catch {
    throw new Error(`Could NOT find SELECTOR for type: ${selector}`)
  }
}

async function clearAndTypeText(selector, words, page) {
  //wait until the page loader detached
  await page.waitForSelector(LOADER, {
    state: 'detached',
    timeout: DEFAULT_SELECTOR_TIMEOUT
  })

  //wait element
  const search = await page.waitForSelector(selector, {
    state: 'attached',
    timeout: DEFAULT_SELECTOR_TIMEOUT
  })

  //Focus and clear field
  await page.focus(selector)
  const query = await search.evaluate(element => element.value)
  for (const _ of query) {
    await page.keyboard.press('Backspace')
  }
  try {
    await page.type(selector, words)
  } catch (error) {
    console.error(error)
    throw new Error(`Could not type text into select: ${selector}`)
  }
}

async function waitForText(page, words) {
  try {
    await page.waitForSelector(`//*[contains(text(),'${words}')]`, {
      state: 'attached',
      timeout: DEFAULT_SELECTOR_TIMEOUT
    })
    return true
  } catch {
    throw new Error(`Text: ${words} not found `)
  }
}

async function shouldExist(selector, page) {
  try {
    await page.waitForSelector(selector, {
      state: 'attached',
      timeout: DEFAULT_SELECTOR_TIMEOUT
    })
  } catch {
    throw new Error(`Selector: ${selector} does not exist`)
  }
}

async function shouldNotExist(selector, page) {
  try {
    await page.waitForSelector(selector, {
      state: 'detached',
      timeout: DEFAULT_SELECTOR_TIMEOUT
    })
    return true
  } catch {
    throw new Error(`Selector: ${selector} exist but should not `)
  }
}

async function getLinkToConfirmRegistration(email, page) {
  const partsEmail = email.split('@')
  let results
  let link
  let messageId

  for (const i of [1, 2, 3, 4]) {
    await page.waitForTimeout(5000)
    results = await fetch(
      `https://www.1secmail.com/api/v1/?action=getMessages&login=${partsEmail[0]}&domain=${partsEmail[1]}`
    ).then(res => res.json())
    if (results > 0) {
      break
    } else if (i === 4 && results === null) {
      throw new Error(`Emails are not sent`)
    }
  }
  for (const result of results) {
    if (result.subject.includes('Invitation')) {
      messageId = result.id
      break
    } else {
      messageId = results[0].id
    }
  }
  try {
    link = await fetch(
      `https://www.1secmail.com/api/v1/?action=readMessage&login=${partsEmail[0]}&domain=${partsEmail[1]}&id=${messageId}`
    ).then(res => res.json())
    const re = /https:[\'"]?([^\'" >]+\d+\w+)/g
    const nameList = link.htmlBody.match(re)
    return nameList[0]
  } catch (error) {
    // console.error(results)
    // console.error(link)
    throw new Error(`Get link to confirm invite error`)
  }
}

async function waitForResponseInclude(page, responseText) {
  try {
    await page.waitForResponse(
      response =>
        response.url().includes(`${responseText}`) && response.status() === 200,
      { timeout: DEFAULT_SELECTOR_TIMEOUT }
    )
  } catch {
    throw new Error(`Response url does NOT include: ${responseText} `)
  }
}

async function navigate(url, page, wait = 'networkidle') {
  try {
    await page.goto(url, {
      waitUntil: wait,
      timeout: DEFAULT_SELECTOR_TIMEOUT
    })
  } catch (error) {
    console.error(error)
    throw new Error(`Page is not loaded with wait parameter: ${wait} `)
  }
}

async function screenshotMatching(name, page, range = 0.9) {
  await page.waitForSelector(LOADER, {
    state: 'detached',
    timeout: DEFAULT_SELECTOR_TIMEOUT
  })
  const screenshot = await page.screenshot()
  expect(screenshot).toMatchSnapshot(`${name}.png`, {
    threshold: range
  })
}

export {
  shouldNotExist,
  screenshotMatching,
  click,
  uploadFiles,
  typeText,
  getLinkToConfirmRegistration,
  shouldExist,
  emailCreate,
  navigate,
  clearAndTypeText,
  waitForResponseInclude,
  waitForText,
  randomString,
  waitNewPage
}
