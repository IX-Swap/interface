export const Abi = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

export const ixsTokenData = {
  title: 'Ixs Token',
  contractAddress: '0xA1997c88a60dCe7BF92A3644DA21e1FfC8F96dC2'
}

export const secTokenData = {
  title: 'SecTest',
  contractAddress: '0x9b22472E7dd78c31FF139D6d76A579dfcF9aC634',
  name: 'SEC'
}

export const wsecTokenData = {
  title: 'WSec Test (WSEC)',
  contractAddress: '0x1bdFF869D71E8e42D71e19E015fcC9E3Fc50e579',
  name: 'WSEC'
}

export const ethTokenData = {
  title: 'Ether'
}
