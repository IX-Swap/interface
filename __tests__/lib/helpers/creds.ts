const dotenv = require('dotenv')
dotenv.config()

let baseCreds

if (process.env.GH_REP?.includes('staging')) {
  baseCreds = {
    GH_ENV: process.env.GH_REP,
    BASE_API: 'https://api.staging.mozork.com/',
    URL: 'https://staging.mozork.com/',
    EMAIL: 'xe2v112a@mailinator.com',
    EMAIL_APPROVED: 'lopezmichaela1b031@gmail.com',
    VIEW_PROFILE_EMAIL: 'vomyho@mailinator.com',
    BANK_ACCOUNT: 'byjywarago@mailinator.com',
    EMAIL_FOR_RESET: 'luch41635754715203@wwjmp.com',
    PASSWORD: 'Pa$$w0rd!qwe',
    PASSWORD_RESET: 'Pa$$w0rd!qwe1A'
  }
} else {
  baseCreds = {
    GH_ENV: process.env.GH_REP,
    BASE_API: 'https://api.staging.mozork.com/',
    URL: 'https://staging.mozork.com/',
    EMAIL: 'xe2v112a@mailinator.com',
    EMAIL_APPROVED: 'lopezmichaela1b031@gmail.com',
    VIEW_PROFILE_EMAIL: 'vomyho@mailinator.com',
    BANK_ACCOUNT: 'byjywarago@mailinator.com',
    EMAIL_FOR_RESET: 'luch41635754715203@wwjmp.com',
    PASSWORD: 'Pa$$w0rd!qwe',
    PASSWORD_RESET: 'Pa$$w0rd!qwe1A'
  }
}

export { baseCreds }
