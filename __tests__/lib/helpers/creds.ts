const dotenv = require('dotenv')
dotenv.config()

const setENV = 'staging'
let baseUrl = `https://${setENV}.mozork.com/`
if (process.env.GH_REP?.includes('staging')) {
  baseUrl = 'http://localhost:3000/'
}

const baseCreds = {
  GH_ENV: process.env.GH_REP,
  HOST: `api.${setENV}.mozork.com`,
  BASE_API: `https://api.${setENV}.mozork.com/`,
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
  MAIL_FOR_CAPITAL_CALL: 'luch41638787427054@wwjmp.com',
  AUTHORIZER_USER: 'authorizerTests@esiix.com',
  commitments: 'qamyro@mailinator.com',
  firstExchange: 'test_dev_exchange_1_user@esiix.com',
  firstUserId: '61e1640547ade252462cec89',
  secondExchange: 'test_dev_exchange_2_user@esiix.com',
  secondUserId: '61e167f447ade252462cf19e',
  thirdExchange: 'test_dev_exchange_3_user@esiix.com',
  thirdUserId: '61e1696047ade252462cf361'
}

export { baseCreds }
