const dotenv = require('dotenv')
dotenv.config()

let baseCreds

if ('ss' === 'ss') {
  baseCreds = {
    GH_ENV: process.env.GH_REP,
    URL: 'https://staging.mozork.com/',
    EMAIL: 'xe2v112a@mailinator.com',
    EMAIL_APPROVED: 'LuchNewMailIssuerDSOtest@wwjmp.com',
    VIEW_PROFILE_EMAIL: 'vomyho@mailinator.com',
    EMAIL_FOR_RESET: 'luch41635754715203@wwjmp.com',
    PASSWORD: 'Pa$$w0rd!qwe',
    PASSWORD_RESET: 'Pa$$w0rd!qwe1A'
  }
} else {
  baseCreds = {
    URL: 'https://staging.mozork.com/',
    EMAIL: 'xe2v112a@mailinator.com',
    EMAIL_APPROVED: 'LuchNewMailIssuerDSOtest@wwjmp.com',
    VIEW_PROFILE_EMAIL: 'vomyho@mailinator.com',
    EMAIL_FOR_RESET: 'luch41635754715203@wwjmp.com',
    PASSWORD: 'Pa$$w0rd!qwe',
    PASSWORD_RESET: 'Pa$$w0rd!qwe1A'
  }
}

export { baseCreds }
