const dotenv = require('dotenv')
dotenv.config()
import { devCreds } from '../credentials/dev'
import { stagingCreds } from '../credentials/staging'

const setENV = 'staging'
let baseCreds

if (setENV === 'staging') {
  baseCreds = stagingCreds
  if (process.env.GH_REP?.includes('staging')) {
    baseCreds['URL'] = 'http://localhost:3000/'
    global.console.log(process.env.REACT_APP_API_URL)
  }
} else {
  baseCreds = devCreds
}

export { baseCreds }
