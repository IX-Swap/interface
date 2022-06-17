import path from 'path'
import { test as base } from '@playwright/test'
import os from 'os'
import fs from 'fs'
import { chromium } from 'playwright'

export const test = base.extend({
  context: async ({ playwright, browserName, headless }, use, workerInfo) => {
    const ARGS = [
      `--disable-extensions-except=${__dirname + '/metamask'}`,
      `--load-extension=${__dirname + '/metamask'}`,
    ]
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: ARGS,
      timeout: 90000,
      // slowMo: 50,
      viewport: { width: 1720, height: 880 },
      ignoreHTTPSErrors: true,
      httpCredentials: {
        username: 'ixswapio',
        password: '2theM0on',
      },
    })
    await use(context)
    // await context.close()
  },
})
