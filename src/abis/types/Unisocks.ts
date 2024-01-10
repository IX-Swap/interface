/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils
} from 'ethers'
import type {
  FunctionFragment,
  Result,
  EventFragment
} from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent
} from './common'

export interface UnisocksInterface extends utils.Interface {
  functions: {
    'tokenURI(uint256)': FunctionFragment
    'tokenByIndex(uint256)': FunctionFragment
    'tokenOfOwnerByIndex(address,uint256)': FunctionFragment
    'transferFrom(address,address,uint256)': FunctionFragment
    'safeTransferFrom(address,address,uint256)': FunctionFragment
    'safeTransferFrom(address,address,uint256,bytes)': FunctionFragment
    'approve(address,uint256)': FunctionFragment
    'setApprovalForAll(address,bool)': FunctionFragment
    'mint(address)': FunctionFragment
    'changeMinter(address)': FunctionFragment
    'changeURI(address)': FunctionFragment
    'name()': FunctionFragment
    'symbol()': FunctionFragment
    'totalSupply()': FunctionFragment
    'minter()': FunctionFragment
    'socks()': FunctionFragment
    'newURI()': FunctionFragment
    'ownerOf(uint256)': FunctionFragment
    'balanceOf(address)': FunctionFragment
    'getApproved(uint256)': FunctionFragment
    'isApprovedForAll(address,address)': FunctionFragment
    'supportsInterface(bytes32)': FunctionFragment
  }

  getFunction(
    nameOrSignatureOrTopic:
      | 'tokenURI'
      | 'tokenByIndex'
      | 'tokenOfOwnerByIndex'
      | 'transferFrom'
      | 'safeTransferFrom(address,address,uint256)'
      | 'safeTransferFrom(address,address,uint256,bytes)'
      | 'approve'
      | 'setApprovalForAll'
      | 'mint'
      | 'changeMinter'
      | 'changeURI'
      | 'name'
      | 'symbol'
      | 'totalSupply'
      | 'minter'
      | 'socks'
      | 'newURI'
      | 'ownerOf'
      | 'balanceOf'
      | 'getApproved'
      | 'isApprovedForAll'
      | 'supportsInterface'
  ): FunctionFragment

