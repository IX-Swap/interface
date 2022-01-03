import fetch from 'node-fetch'
import { expect } from '@playwright/test'

const LOADER = '[role="progressbar"]'
const DEFAULT_SELECTOR_TIMEOUT = 50000

const attachedState = {
  state: 'attached',
  timeout: DEFAULT_SELECTOR_TIMEOUT
}
const detachedState = {
  state: 'detached',
  timeout: DEFAULT_SELECTOR_TIMEOUT
}
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
  await page.waitForSelector(element, attachedState)
  const inputsFile = await page.$$(element)
  for (const element of inputsFile) {
    await element.setInputFiles(file)
    await element.evaluate(upload =>
      upload.dispatchEvent(new Event('change', { bubbles: true }))
    )
    if (resp === 'yes') {
      await waitForResponseInclude(page, '/dataroom')
    }
  }
  return { inputsFile }
}

async function click(selector, page) {
  await page.waitForSelector(LOADER, detachedState)
  await page.waitForSelector(selector, attachedState)
  try {
    await page.click(selector)
  } catch {
    throw new Error(`Could NOT find SELECTOR for click: ${selector}`)
  }
}

async function typeText(selector, words, page) {
  await page.waitForSelector(LOADER, detachedState)
  try {
    await page.waitForSelector(selector, attachedState)

    await page.type(selector, words)
  } catch {
    throw new Error(`Could NOT find SELECTOR for type: ${selector}`)
  }
}

async function clearAndTypeText(selector, words, page) {
  //wait until the page loader detached
  await page.waitForSelector(LOADER, detachedState)
  try {
    const field = await page.waitForSelector(selector, attachedState)
    await field.click()
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Backspace')
    await field.type(words)
    return words
  } catch (error) {
    console.error(error)
    throw new Error(`Could not type text into select: ${selector}`)
  }
}

async function waitForText(page, words) {
  try {
    await page.waitForSelector(
      `//*[contains(text(),'${words}')]`,
      attachedState
    )
    return true
  } catch {
    throw new Error(`Text: ${words} not found `)
  }
}

async function shouldExist(selector, page) {
  try {
    await page.waitForSelector(selector, attachedState)
    return true
  } catch {
    throw new Error(`Selector: ${selector} does not exist`)
  }
}

async function shouldNotExist(selector, page) {
  try {
    await page.waitForSelector(selector, detachedState)
    return true
  } catch {
    throw new Error(`Selector: ${selector} exist but should not `)
  }
}
async function isDisabledList(list: Array<[]>, page) {
  let result = new Array()
  for (const item of list) {
    const isDis = await page.isDisabled(item)
    result.push(isDis)
  }
  return result
}

async function getMessage(email, page, messageTitle = 'Invitation') {
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
    if (result.subject.includes(messageTitle)) {
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
    return link
  } catch (error) {
    console.error(results)
    console.error(link)
    throw new Error(`"Get message" by API doesn't work `)
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
async function waitForRequestInclude(page, requestText, method = 'GET') {
  try {
    await page.waitForRequest(
      request =>
        request.url().includes(requestText) && request.method() === method
    )
  } catch {
    throw new Error(
      `Request url does NOT include: ${requestText} or the method is not ${method} `
    )
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

async function screenshotMatching(name: string, element, page, range = 0.9) {
  await page.waitForSelector(LOADER, detachedState)
  const screenshot = await element.screenshot()
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
  getMessage,
  shouldExist,
  emailCreate,
  navigate,
  clearAndTypeText,
  waitForResponseInclude,
  waitForRequestInclude,
  waitForText,
  randomString,
  waitNewPage,
  isDisabledList
}
