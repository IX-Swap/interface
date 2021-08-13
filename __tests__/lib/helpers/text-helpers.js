module.exports = {
  errors: {
    FIELD_REQUIRED: 'This field is required.',
    INVALID_CREDENTIALS: 'Invalid credentials, wrong email or password',
    INVALID_EMAIL: 'The provided email address is invalid',
  },
  notifications: {
    ADD_GROUP: 'This may take up to 30 seconds. Please wait and then refresh the page.',
    REMOVE_POOL: 'Remove',
    CONNECTED: 'Connected with MetaMask',
    TRANSACTIONS: 'Your transactions will appear here...',
  },
  urls: { kovanEtherscan: 'https://kovan.etherscan.io/address/' },
  amounts: { base: '0.001', moreThaCurrent: '10000', addToPool: '0.001', securityTokens: 2, swap: '0.00000001' },

  // Default ABI setting for get balance ERC20 type
  Abi: [
    // balanceOf
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      type: 'function',
    },
    // decimals
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ name: '', type: 'uint8' }],
      type: 'function',
    },
  ],
}

// {type: "auth/saveToken",
//  payload: {
//  value: {
//  token: "",
//  expiresAt: 1628846495
//  } }
// }
