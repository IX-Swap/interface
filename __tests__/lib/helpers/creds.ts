const dotenv = require('dotenv')
dotenv.config()
import { devCreds } from '../credentials/dev'
import { stagingCreds } from '../credentials/staging'

const setENV = 'staging'
let baseCreds

if (setENV === 'staging') {
  baseCreds = stagingCreds
} else {
  baseCreds = devCreds
}

export { baseCreds }
