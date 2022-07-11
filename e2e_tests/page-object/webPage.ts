import {BrowserContext, expect, Locator, Page} from '@playwright/test';
import config from "../playwright.config";
import {timeouts} from "../helpers/timeouts";

export class WebPage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly loader: Locator;

  constructor(page: Page, context?: BrowserContext) {
    this.page = page;
    this.context = context;
    this.loader = page.locator('[img[alt="Loading..."]');
  }

  async click(locator: Locator) {
    await this.page.waitForLoadState();
    await locator.click();
  }

  async reloadPage() {
    await this.page.reload({waitUntil: 'load'});
  }

  async uploadFile(buttonToOpenUpload: Locator, filePath: string) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      await buttonToOpenUpload.click()
    ]);
    await fileChooser.setFiles(filePath);
  }

  async assertElementScreenshotMatchToSnapshot(element: Locator) {
    await this.page.waitForTimeout(2000);
    expect(await element.screenshot()).toMatchSnapshot();
  }

  async assertPageScreenshotMatchToSnapshot(page: Page) {
    await this.page.waitForTimeout(2000);
    expect(await page.screenshot()).toMatchSnapshot();
  }

  async newPageHandle(page: Page, element: string, replacingPage: boolean = false) {
    let indexOfPageToBeReturned;
    const numberOfPagesBeforeNewPage = await this.context.pages().length;

    await page.click(element);

    if (replacingPage) {
      indexOfPageToBeReturned = numberOfPagesBeforeNewPage - 1; // array of pages returned starting from 0

      await this.waitForOpenPagesNumber(numberOfPagesBeforeNewPage - 1);
      await this.waitForOpenPagesNumber(numberOfPagesBeforeNewPage);
    } else {
      indexOfPageToBeReturned = numberOfPagesBeforeNewPage;

      await this.waitForOpenPagesNumber(numberOfPagesBeforeNewPage + 1);
    }

    const newPage = this.context.pages()[indexOfPageToBeReturned];

    if(!newPage) throw new Error('New page was not opened');
    await newPage.waitForLoadState();
    return newPage;
  }

  async openAndReplacePageByClick(page: Page, element: string) {
    return await this.newPageHandle(page, element, true)
  }

  async openNewPageByClick(page: Page, element: string) {
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      setTimeout(() => page.click(element), timeouts.tinyTimeout)
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async openNewPopUpBy(page: Page, element) {
    const [newPopUp] = await Promise.all([
      this.page.waitForEvent('popup'),
      page.click(element)
    ]);
    await newPopUp.waitForLoadState();
    return newPopUp;
  }

  async waitForOpenPagesNumber(expectedNumber: number) {
    let intervalId;
    return await new Promise((resolve, reject) => {
      intervalId = setInterval(() => {
        if (this.context.pages().length == expectedNumber) {
          clearInterval(intervalId);
          return resolve(true);
        }
      }, 200);

      setTimeout(() => {
        clearInterval(intervalId);
        return reject(new Error(`Expected opened pages number to be: ${expectedNumber} but got: ${this.context.pages().length} ${this.context.pages()}`));
      }, config.expect.timeout);
    })
  }

  async checkThatDataFromClipboardIsEqualTo(data: string) {
    await expect(await this.page.evaluate(() => navigator.clipboard.readText())).toEqual(data);
  }

  async getCountOf (selector: string)  {
    return await this.page.$$eval(selector, selector => selector.length);
  }

  async clickWhileElementNotVisibleByCss (elementForClick, elementToBePresent){
    await this.page.click(elementForClick);
    await this.page.evaluate(async ([elementForClick, elementToBePresent]) => {
      let intervalId;
      return await new Promise(function(resolve, reject){
        intervalId = setInterval(function(){
          const clickElement = document.querySelector(elementForClick);

          if (clickElement !== null) {
            clickElement.click();
          }

          if (document.querySelector(elementToBePresent) != null) {
            const itemOffsetParent = document.querySelector(elementToBePresent).offsetParent;
            if (itemOffsetParent !== null) {
              clearInterval(intervalId);
              return resolve(true); //element found
            }
          }
        }, 200);
        setTimeout(() => {
          clearInterval(intervalId);
          return resolve(true);
        }, config.use.actionTimeout);
      })
    }, [elementForClick, elementToBePresent]);
  }
}
