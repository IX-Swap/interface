const dotenv = require('dotenv')
dotenv.config()
const metamask = {
  SECRET_WORDS: 'prosper weasel indicate flock candy person there buyer direct repeat detail ahead',
  PASSWORD: 'i1iarydotat!!!111',
}
const ixswap = {
  URL: 'http://localhost:3000/#/swap',
  contractAddresses: {
    eth: '0x5455D6D8ae4263d69b29d1DeD8eCD361b6582Bfe',
    kekl: '0xb6dcf6f54dcc50c09aaa6b1a8284f1600b6fc3a8',
    dai: '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
  },
}
export { metamask, ixswap }
