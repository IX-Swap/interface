const dotenv = require('dotenv')
dotenv.config()
import { devCreds } from '../credentials/dev'
import { stagingCreds } from '../credentials/staging'

const setENV = process.env.BRANCHE_NAME || 'dev'
let baseCreds

if (setENV?.includes('staging')) {
  baseCreds = stagingCreds
} else if (setENV?.includes('otc')) {
  baseCreds = devCreds
  baseCreds.HOST = 'api.otc.mozork.com'
  baseCreds.BASE_API = 'https://api.otc.mozork.com/'
  baseCreds.URL = 'https://otc.mozork.com/'
} else {
  baseCreds = devCreds
}

const metamaskCreds = {
  SECRET_WORDS: 'quiz misery girl ordinary shine notable crucial blame trim future luggage much',
  PASSWORD: 'i1iarydotat!!!111',
  contractAddresses: {
    eth: '0x269EB66f58752c7BF0E7A7cdD4ce71bBFDb9408c'
  }
}
export { baseCreds, setENV, metamaskCreds }
