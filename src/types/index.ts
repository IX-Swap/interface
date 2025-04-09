import { BatchSwapStep, SwapV2 } from '@ixswap1/dex-v2-sdk';
import { BigNumberish } from '@ethersproject/bignumber';
import { TransactionRequest } from '@ethersproject/providers';

export type RuleFunction = (val: string | number) => string | boolean;
export type Rules = Array<RuleFunction>;
export interface FormRef {
  validate(): boolean;
}

export interface Token {
  address: string;
  balance: string;
  balanceDenorm: BigNumberish;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  price: number;
  price24HChange: number;
  symbol: string;
  value: number;
  value24HChange: number;
}

export type TokenMap = Record<string, Token>;

export interface Claim {
  id: string;
  amount: string;
}

export interface WalletError extends Error {
  code: number | string;
  data?: {
    originalError?: any;
  };
  metadata?: WalletErrorMetadata;
}

export interface WalletErrorMetadata {
  simulation?: string;
  action?: string;
  params?: any;
  sender?: string;
  options?: TransactionRequest;
  chainId?: number;
  block?: number;
  ethValue?: string | number;
}

export interface ErrorWithMetadata extends Error {
  metadata?: {
    action: string;
    [key: string]: any;
  };
}

export type BatchSwap = {
  amountTokenOut: string;
  swaps: SwapV2[];
  assets: string[];
};

export type BatchSwapOut = {
  returnAmounts: string[];
  swaps: BatchSwapStep[];
  assets: string[];
};

export enum StepState {
  Todo,
  Active,
  WalletOpen,
  Pending,
  Success,
  Warning,
  Error,
  Completed,
}

export type Step = {
  tooltip: string;
  state: StepState;
};

export type Address = string;

export type TokenAmountMap = Record<Address, string>;

export type BaseContent = {
  title: string;
  description: string;
};

export interface BlockNumberResponse {
  data: {
    blocks: [
      {
        number: string;
      }
    ];
  };
}
