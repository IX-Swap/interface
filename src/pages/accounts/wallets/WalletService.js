import bip39 from './bip39.service'
import ethereumjs from './ethereumjs.service'

async function createMnemonicSeed (entropy) {
  if (entropy) {
    return bip39.entropyToMnemonic(entropy)
  } else {
    return bip39.generateMnemonic()
  }
}

async function privateKeyfromSeed (seed) {
  return ethereumjs.WalletHD.fromMasterSeed(seed)
}

export { createMnemonicSeed, privateKeyfromSeed }
