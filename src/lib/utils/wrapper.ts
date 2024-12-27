import { BigNumber } from 'ethers'
import { configService } from 'services/config/config.service'

export enum WrapType {
  NonWrap = 0,
  Wrap,
  Unwrap,
}

export const isNativeAssetWrap = (tokenIn: string, tokenOut: string): boolean => {
  const nativeAddress = configService.network.tokens.Addresses.nativeAsset
  const wNativeAddress = configService.network.tokens.Addresses.wNativeAsset
  return tokenIn === nativeAddress && tokenOut === wNativeAddress
}

export const getWrapAction = (tokenIn: string, tokenOut: string): WrapType => {
  const nativeAddress = configService.network.tokens.Addresses.nativeAsset
  const wNativeAddress = configService.network.tokens.Addresses.wNativeAsset

  if (tokenIn === nativeAddress && tokenOut === wNativeAddress) return WrapType.Wrap

  if (tokenOut === nativeAddress && tokenIn === wNativeAddress) return WrapType.Unwrap

  return WrapType.NonWrap
}

export const getWrapOutput = async (wrapper: string, wrapType: WrapType, wrapAmount: BigNumber): Promise<BigNumber> => {
  if (wrapType === WrapType.NonWrap) throw new Error('Invalid wrap type')
  const wNativeAddress = configService.network.tokens.Addresses.wNativeAsset

  if (wrapper === wNativeAddress) return BigNumber.from(wrapAmount)

  throw new Error('Unknown wrapper')
}

// export async function wrap(
//   network: string,
//   web3: WalletProvider,
//   wrapper: string,
//   amount: BigNumber
// ): Promise<TransactionResponse> {
//   try {
//     if (wrapper === configs[network].tokens.Addresses.wNativeAsset) {
//       return wrapNative(network, web3, amount)
//     } else if (wrapper === configs[network].tokens.Addresses.wstETH) {
//       return wrapLido(network, web3, amount)
//     }
//     throw new Error('Unrecognised wrapper contract')
//   } catch (e) {
//     console.log('[Wrapper] Wrap error:', e)
//     return Promise.reject(e)
//   }
// }

// export async function unwrap(
//   network: string,
//   web3: WalletProvider,
//   wrapper: string,
//   amount: BigNumber
// ): Promise<TransactionResponse> {
//   try {
//     if (wrapper === configs[network].tokens.Addresses.wNativeAsset) {
//       return unwrapNative(network, web3, amount)
//     } else if (wrapper === configs[network].tokens.Addresses.wstETH) {
//       return unwrapLido(network, web3, amount)
//     }
//     throw new Error('Unrecognised wrapper contract')
//   } catch (e) {
//     console.log('[Wrapper] Unwrap error:', e)
//     return Promise.reject(e)
//   }
// }

// const wrapNative = async (network: string, web3: WalletProvider, amount: BigNumber): Promise<TransactionResponse> => {
//   const txBuilder = new TransactionBuilder(web3.getSigner())
//   return await txBuilder.contract.sendTransaction({
//     contractAddress: configs[network].tokens.Addresses.wNativeAsset,
//     abi: ['function deposit() payable'],
//     action: 'deposit',
//     options: { value: amount },
//   })
// }

// const unwrapNative = async (network: string, web3: WalletProvider, amount: BigNumber): Promise<TransactionResponse> => {
//   const txBuilder = new TransactionBuilder(web3.getSigner())
//   return await txBuilder.contract.sendTransaction({
//     contractAddress: configs[network].tokens.Addresses.wNativeAsset,
//     abi: ['function withdraw(uint256 wad)'],
//     action: 'withdraw',
//     params: [amount],
//   })
// }
