/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { Unisocks, UnisocksInterface } from '../Unisocks'

const _abi = [
  {
    name: 'Transfer',
    inputs: [
      {
        type: 'address',
        name: '_from',
        indexed: true
      },
      {
        type: 'address',
        name: '_to',
        indexed: true
      },
      {
        type: 'uint256',
        name: '_tokenId',
        indexed: true
      }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'Approval',
    inputs: [
      {
        type: 'address',
        name: '_owner',
        indexed: true
      },
      {
        type: 'address',
        name: '_approved',
        indexed: true
      },
      {
        type: 'uint256',
        name: '_tokenId',
        indexed: true
      }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'ApprovalForAll',
    inputs: [
      {
        type: 'address',
        name: '_owner',
        indexed: true
      },
      {
        type: 'address',
        name: '_operator',
        indexed: true
      },
      {
        type: 'bool',
        name: '_approved',
        indexed: false
      }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [],
    inputs: [],
    constant: false,
    payable: false,
    type: 'constructor'
  },
  {
    name: 'tokenURI',
    outputs: [
      {
        type: 'string',
        name: 'out'
      }
    ],
    inputs: [
      {
        type: 'uint256',
        name: '_tokenId'
      }
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: '22405'
  },
  {
    name: 'tokenByIndex',
    outputs: [
      {
        type: 'uint256',
        name: 'out'
      }
    ],
    inputs: [
      {
        type: 'uint256',
        name: '_index'
      }
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: '631'
  },
  {
    name: 'tokenOfOwnerByIndex',
    outputs: [
      {
        type: 'uint256',
        name: 'out'
      }
    ],
    inputs: [
      {
        type: 'address',
        name: '_owner'
      },
      {
        type: 'uint256',
        name: '_index'
      }
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: '1248'
  },
  {
    name: 'transferFrom',
    outputs: [],
    inputs: [
      {
        type: 'address',
        name: '_from'
      },
      {
        type: 'address',
        name: '_to'
      },
      {
        type: 'uint256',
        name: '_tokenId'
      }
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: '259486'
  },
  {
    name: 'safeTransferFrom',
    outputs: [],
    inputs: [
      {
        type: 'address',
        name: '_from'
      },
      {
        type: 'address',
        name: '_to'
      },
      {
        type: 'uint256',
        name: '_tokenId'
      }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'safeTransferFrom',
    outputs: [],
    inputs: [
      {
        type: 'address',
        name: '_from'
      },
      {
        type: 'address',
        name: '_to'
      },
      {
        type: 'uint256',
        name: '_tokenId'
      },
      {
        type: 'bytes',
        name: '_data'
      }
    ],
    constant: false,
    payable: false,
    type: 'function'
  },
  {
    name: 'approve',
    outputs: [],
    inputs: [
      {
        type: 'address',
        name: '_approved'
      },
      {
        type: 'uint256',
        name: '_tokenId'
      }
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: '38422'
  },
  {
    name: 'setApprovalForAll',
    outputs: [],
    inputs: [
      {
        type: 'address',
        name: '_operator'
      },
      {
        type: 'bool',
        name: '_approved'
      }
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: '38016'
  },
  {
    name: 'mint',
    outputs: [
      {
        type: 'bool',
        name: 'out'
      }
    ],
    inputs: [
      {
        type: 'address',
        name: '_to'
      }
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: '182636'
  },
  {
    name: 'changeMinter',
    outputs: [],
    inputs: [
      {
        type: 'address',
        name: '_minter'
      }
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: '35897'
  },
  {
    name: 'changeURI',
    outputs: [],
    inputs: [
      {
        type: 'address',
        name: '_newURI'
      }
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: '35927'
  },
  {
    name: 'name',
    outputs: [
      {
        type: 'string',
        name: 'out'
      }
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: '6612'
  },
  {
    name: 'symbol',
    outputs: [
      {
        type: 'string',
        name: 'out'
      }
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: '6642'
  },
  {
    name: 'totalSupply',
    outputs: [
      {
        type: 'uint256',
        name: 'out'
      }
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: '873'
  },
  {
    name: 'minter',
    outputs: [
      {
        type: 'address',
        name: 'out'
      }
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: '903'
  },
  {
    name: 'socks',
    outputs: [
      {
        type: 'address',
        name: 'out',
        unit: 'Socks'
      }
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: '933'
  },
  {
    name: 'newURI',
    outputs: [
      {
        type: 'address',
        name: 'out'
      }
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: '963'
  },
  {
    name: 'ownerOf',
    outputs: [
      {
        type: 'address',
        name: 'out'
      }
    ],
    inputs: [
      {
        type: 'uint256',
        name: 'arg0'
      }
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: '1126'
  },
  {
    name: 'balanceOf',
    outputs: [
      {
        type: 'uint256',
        name: 'out'
      }
    ],
    inputs: [
      {
        type: 'address',
        name: 'arg0'
      }
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: '1195'
  },
  {
    name: 'getApproved',
    outputs: [
      {
        type: 'address',
        name: 'out'
      }
    ],
    inputs: [
      {
        type: 'uint256',
        name: 'arg0'
      }
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: '1186'
  },
  {
    name: 'isApprovedForAll',
    outputs: [
      {
        type: 'bool',
        name: 'out'
      }
    ],
    inputs: [
      {
        type: 'address',
        name: 'arg0'
      },
      {
        type: 'address',
        name: 'arg1'
      }
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: '1415'
  },
  {
    name: 'supportsInterface',
    outputs: [
      {
        type: 'bool',
        name: 'out'
      }
    ],
    inputs: [
      {
        type: 'bytes32',
        name: 'arg0'
      }
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: '1246'
  }
]

export class Unisocks__factory {
  static readonly abi = _abi
  static createInterface(): UnisocksInterface {
    return new utils.Interface(_abi) as UnisocksInterface
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Unisocks {
    return new Contract(address, _abi, signerOrProvider) as Unisocks
  }
}
