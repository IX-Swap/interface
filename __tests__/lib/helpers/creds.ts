const dotenv = require('dotenv')
dotenv.config()
import { devCreds } from '../credentials/dev'
import { stagingCreds } from '../credentials/staging'

const setENV = process.env.BRANCHE_NAME || 'otc'
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
baseCreds['httpCredentials'] = {
  username: 'ixprime',
  password: '!nv35taX2K2!*'
}
export { baseCreds, setENV }
