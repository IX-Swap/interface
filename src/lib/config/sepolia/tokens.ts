import { TokenConstants } from '../types';

const tokens: TokenConstants = {
  Popular: {
    Symbols: ['WBTC', 'DAI', 'USDC', 'BAL', 'USDT', 'WETH'],
  },
  InitialSwapTokens: {
    input: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    output: '0xb19382073c7A0aDdbb56Ac6AF1808Fa49e377B75',
  },
  Addresses: {
    nativeAsset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    wNativeAsset: '0x5e657b5bB33EF2a07C13E759388dE20D0f097c34',
    WETH: '0x5e657b5bB33EF2a07C13E759388dE20D0f097c34',
    BAL: '0xb19382073c7A0aDdbb56Ac6AF1808Fa49e377B75',
    bbaUSD: '',
    bbaUSDv2: '',
    rETH: '',
    stMATIC: '',
    stETH: '',
    wstETH: '',
  },
  PriceChainMap: {
    /**
     * Addresses must be lower case and map from sepolia to mainnet, e.g
     * [sepolia address]: mainnet address
     */
    // WETH
    '0x5e657b5bB33EF2a07C13E759388dE20D0f097c34':
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    // BAL
    '0xb19382073c7a0addbb56ac6af1808fa49e377b75':
      '0xba100000625a3754423978a60c9317c58a424e3d',
    // DAI
    '0x68194a729c2450ad26072b3d33adacbcef39d574':
      '0x6b175474e89094c44da98b954eedeac495271d0f',
    // EURS
    '0xe20cf465a163c395e7dde1466cdd1abe695b4658':
      '0xdb25f211ab05b1c97d595516f45794528a807ad8',
    // USDC
    '0xda9d4f9b69ac6c22e444ed9af0cfc043b7a7f53f':
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    // USDT
    '0xc1c7B27362E51fa348ceBaE557883f7CFFDF29F6':
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    // AAVE
    '0x5bb220afc6e2e008cb2302a83536a019ed245aa2':
      '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
    // LINK
    '0x779877A7B0D9E8603169DdbD7836e478b4624789':
      '0x514910771af9ca656af840dff83e8264ecf986ca',
    // WBTC
    '0xf864f011c5a97fd8da79baed78ba77b47112935a':
      '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  },
};

export default tokens;
