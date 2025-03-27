// import { Network } from '@/lib/config/types';
import { BigNumber } from '@ethersproject/bignumber';
// import {
//   GPv2Settlement,
//   GPv2VaultRelayer,
// } from '@cowprotocol/contracts/networks.json';

// import { networkId } from 'hooks/dex-v2/useNetwork';

export const MAX_VALID_TO_EPOCH = BigNumber.from('0xFFFFFFFF').toNumber(); // Max uint32 (Feb 07 2106 07:28:15 GMT+0100)

// export const COW_SUPPORTED_NETWORKS =
//   Object.keys(GPv2VaultRelayer).map(parseInt);

// export const COW_SETTLEMENT_CONTRACT_ADDRESS: string = (
//   GPv2Settlement[networkId.value] ?? GPv2Settlement[Network.MAINNET]
// ).address;

// export const COW_RELAYER_CONTRACT_ADDRESS: string = (
//   GPv2VaultRelayer[networkId.value] ?? GPv2VaultRelayer[Network.MAINNET]
// ).address;
