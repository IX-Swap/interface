const dotenv = require('dotenv')
dotenv.config()

let baseUrl = 'https://staging.mozork.com/'
if (process.env.GH_REP?.includes('staging')) {
  baseUrl = 'http://localhost:3000/'
}

const baseCreds = {
  GH_ENV: process.env.GH_REP,
  BASE_API: 'https://api.staging.mozork.com/',
  URL: baseUrl,
  EMAIL: 'xe2v112a@mailinator.com',
  EMAIL_APPROVED: 'lopezmichaela1b031@gmail.com',
  VIEW_PROFILE_EMAIL: 'vomyho@mailinator.com',
  BANK_ACCOUNT: 'byjywarago@mailinator.com',
  EMAIL_FOR_RESET: 'luch41635754715203@wwjmp.com',
  CREATE_DSO_MORE_OPTIONS: 'lorepag@mailinator.com',
  VIEW_DSO_MORE_OPTIONS: 'qyle@mailinator.com',
  PASSWORD: 'Pa$$w0rd!qwe',
  PASSWORD_RESET: 'Pa$$w0rd!qwe1A',
  EDIT_CORPORATE: 'corporateideintety@mailinator.com',
  EDIT_INDIVIDUAL: 'individual@mailinator.com',
  EDIT_ISSUER: 'issuerinvest@mailinator.com',
  DSO_EDIT: 'dsoCorporateUser@mailinator.com',
  MAIL_FOR_CAPITAL_CALL: 'luch41638787427054@wwjmp.com'
}

export { baseCreds }