  encodeFunctionData(
    functionFragment: 'tokenURI',
    values: [BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'tokenByIndex',
    values: [BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'tokenOfOwnerByIndex',
    values: [string, BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'transferFrom',
    values: [string, string, BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'safeTransferFrom(address,address,uint256)',
    values: [string, string, BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'safeTransferFrom(address,address,uint256,bytes)',
    values: [string, string, BigNumberish, BytesLike]
  ): string
  encodeFunctionData(
    functionFragment: 'approve',
    values: [string, BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'setApprovalForAll',
    values: [string, boolean]
  ): string
  encodeFunctionData(functionFragment: 'mint', values: [string]): string
  encodeFunctionData(functionFragment: 'changeMinter', values: [string]): string
  encodeFunctionData(functionFragment: 'changeURI', values: [string]): string
  encodeFunctionData(functionFragment: 'name', values?: undefined): string
  encodeFunctionData(functionFragment: 'symbol', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'totalSupply',
    values?: undefined
  ): string
  encodeFunctionData(functionFragment: 'minter', values?: undefined): string
  encodeFunctionData(functionFragment: 'socks', values?: undefined): string
  encodeFunctionData(functionFragment: 'newURI', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'ownerOf',
    values: [BigNumberish]
  ): string
  encodeFunctionData(functionFragment: 'balanceOf', values: [string]): string
  encodeFunctionData(
    functionFragment: 'getApproved',
    values: [BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'isApprovedForAll',
    values: [string, string]
  ): string
  encodeFunctionData(
    functionFragment: 'supportsInterface',
    values: [BytesLike]
  ): string

  decodeFunctionResult(functionFragment: 'tokenURI', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'tokenByIndex',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'tokenOfOwnerByIndex',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'transferFrom',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'safeTransferFrom(address,address,uint256)',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'safeTransferFrom(address,address,uint256,bytes)',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'setApprovalForAll',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'changeMinter',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'changeURI', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'symbol', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'totalSupply', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'minter', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'socks', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'newURI', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'ownerOf', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getApproved', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'isApprovedForAll',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'supportsInterface',
    data: BytesLike
  ): Result

  events: {
    'Transfer(address,address,uint256)': EventFragment
    'Approval(address,address,uint256)': EventFragment
    'ApprovalForAll(address,address,bool)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'Transfer'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Approval'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'ApprovalForAll'): EventFragment
}

export interface TransferEventObject {
  _from: string
  _to: string
  _tokenId: BigNumber
}
export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  TransferEventObject
>

export type TransferEventFilter = TypedEventFilter<TransferEvent>

export interface ApprovalEventObject {
  _owner: string
  _approved: string
  _tokenId: BigNumber
}
export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  ApprovalEventObject
>

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>

export interface ApprovalForAllEventObject {
  _owner: string
  _operator: string
  _approved: boolean
}
export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  ApprovalForAllEventObject
>

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>

export interface Unisocks extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: UnisocksInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    tokenURI(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { out: string }>

    tokenByIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { out: BigNumber }>

    tokenOfOwnerByIndex(
      _owner: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { out: BigNumber }>

    transferFrom(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    'safeTransferFrom(address,address,uint256)'(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    'safeTransferFrom(address,address,uint256,bytes)'(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    approve(
      _approved: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    mint(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    changeMinter(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    changeURI(
      _newURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    name(overrides?: CallOverrides): Promise<[string] & { out: string }>

    symbol(overrides?: CallOverrides): Promise<[string] & { out: string }>

    totalSupply(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { out: BigNumber }>

    minter(overrides?: CallOverrides): Promise<[string] & { out: string }>

    socks(overrides?: CallOverrides): Promise<[string] & { out: string }>

    newURI(overrides?: CallOverrides): Promise<[string] & { out: string }>

    ownerOf(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { out: string }>

    balanceOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { out: BigNumber }>

    getApproved(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { out: string }>

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[boolean] & { out: boolean }>

    supportsInterface(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean] & { out: boolean }>
  }

  tokenURI(_tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>

  tokenByIndex(
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>

  tokenOfOwnerByIndex(
    _owner: string,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>

  transferFrom(
    _from: string,
    _to: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  'safeTransferFrom(address,address,uint256)'(
    _from: string,
    _to: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  'safeTransferFrom(address,address,uint256,bytes)'(
    _from: string,
    _to: string,
    _tokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  approve(
    _approved: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  setApprovalForAll(
    _operator: string,
    _approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  mint(
    _to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  changeMinter(
    _minter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  changeURI(
    _newURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  name(overrides?: CallOverrides): Promise<string>

  symbol(overrides?: CallOverrides): Promise<string>

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>

  minter(overrides?: CallOverrides): Promise<string>

  socks(overrides?: CallOverrides): Promise<string>

  newURI(overrides?: CallOverrides): Promise<string>

  ownerOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

  getApproved(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

  isApprovedForAll(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<boolean>

  supportsInterface(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>

  callStatic: {
    tokenURI(_tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>

    tokenByIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    tokenOfOwnerByIndex(
      _owner: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    transferFrom(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    'safeTransferFrom(address,address,uint256)'(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    'safeTransferFrom(address,address,uint256,bytes)'(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>

    approve(
      _approved: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>

    mint(_to: string, overrides?: CallOverrides): Promise<boolean>

    changeMinter(_minter: string, overrides?: CallOverrides): Promise<void>

    changeURI(_newURI: string, overrides?: CallOverrides): Promise<void>

    name(overrides?: CallOverrides): Promise<string>

    symbol(overrides?: CallOverrides): Promise<string>

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>

    minter(overrides?: CallOverrides): Promise<string>

    socks(overrides?: CallOverrides): Promise<string>

    newURI(overrides?: CallOverrides): Promise<string>

    ownerOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    getApproved(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<boolean>

    supportsInterface(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>
  }

  filters: {
    'Transfer(address,address,uint256)'(
      _from?: string | null,
      _to?: string | null,
      _tokenId?: BigNumberish | null
    ): TransferEventFilter
    Transfer(
      _from?: string | null,
      _to?: string | null,
      _tokenId?: BigNumberish | null
    ): TransferEventFilter

    'Approval(address,address,uint256)'(
      _owner?: string | null,
      _approved?: string | null,
      _tokenId?: BigNumberish | null
    ): ApprovalEventFilter
    Approval(
      _owner?: string | null,
      _approved?: string | null,
      _tokenId?: BigNumberish | null
    ): ApprovalEventFilter

    'ApprovalForAll(address,address,bool)'(
      _owner?: string | null,
      _operator?: string | null,
      _approved?: null
    ): ApprovalForAllEventFilter
    ApprovalForAll(
      _owner?: string | null,
      _operator?: string | null,
      _approved?: null
    ): ApprovalForAllEventFilter
  }

  estimateGas: {
    tokenURI(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    tokenByIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    tokenOfOwnerByIndex(
      _owner: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    transferFrom(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    'safeTransferFrom(address,address,uint256)'(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    'safeTransferFrom(address,address,uint256,bytes)'(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    approve(
      _approved: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    mint(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    changeMinter(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    changeURI(
      _newURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    name(overrides?: CallOverrides): Promise<BigNumber>

    symbol(overrides?: CallOverrides): Promise<BigNumber>

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>

    minter(overrides?: CallOverrides): Promise<BigNumber>

    socks(overrides?: CallOverrides): Promise<BigNumber>

    newURI(overrides?: CallOverrides): Promise<BigNumber>

    ownerOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    getApproved(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    supportsInterface(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>
  }

  populateTransaction: {
    tokenURI(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    tokenByIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    tokenOfOwnerByIndex(
      _owner: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    transferFrom(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    'safeTransferFrom(address,address,uint256)'(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    'safeTransferFrom(address,address,uint256,bytes)'(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    approve(
      _approved: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    mint(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    changeMinter(
      _minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    changeURI(
      _newURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>

    minter(overrides?: CallOverrides): Promise<PopulatedTransaction>

    socks(overrides?: CallOverrides): Promise<PopulatedTransaction>

    newURI(overrides?: CallOverrides): Promise<PopulatedTransaction>

    ownerOf(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    balanceOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    getApproved(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    supportsInterface(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>
  }
}
