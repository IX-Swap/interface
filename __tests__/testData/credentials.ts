const dotenv = require('dotenv')
dotenv.config()
const metamask = {
  SECRET_WORDS: 'prosper weasel indicate flock candy person there buyer direct repeat detail ahead',
  PASSWORD: 'i1iarydotat!!!111',
  privKey: '31ea3f38c1e7be447e4394fcbf1e8a6aa52bab0b4783fbab90b88ed4f7fc456f',
  contractAddresses: {
    eth: '0x5455D6D8ae4263d69b29d1DeD8eCD361b6582Bfe',
    kekl: '0xb6dcf6f54dcc50c09aaa6b1a8284f1600b6fc3a8',
    dai: '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
    ixsLt: '0x7b3c359dc42b2dc6e3c07662f64badf4e8f60b15',
    wLink: '0xbe80678a8bea96fa07ed302041f53390c2d370fe',
  },
}
const metamask2 = {
  SECRET_WORDS: 'quiz misery girl ordinary shine notable crucial blame trim future luggage much',
  PASSWORD: 'i1iarydotat!!!111',
  contractAddresses: {
    eth: '0x269EB66f58752c7BF0E7A7cdD4ce71bBFDb9408c',
  },
}

const metamask3 = {
  SECRET_WORDS: 'document thrive equal adapt question bracket fire oblige catalog deposit team brisk',
  PASSWORD: 'i1iarydotat!!!111',
  contractAddresses: {
    eth: '0x2203004aBaCADda2E561380dD863FC479a90A43e',
  },
}
const forDeposit = {
  sendToKostodian: '0x8eC74c3B5d61d7f64b7eB267587709BAb4C0C737',
}
const ixswap = {
  URL: 'http://localhost:3000/#/swap',
  // URL: 'http://dev.ixswap.io/',
  // URL: 'https://app.ixswap.io/#/swap',
}

export { metamask, ixswap, metamask2, metamask3, forDeposit }
